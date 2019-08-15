export default function(state = null, action) {
    switch(action.type) {
        case 'USER_PLAYING':
            return action.payload;
           
        default:
            return state;
      
    }
}