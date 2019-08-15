export default function(state = null, action) {
    switch(action.type) {
        case 'IS_CHANNEL_LIST_MOUNTED':
            return action.payload;
        default:
            return state;
    }
}