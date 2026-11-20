'use client';

import { useEffect, useRef } from 'react';

// San Isidro, Rodriguez (Montalban), Rizal
const LAT = 14.75350988448972;
const LNG = 121.14156213840742;
const ZOOM = 11;

export default function LeafletMap() {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<unknown>(null);

    useEffect(() => {
        if (!mapRef.current || mapInstance.current) return;

        // Dynamically import leaflet in the effect to avoid SSR issues
        import('leaflet').then((L) => {
            if (!mapRef.current || mapInstance.current) return;

            // Import leaflet CSS
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            document.head.appendChild(link);

            // Fix default icon paths
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            delete (L.Icon.Default.prototype as any)._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
                iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
                shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
            });

            const map = L.map(mapRef.current!, {
                center: [LAT, LNG],
                zoom: ZOOM,
                zoomControl: false,        // removes +/- zoom buttons
                attributionControl: false, // removes © OpenStreetMap text
                scrollWheelZoom: true,
                doubleClickZoom: false,
                dragging: true,
                touchZoom: true,
                boxZoom: false,
                keyboard: false,
            });

            // Use a dark basemap with light labels so place names stay readable.
            const cartoKey = process.env.NEXT_PUBLIC_CARTO_API_KEY;
            const tileSuffix = cartoKey ? `?key=${cartoKey}` : '';
            const tileUrl = `https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png${tileSuffix}`;
            const labelUrl = `https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png${tileSuffix}`;

            L.tileLayer(tileUrl, {
                maxZoom: 18,
                attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
            }).addTo(map);

            const labelsPane = map.createPane('labels');
            labelsPane.style.zIndex = '450';
            labelsPane.style.pointerEvents = 'none';

            L.tileLayer(labelUrl, {
                maxZoom: 18,
                pane: 'labels',
                opacity: 1,
            }).addTo(map);

            // Keep the basemap monochrome while lifting the label overlay.
            const tilePane = mapRef.current!.querySelector(
                '.leaflet-tile-pane'
            ) as HTMLElement | null;
            if (tilePane) {
                tilePane.style.filter =
                    'grayscale(1) brightness(1.3) contrast(1.25)';
            }
            labelsPane.style.filter = 'grayscale(1) brightness(1.15) contrast(1.1)';

            // Custom orange pulsing dot marker
            const orangeIcon = L.divIcon({
                html: `<div style="
                    width:16px;height:16px;
                    background:#ea580c;
                    border:2.5px solid #1a1a1a;
                    border-radius:50%;
                    box-shadow:0 0 0 6px rgba(234,88,12,0.25), 0 0 12px rgba(234,88,12,0.4);
                "></div>`,
                iconSize: [16, 16],
                iconAnchor: [8, 8],
                className: '',
            });

            L.marker([LAT, LNG], { icon: orangeIcon }).addTo(map);

            mapInstance.current = map;
        });

        return () => {
            if (mapInstance.current) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (mapInstance.current as any).remove();
                mapInstance.current = null;
            }
        };
    }, []);

    return <div ref={mapRef} className="w-full h-full" />;
}
