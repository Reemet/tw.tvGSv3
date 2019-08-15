export default function(state = null, action) {
    switch(action.type) {
        case 'CURRENT_CHANNEL_LIST':
                console.log('CASE IS TRUE');
            return action.payload;
        default: 
            return state;
    }
}