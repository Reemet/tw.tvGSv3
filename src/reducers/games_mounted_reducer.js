export default function(state = 0, action) {
    switch(action.type) {
        case 'IS_GAMES_MOUNTED':
            return action.payload;
        default: 
            return state;
    }
}