import NowPlayingWidget from '../NowPlayingWidget';
import ConnectWidget from './ConnectWidget';
import MapWidget from './MapWidget';
import ClickCounterWidget from './ClickCounterWidget';

export default function BentoGrid() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" style={{ gridAutoRows: '230px' }}>
            {/* Widget 1: Spotify Now Playing */}
            <NowPlayingWidget />

            {/* Widget 2: Let's Connect */}
            <ConnectWidget />

            {/* Widget 3: Location Map */}
            <MapWidget />

            {/* Widget 4: Interactive Click Counter */}
            <ClickCounterWidget />
        </div>
    );
}
