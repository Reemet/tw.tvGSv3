export default function(state = null, action) {
    switch(action.type) {
        case 'PREVIOUS_LIST_NAME':
            return action.payload;
        default: 
            return state;
    }
}