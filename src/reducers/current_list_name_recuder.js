export default function(state = null, action) {
    switch(action.type) {
        case 'CURRENT_CHANNEL_LIST_NAME':
            return action.payload;
        default: 
            return state;
    }
}