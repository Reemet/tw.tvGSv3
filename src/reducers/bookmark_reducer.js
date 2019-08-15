export default function(state = false, action) {
    switch(action.type) {
        case 'GET_BOOKMARKS':
            return action.payload;
        default: 
            return state;
    }
}