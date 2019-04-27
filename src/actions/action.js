import {ADD, SUB} from './actionsTypes'
export const sub = () => dispatch => {
    console.log('触发了sub')
    return dispatch({
        type: SUB
    })
}

export const add = () => dispatch => {
    console.log('触发了add')
    return dispatch({
        type: ADD
    })
}