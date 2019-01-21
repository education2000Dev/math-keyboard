import React from 'react'
import ReactDOM from 'react-dom'
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux'
import MathQuill from 'mathquill'

import actions from '../actions'

import commonStyles from '../style'

const MQ = MathQuill.getInterface(2);

class MathSignButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ClassName: 'math-board-number-button'
        }
    }
    onTouchStart = () => {
        this.setState({ClassName: 'math-board-number-button-on-touch'});
    }
    onTouchEnd = () => {
        this.setState({ClassName: 'math-board-number-button'});
        this.props.handleClick();
    }
    componentDidMount() {
        if (this.props.value === '{' || this.props.value === '}') {
            
        } else {
            MQ.StaticMath(ReactDOM.findDOMNode(this.refs[this.props.value]));
        }
    }
    render() {
        return (
            <div className={this.state.ClassName} onTouchStart={() => {this.onTouchStart()}} onTouchEnd={() => {this.onTouchEnd()}}><span ref={this.props.value}>{this.props.value}</span></div>
        )
    }
}

const mathSigns = {
    line1: [
        {name: 'leftParenthesis', value: '(', type: 'cmd', cmd: '('},
        {name: 'rightParenthesis', value: ')', type: 'cmd', cmd: ')'},
        {name: 'cdot', value: '\\cdot', type: 'basic'},
        {name: 'fraction', value: '\\frac{a}{b}', type: 'cmd', cmd: '\\frac'},
    ],
    line2: [
        {name: 'leftBracket', value: '{', type: 'cmd', cmd: '{'},
        {name: 'rightBracket', value: '}', type: 'cmd', cmd: '}'},
        {name: 'square', value: 'x^2', type: 'multicmd'},
        {name: 'squareRoot', value: '\\sqrt{x}', type: 'cmd', cmd: '\\sqrt'},
    ],
    line3: [
        {name: 'lessThen', value: '<', type: 'basic'},
        {name: 'greaterThen', value: '>', type: 'basic'},
        {name: 'power', value: '(x)^{(y)}', type: 'multicmd'},
        {name: 'root', value: '\\sqrt[y]{x}', type: 'multicmd'},
    ],
    line4: [
        {name: 'lessThenOrEqual', value: '\\leq', type: 'basic'},
        {name: 'greaterThenOrEqual', value: '\\geq', type: 'basic'},
    ],
    line5: [
        {name: '7', value: '7', type: 'basic'},
        {name: '8', value: '8', type: 'basic'},
        {name: '9', value: '9', type: 'basic'},
        {name: '+', value: '+', type: 'basic'},
    ],
    line6: [
        {name: '4', value: '4', type: 'basic'},
        {name: '5', value: '5', type: 'basic'},
        {name: '6', value: '6', type: 'basic'},
        {name: '-', value: '-', type: 'basic'},
    ],
    line7: [
        {name: '1', value: '1', type: 'basic'},
        {name: '2', value: '2', type: 'basic'},
        {name: '3', value: '3', type: 'basic'},
        {name: 'times', value: '\\times', type: 'basic'},
    ],
    line8: [
        {name: '0', value: '0', type: 'basic'},
        {name: '.', value: '.', type: 'basic'},
        {name: '=', value: '=', type: 'basic'},
        {name: 'division', value: '\\div', type: 'basic'},
    ],
}

