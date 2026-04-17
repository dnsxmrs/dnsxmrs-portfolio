'use client';

import { useEffect, useRef } from 'react';

// San Isidro, Rodriguez (Montalban), Rizal
const LAT = 14.75350988448972;
const LNG = 121.14156213840742;
const ZOOM = 14;

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

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
            }).addTo(map);

            // Custom orange dot marker
            const orangeIcon = L.divIcon({
                html: `<div style="
                    width:14px;height:14px;
                    background:#ea580c;
                    border:2.5px solid white;
                    border-radius:50%;
                    box-shadow:0 0 0 5px rgba(234,88,12,0.2);
                "></div>`,
                iconSize: [14, 14],
                iconAnchor: [7, 7],
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
