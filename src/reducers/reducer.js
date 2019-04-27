import {ADD, SUB} from '../actions/actionsTypes'
const initState = {
    num: 0
}
export const reducer = (state = initState, action) => {
    console.log('触发了reducer')
    switch(action.type) {
        case ADD:
            return {
                num: state.num+1
            }
        case SUB:
            return {
                num: state.num-1
            }
        default:
            return state
    }
}
export default reducer