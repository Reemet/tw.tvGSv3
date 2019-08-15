export default function(state = null, action) {
    switch(action.type) {
        case 'FIND_GAME_BY_ID':
            return action.payload;
        default: 
            return state;
    }
}