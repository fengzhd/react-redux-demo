import {createStore, applyMiddleware, compose} from 'redux'
import reducer from '../reducers/index'
import thunk from 'redux-thunk'
const defaultState = {}
const store = createStore(
    reducer,
    defaultState,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

export default store