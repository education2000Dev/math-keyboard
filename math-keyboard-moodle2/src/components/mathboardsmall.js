import React from 'react'
import ReactDOM from 'react-dom'
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux'
import MathQuill from 'mathquill'

import actions from '../actions'

import commonStyles from '../style'

const MQ = MathQuill.getInterface(2);

class MathSignButton extends React.Component {
    componentDidMount() {
        MQ.StaticMath(ReactDOM.findDOMNode(this.refs[this.props.value]));
    }
    render() {
        return (
            <div className='number-button-container col-xs-1-10'>     
                <div className='number-button'><span ref={this.props.value}>{this.props.value}</span></div>
            </div>
        )
    }
}

const mathSigns = {
    line1: [
        {name: 'square', value: 'x^2', type: 'cmd'},
        {name: 'power', value: '(x)^{(y)}', type: 'cmd'},
        {name: 'cdot', value: '\\cdot', type: 'basic'},
        {name: 'times', value: '\\times', type: 'basic'},
        {name: 'leftParenthesis', value: '(', type: 'cmd'},
        {name: 'rightParenthesis', value: ')', type: 'cmd'},
    ],
    line2: [
        {name: 'root', value: '\\sqrt[y]{x}', type: 'cmd'},
        {name: 'squareRoot', value: '\\sqrt{x}', type: 'cmd'},
        {name: 'fraction', value: '\\frac{a}{b}', type: 'cmd'},
        {name: 'division', value: '\\div', type: 'basic'},
        {name: 'leftBracket', value: '{', type: 'basic'},
        {name: 'rightBracket', value: '}', type: 'basic'},
    ],
    line3: [
        {name: 'dot', value: '.', type: 'basic'},
        {name: 'plus', value: '+', type: 'basic'},
        {name: 'lessThen', value: '<', type: 'basic'},
        {name: 'greaterThen', value: '>', type: 'basic'},
    ],
    line4: [
        {name: 'equal', value: '=', type: 'basic'},
        {name: 'minus', value: '-', type: 'basic'},
        {name: 'lessThenOrEqual', value: '\\leq', type: 'basic'},
        {name: 'greaterThenOrEqual', value: '\\geq', type: 'basic'},
    ],
}

class MathBoardSmall extends React.Component {
    render() {
        return (
            <div>
                
                    {mathSigns.line1.map((value, index) => {
                        return <MathSignButton key={index} value={value.value} />
                    })}
                                <div className='col-xs-1-10 fake-button'></div>
                                <div className='col-xs-1-10 fake-button'></div>
                                <div className='col-xs-1-10 fake-button'></div>
                                <div className='col-xs-1-10 fake-button'></div> 
                
                    {mathSigns.line2.map((value, index) => {
                        return <MathSignButton key={index} value={value.value} />
                    })}
                                <div className='col-xs-1-10 fake-button'></div>
                                <div className='col-xs-1-10 fake-button'></div>
                                <div className='col-xs-1-10 fake-button'></div>
                                <div className='col-xs-1-10 fake-button'></div>
                                <div className='col-xs-1-10 fake-button'></div>
                                <div className='col-xs-1-10 fake-button'></div>
                    {mathSigns.line3.map((value, index) => {
                        return <MathSignButton key={index} value={value.value} />
                    })}
                
                                <div className='col-xs-1-10 fake-button'></div>
                                <div className='col-xs-1-10 fake-button'></div>
                                <div className='col-xs-1-10 fake-button'></div>
                                <div className='col-xs-1-10 fake-button'></div>
                                <div className='number-button-container col-xs-1-10'>
                                    <div className='number-button' onClick={() => {this.props.dispatch(actions.toggleShowMathboard())}}>back</div>
                                </div>
                                <div className='col-xs-1-10 fake-button'></div>
                    {mathSigns.line4.map((value, index) => {
                        return <MathSignButton key={index} value={value.value} />
                    })}
            </div>
        )
    }
}

const mapStateToPropsForMathBoardSmall = (state) => {
    return {
        capslock: state.keyboard.capslock,
        showmathboard: state.keyboard.showmathboard
    }
}

const ConnectedMathBoardSmall = connect(mapStateToPropsForMathBoardSmall)(MathBoardSmall);

export default ConnectedMathBoardSmall;