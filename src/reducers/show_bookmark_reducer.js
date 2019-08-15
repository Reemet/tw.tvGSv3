export default function(state = null, action) {
    switch(action.type) {
        case 'SHOW_BOOKMARKS':
            return action.payload;
        default: 
            return state;
    }
}