export default function( state = null, action) {
    switch(action.type) {
        case 'FIND_GAME_BY_NAME':
            return action.payload;
        default:
            return state;
    }
}