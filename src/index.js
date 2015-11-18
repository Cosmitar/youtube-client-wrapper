import YouTubeVideo from './entities/YouTubeVideo';
import YouTubeChannel from './entities/YouTubeChannel';
import YouTubePlaylist from './entities/YouTubePlaylist';
import YouTubeSearch from './entities/YouTubeSearch';
import YouTubeConfig from './services/Config';
import YouTubeAuth from './services/Auth';

export default {
    Video: YouTubeVideo,
    Channel: YouTubeChannel,
    Playlist: YouTubePlaylist,
    Search: YouTubeSearch,
    Config: YouTubeConfig,
    Auth: YouTubeAuth
};