class MathBoard extends React.Component {
    handleClick = (button) => {
        if (button.type === 'basic') {
            this.props.mq.write(button.value);
        } else if (button.type === 'cmd') {
            this.props.mq.cmd(button.cmd);
        } else if (button.type === 'multicmd') {
            if (button.name === 'square') {
                this.props.mq.cmd('^');
                this.props.mq.write('2');
                this.props.mq.keystroke('Right');
            } else if (button.name === 'power') {
                this.props.mq.cmd('(');
                this.props.mq.keystroke('Right');
                this.props.mq.cmd('^');
                this.props.mq.cmd('(');
            } else if (button.name === 'root') {
                this.props.mq.write('\\sqrt[{}]{}');
                this.props.mq.keystroke('Left');
            }
        }

        this.props.mq.__controller.cursor.show();
        this.props.mq.__controller.blurred = false;       
    }
    render() {
        return (
            <div>
                <div className='math-board-container col-xs-4-12'>
                    {mathSigns.line1.map((value, index) => {
                        return (
                            <div key={index} className='number-button-container col-xs-3-12'>
                                <MathSignButton value={value.value} handleClick={() => {this.handleClick(value)}} />
                            </div>
                        )
                    })}
                    {mathSigns.line2.map((value, index) => {
                        return (
                            <div key={index} className='number-button-container col-xs-3-12'>
                                <MathSignButton value={value.value} handleClick={() => {this.handleClick(value)}}  />
                            </div>
                        )        
                    })}
                    {mathSigns.line3.map((value, index) => {
                        return (
                            <div key={index} className='number-button-container col-xs-3-12'>
                                <MathSignButton value={value.value} handleClick={() => {this.handleClick(value)}}  />
                            </div>
                        )        
                    })}
                    <div className='number-button-container col-xs-6-12'>
                        <div className='math-board-number-button-on-touch' onClick={() => {this.props.dispatch(actions.toggleShowMathboard())}}> A B C</div>
                    </div>
                    {mathSigns.line4.map((value, index) => {
                        return (
                            <div key={index} className='number-button-container col-xs-3-12'>
                                <MathSignButton value={value.value} handleClick={() => {this.handleClick(value)}}  />
                            </div>
                        )        
                    })}
                </div>
                <div className='math-board-container col-xs-4-12'>
                {mathSigns.line5.map((value, index) => {
                        return (
                            <div key={index} className='number-button-container col-xs-3-12'>
                                <MathSignButton value={value.value} handleClick={() => {this.handleClick(value)}}  />
                            </div>
                        )        
                    })}
                {mathSigns.line6.map((value, index) => {
                        return (
                            <div key={index} className='number-button-container col-xs-3-12'>
                                <MathSignButton value={value.value} handleClick={() => {this.handleClick(value)}}  />
                            </div>
                        )        
                    })}
                {mathSigns.line7.map((value, index) => {
                        return (
                            <div key={index} className='number-button-container col-xs-3-12'>
                                <MathSignButton value={value.value} handleClick={() => {this.handleClick(value)}}  />
                            </div>
                        )        
                    })}
                {mathSigns.line8.map((value, index) => {
                        return (
                            <div key={index} className='number-button-container col-xs-3-12'>
                                <MathSignButton value={value.value} handleClick={() => {this.handleClick(value)}}  />
                            </div>
                        )        
                    })}
                </div>
                <div className='math-board-container col-xs-4-12'>
                    <div className='number-button-container col-xs-6-12'>
                        <div className='math-board-number-button' onClick={() => {this.props.mq.keystroke('Backspace');}}>Backspace</div>
                    </div>
                    <div className='number-button-container col-xs-6-12'>
                        <div className='math-board-number-button' onClick={() => {this.props.dispatch(actions.hideKeyboard());this.props.mq.__controller.cursor.hide();this.props.mq.__controller.blurred = true;}}>Hide</div>
                    </div>
                    <div className='number-button-container col-xs-6-12'>
                        <div className='math-board-number-button' onClick={() => {this.props.mq.keystroke('Left');}}>Left</div>
                    </div>
                    <div className='number-button-container col-xs-6-12'>
                        <div className='math-board-number-button' onClick={() => {this.props.mq.keystroke('Right');}}>Right</div>
                    </div>
                    
                    <div className='number-button-container col-xs-12-12'>
                        <div className='math-board-number-button'>Enter</div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToPropsForMathBoard = (state) => {
    return {
        mq: state.value.mq,
    }
}

const ConnectedMathBoard = connect(mapStateToPropsForMathBoard)(MathBoard);

export default ConnectedMathBoard;