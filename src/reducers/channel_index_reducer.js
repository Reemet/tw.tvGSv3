export default function(state = 0, action) {
    switch(action.type) {
        case 'SAVE_INDEX':
            return action.payload;
        default: 
            return state;
    }
}