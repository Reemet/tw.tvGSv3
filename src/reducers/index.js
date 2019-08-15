import { combineReducers } from 'redux';
import topGamesReducer from './reducer_games';
import topStreamsReducer from './reducer_topstreams';
import findByNameReducer from './find_game_by_name';
import findByIDReducer from './find_by_id_reducer'
import playStreamReducer from './play_stream_reducer';
import currentUserReducer from './current_user_name';
import isChannelListMountedReducer from './channel_list_mount_reducer';
import channelIndexReducer from './channel_index_reducer';
import gamesMountedReducer from './games_mounted_reducer';
import currentChannelsReducer from './current_channels_reducer';
import currentListNameRecuder from './current_list_name_recuder';
import previousListNameRecuder from './previous_list_name_recuder';
import bookmarkReducer from './bookmark_reducer';
import showBookmarkReducer from './show_bookmark_reducer';

import loaderReducer from './loader_reducer';

const rootReducer = combineReducers({
    topGames: topGamesReducer,
    topStreams: topStreamsReducer,
    byNameResult: findByNameReducer,
    byIdResult: findByIDReducer,
    currentlyPlaying: playStreamReducer,
    currentUserName: currentUserReducer,
    isChannelListMounted: isChannelListMountedReducer,
    savedChannelIndex: channelIndexReducer,
    isGamesMounted: gamesMountedReducer,
    currentChannelList: currentChannelsReducer,
    currentListName: currentListNameRecuder,
    previousListName: previousListNameRecuder,
    loading: loaderReducer,
    bookmarks: bookmarkReducer,
    renderBookmarks: showBookmarkReducer
});

export default rootReducer;