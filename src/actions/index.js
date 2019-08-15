import axios from 'axios';
import * as CLIENTID from '../helpers';

const LOADING = 'LOADING';

const FETCH_TOP_STREAMS = 'FETCH_TOP_STREAMS';
const FETCH_TOP_GAMES = 'FETCH_TOP_GAMES';

const FIND_GAME_BY_ID = 'FIND_GAME_BY_ID';
const PLAY_STREAM = 'PLAY_STREAM';
const USER_PLAYING = 'USER_PLAYING';

const IS_GAMES_MOUNTED = 'IS_GAMES_MOUNTED';

const IS_CHANNEL_LIST_MOUNTED = 'IS_CHANNEL_LIST_MOUNTED';
const CURRENT_CHANNEL_LIST = 'CURRENT_CHANNEL_LIST';
const CURRENT_CHANNEL_LIST_NAME = 'CURRENT_CHANNEL_LIST_NAME';
const SAVE_INDEX = 'SAVE_INDEX';


const servers = [];
const helix = axios.create({
    baseURL: 'https://api.twitch.tv/helix/',
    headers: {'Client-ID': CLIENTID.default},
    
  });
const paramFirst = '?first=100';

export function getTopGames(boo) {
    return dispatch => {
        helix.get(`/games/top/${paramFirst}`).then(games => {
            const payload = games.data.data;
            payload.unshift({id: "1", name: "Top 100", box_art_url: ""});

            dispatch({
                type: FETCH_TOP_GAMES,
                payload: payload
            });
        });
        if(boo) {
            dispatch({
                type: LOADING,
                payload: false
            });
        }
    }
}
export function getTopStreams(play) {
    return dispatch => {
        helix.get(`/streams/${paramFirst}`).then(streams => {
            const payload = streams.data.data;

            
            dispatch({
                type: FETCH_TOP_STREAMS,
                payload: payload
            });
            
            if (play) {
                dispatch(switchChannelList(payload));
                dispatch(currentChannelListName("Top 100"));
                dispatch(playStream(payload[0]));
                dispatch(isLoading(false));
            } else {
                dispatch(switchChannelList(payload));

                dispatch({
                    type: LOADING,
                    payload: false
                })
            }
            
            

        });
    }
}

export function findGameByName(query, cb) {
    return dispatch => {
        if (query == "Top 100") {
            dispatch(currentChannelListName(query));
            dispatch(getTopStreams(false));
            
        } else {
            helix.get(`/games?name=${query}`).then(results => {
                const { id } = results.data.data[0] || null;
    
                dispatch(findGameByID(id));
                dispatch(currentChannelListName(query));
            });
        }
             
    }
}

export function findGameByID(id, noLoad) {
    return dispatch => {
        helix.get(`/streams?game_id=${id}&first=100`).then(results => {
            const payload = results.data.data;

            dispatch({
                type: FIND_GAME_BY_ID,
                payload: payload
            });
            dispatch(switchChannelList(payload));
            
            dispatch({
                type: IS_CHANNEL_LIST_MOUNTED,
                payload: true
            });

            dispatch({
                type: LOADING,
                payload: false
            })
        });
    }
}

export function playStream(data) {
       // maybe some prework
       return dispatch => {
        helix.get(`/users?id=${data.user_id}`).then(results => {
            
            dispatch({
                type: USER_PLAYING,
                payload: results.data.data[0].login
            })

            dispatch({
                type: PLAY_STREAM,
                payload: data
            });
            dispatch(isLoading(false));
        });
       }
}
export function playNext(current, streamList) {
    const  data  = streamList;
    let next;
    for(let i = 0; i < data.length; i ++) {
        if(data[i].id == current.id) {
            if(i === data.length-1) {
                next = data[0];
                break;
            }
            next = data[i+1];
            break;
        }
    }

    return dispatch => {
        dispatch(playStream(next));
    }

}
export function playPrevious(current, streamList) {
    const data  = streamList;
    let next;

    for(let i = 0; i < data.length; i ++) {
        if(data[i].id == current.id) {
            if(i === 0) {
                next = data[data.length-1];
                break
            }
            next = data[i-1];
            break;
        }
    }
    return dispatch => {
        dispatch(playStream(next));
    }
}
export function gamesMenuMount(boolean, shouldUpdate) {
    console.log('gamesMount:', boolean);
    return dispatch => {
        if(shouldUpdate) {
            dispatch({
                type: LOADING,
                payload: true
            })
            dispatch(getTopGames(shouldUpdate))
        }

        dispatch({
            type: IS_GAMES_MOUNTED,
            payload: boolean
        })

        
    }
}

export function channelListMount(boolean) {
    return dispatch => {
        dispatch(gamesMenuMount(false));
        dispatch({
            type: IS_CHANNEL_LIST_MOUNTED,
            payload: boolean
        })
        
    }
}
export function saveCurrentPosition(index) {
    return dispatch => {
        dispatch({
            type: SAVE_INDEX,
            payload: index
        })
    }
}
export function switchChannelList(data) {
    return dispatch => {
        dispatch({
            type: CURRENT_CHANNEL_LIST,
            payload: data
        });
    }

}

export function currentChannelListName(name) {
    return dispatch => {
        dispatch({
            type: CURRENT_CHANNEL_LIST_NAME,
            payload: name,
        })
    }
}
export function isLoading(boolean) {
    console.log('loading!');
    return {
        type: LOADING,
        payload: boolean
    }
}


    /*return dispatch => {
        axios.get(`${server}/games/top`).then(games => {
            const payload = games.data.top.filter(game => game.game.name !== 'Games + Demos');
            payload.unshift({id: 1, game: {name: 'Top 100'}});
            dispatch({
                type: FETCH_TOP_GAMES,
                payload: payload
            });

            return callback ? callback() : null;
        });
    };
}
/*export function getTopGames(server) {
    console.log('CALLED!');
    return dispatch => {
        axios.get(`${server}/mature-content`).then(games => {
            dispatch({
                type: FETCH_MATURE_GAMES,
                payload: games.data.mature_games
            });
        });
    };
}*/ 
/*export function getTopStreams(server, callback) {
    return dispatch => {
        axios.get(`${server}/initial/streams`).then(streams => {
            dispatch({
                type: FETCH_TOP_STREAMS,
                payload: streams.data.streams
            });
            dispatch({
                type: CURRENT_LIST,
                payload: 'Top 100'
            });
            dispatch({
                type: SELECT_GAME,
                payload: null
            })

            if(callback === true) {
                dispatch(getHLSStream(server, streams.data.streams[0].channel.name));
            } else {
                return callback();
            }
        }).catch(() => {
            dispatch(setServiceError());
        });
    };
}

*/
/*export function getGameStreams(server, game, callback) {
    return dispatch => {
        axios.get(`${server}/streamers/${game}`).then(streams => {
            dispatch({
                type: FETCH_TOP_STREAMS,
                payload: streams.data.streams
            });
            dispatch({
                type: CURRENT_LIST,
                payload: game
            });

            return callback ? callback() : null;
        });
    };
}
export function searchStreams(server, query) {
    return dispatch => {
        axios.get(`${server}/search-streams/${query}`).then(streams => {
            dispatch({
                type: FETCH_SEARCH_STREAMS,
                payload: streams.data.streams
            });

            dispatch(isLoading(false));
        });
    };
}*/


