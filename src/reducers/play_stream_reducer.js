export default function( state = null, action) {
    switch(action.type) {
        case 'PLAY_STREAM':     
            return action.payload;
        default:
            return state;
    }
}