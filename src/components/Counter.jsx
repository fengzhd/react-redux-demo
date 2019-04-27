import React, { Component } from 'react'
import {connect} from 'react-redux'
import {sub, add} from '../actions/action'
export class Counter extends Component {
  render() {
    return (
      <div>
        <button style={{fontSize: 30}} onClick={this.props.sub}>-</button>
        <span style={{padding: '0 30px'}}>{this.props.num}</span>
        <button style={{fontSize: 30}} onClick={this.props.add}>+</button>
      </div>
    )
  }
}
const mapStateToProps = state => {
    return {
        num: state.reducer.num
    }
}
export default connect(mapStateToProps,{sub, add})(Counter)
