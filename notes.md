# redux

###### 工作流程

1. 组件中触发 action 中的函数（可以传入数据）
2. action 中的函数通过 dispatch 将指定类型的 action 发送至 store（可以携带数据）
3. store 将收到的 action 发送给 reducer
4. reducer 接收到 action，并获取 action 类型和其 携带的数据
5. reducer 通过判断 action 类型做出相应的操作，返回一个新的 state 给 store
6. store 收到新的 state 传递给组件
7. 组件收到更新信息作出相应的视图更新操作

###### demo

1. 使用 create-react-app 创建 react 项目

2. 安装 redux react-redux 

3. 安装 redux-thunk 中间件

4. 创建 store 文件夹， 并创建 index.js 

   ```javascript
   import {createStore, applyMiddleware, compose} from 'redux'
   import reducer from '../reducers/index'
   import thunk from 'redux-thunk'
   const defaultState = {}
   const store = createStore(		// 调用 createStore 函数生成一个 store
       reducer,									// 将 reducer 传入，这个 reducer 可以是多个 reducer 的集合
       defaultState,							// 传入默认的 state
       compose(						
           applyMiddleware(thunk),			// 使用 thunk 中间件，使 action 能够返回一个函数（必需）
           window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // 使用浏览器插件
       )
   )
   export default store
   ```

5. 在 index.js 中引入 Provider 将 全局的 App组件包起来，并传入 store

   ```react
   import {Provider} from 'react-redux'
   import store from './store/index'
   ReactDOM.render(
     <Provider store={store}>
       <App />
     </Provider>,
     document.getElementById('root')
   );
   ```

6. 创建 components 文件夹，并定义 Counter 组件

   ```react
   import React, { Component } from 'react'
   import {connect} from 'react-redux'
   import {sub, add} from '../actions/action'
   export class Counter extends Component {
     render() {
       return (
         <div>
           <button style={{fontSize: 30}} onClick={this.props.sub}>-</button>	{/* this.props.sub 可以调用到 action.js 中的 sub 方法， 这时会打印 ‘触发了sub’*/}
           <span style={{padding: '0 30px'}}>{this.props.num}</span>		{/* this.props.num 实际上是获取的 reducer.js 中的 state 中的 num，这里通过下面的 connect 中的 mapStateToProps 重新转化得到 */}
           <button style={{fontSize: 30}} onClick={this.props.add}>+</button>
         </div>
       )
     }
   }
   const mapStateToProps = state => {		// 这里的 state 相当于 store，store 相当于一个大 state，这个 state 中又包含多个小的 state(即 reducer.js)，小的 state 中包含各自的数据
       return {
           num: state.reducer.num
       }
   }
   export default connect(mapStateToProps,{sub, add})(Counter)
   // connect 将当前组件和 state，action 联系起来，使得可以在组件中调用action中的方法和state中的数据
   // connect 方法传入 mapStateToProps 和 mapDispatchToProps 两个参数，这两个参数均为对象
   // mapStateToProps，将 state 转换为 props，可以通过 this.props.xxx 获取 state中的数据，这个数据是响应式的，只要 state 变化，这里就更新，如果组件不需要从 state 中获取数据，这里参数可以为 null
   // mapDispatchToProps 将 action 中的方法转换为 props， 可以通过 this.props.xxx 调用
   
   ```

7. 在 App.js 中 引入 Counter 组件

   ```react
   import React from 'react';
   import './App.css';
   import Counter from './components/Counter'
   function App() {
     return (
       <div className="App">
         <header className="App-header">
           <Counter></Counter>
         </header>
       </div>
     );
   }
   export default App;
   ```

   

8. 创建actinos文件夹，用来存储各个组件中需要定义的方法文件

9. 在 actinos 文件夹下创建 actionsTypes.js 文件，用来存储 action 和 reducer 相对应的指令

   ```javascript
   export const ADD = 'ADD'
   export const SUB = 'SUB'
   ```

10. 在 actions 文件夹下创建 action.js 文件，用来存储各种方法

   ```javascript
   import {ADD, SUB} from './actionsTypes'
   export const sub = () => dispatch => {	// 定义一个减1的函数，返回一个参数为 dispatch 的函数
       console.log('触发了sub')
       return dispatch({						// 将 action dispatch 到 reducer，这时会打印 ’触发了reducer‘
           type: SUB
       })
   }
   
   export const add = () => dispatch => {
       console.log('触发了add')
       return dispatch({
           type: ADD
       })
   }
   ```

   

11. 创建 reducers 文件夹, 用来存放各个reducer， 每个reducer 相当于一个子 state

12. 在 reducers 文件夹下创建 index.js 文件 用来合并所以的 reducer

    ```javascript
    import { combineReducers } from "redux";	// 引入 combinReducers 函数，用来合并多个 reducer 
    import reducer from './reducer'
    export default combineReducers({
        reducer
    })
    ```

13. 在 reducers 文件夹下创建 reducer.js 文件

    ```javascript
    import {ADD, SUB} from '../actions/actionsTypes'
    const initState = {																// 初始化一个 state 
        num: 0
    }
    export const reducer = (state = initState, action) => { // 每个 reducer 函数接收 state 和 action 两个参数，action 由 action.js 中的方法 dispatch 过来的
        console.log('触发了reducer')
        switch(action.type) {
            case ADD:										// 通过判断 action 类型，做出对应的操作，返回新的 state 给 store
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
    ```

    

    