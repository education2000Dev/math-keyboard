import React from 'react'
import ReactDOM from 'react-dom'
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux'
import MathQuill from 'mathquill'
import SVGInline from "react-svg-inline"

import actions from '../actions'

//import commonStyles from '../style'
import CleanBrackets from '../utils'
const Iconography = require('./iconography');

const MQ = MathQuill.getInterface(2);

class MathSignButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ClassName: 'math-board-number-button'
        }
    }
    onTouchStart = () => {
        this.setState({ClassName: 'math-board-number-button math-board-number-button-on-touch'});
    };
    onTouchEnd = (e) => {
        this.setState({ClassName: 'math-board-number-button'});
        this.props.handleClick();
        e.preventDefault();
    };
    componentDidMount() {
        if (this.props.value.value === '{' || this.props.value.value === '}') {
            
        } else {
            MQ.StaticMath(ReactDOM.findDOMNode(this.refs[this.props.value.value]));
        }
    }
    render() {
        let a =  this.props.value.name;
        const SvgForName = Iconography[a.toUpperCase()];
        let content = SvgForName? <SvgForName color='#000' />:this.props.value.value;


        return (
            <div className={this.state.ClassName + ' ' + this.props.value.extraClassName} onTouchStart={() => {this.onTouchStart()}} onTouchEnd={(e) => {this.onTouchEnd(e)}}>
                {content}
            </div>
        )
    }
}
const mathSigns = {
    line1: [
        {name: 'left_paren', value: '(', type: 'cmd', cmd: '('},
        {name: 'right_paren', value: ')', type: 'cmd', cmd: ')'},
        {name: 'cdot', value: '* / \\cdot', type: 'basic'},
        {name: 'frac', value: '\\frac{a}{b}', type: 'cmd', cmd: '\\frac'},
    ],
    line2: [
        {name: 'lbrace', value: '{', type: 'cmd', cmd: '{'},
        {name: 'rbrace', value: '}', type: 'cmd', cmd: '}'},
        {name: 'exp_2', value: 'x^2', type: 'multicmd'},
        {name: 'sqrt', value: '\\sqrt{x}', type: 'cmd', cmd: '\\sqrt'},
    ],
    line3: [
        {name: 'lt', value: '<', type: 'basic'},
        {name: 'gt', value: '>', type: 'basic'},
        {name: 'exp', value: 'x^{y}', type: 'multicmd'},
        {name: 'radical', value: '\\sqrt[y]{x}', type: 'multicmd'},
    ],
    line4: [
        {name: 'leq', value: '\\leq', type: 'basic'},
        {name: 'geq', value: '\\geq', type: 'basic'},
    ],
    line5: [
        {name: '7', value: '7', type: 'basic'},
        {name: '8', value: '8', type: 'basic'},
        {name: '9', value: '9', type: 'basic'},
        {name: 'plus', value: '+', type: 'basic',extraClassName:'mb_normal'},
    ],
    line6: [
        {name: '4', value: '4', type: 'basic'},
        {name: '5', value: '5', type: 'basic'},
        {name: '6', value: '6', type: 'basic'},
        {name: 'minus', value: '-', type: 'basic',extraClassName:'mb_normal'},
    ],
    line7: [
        {name: '1', value: '1', type: 'basic'},
        {name: '2', value: '2', type: 'basic'},
        {name: '3', value: '3', type: 'basic'},
        {name: 'times', value: '\\times', type: 'basic',extraClassName:'mb_normal'},
    ],
    line8: [
        {name: '0', value: '0', type: 'basic'},
        {name: 'period', value: '.', type: 'basic'},
        {name: 'equal', value: '=', type: 'basic'},
        {name: 'divide', value: '\\div', type: 'basic',extraClassName:'mb_normal'},
    ],
    line9: [
        {name: 'x_b', value: 'x_b', type: 'cmd', cmd: 'x_{}'},
        {name: '%', value: '%', type: 'basic'},
        {name: '|', value: '|', type: 'basic'},
        // {name: 'varnothing', value: '\\varnothing', type: 'basic'},
        {name: 'phi', value: '\\phi', type: 'basic'},
    ],
};

class MathBoard extends React.Component {
    onTouchEnd = (e, value) => {
        this.handleExtraClick(value);
        e.preventDefault();
    };
    handleExtraClick = (value) => {
        switch(value) {
            case 'Backspace':
                this.props.mq.keystroke('Backspace');
                this.props.input.val(this.props.mq.latex().replace(/\\\s/g, ' '));
                break;
            case 'Enter':
            case 'Hide':
                this.props.divelem.css('z-index', '1');
                this.props.dispatch(actions.hideKeyboard());
                this.props.mq.__controller.cursor.hide();
                this.props.mq.__controller.blurred = true;
                break;
            case 'Left':
                this.props.mq.keystroke('Left');
                break;
            case 'Right':
                this.props.mq.keystroke('Right');
                break;
            default:
        }
    };
    handleClick = (button) => {
        if (button.type === 'basic') {
            if (button.name === 'cdot') {
                this.props.mq.write('\\cdot');
            } else {
                this.props.mq.write(button.value);
            }
        } else if (button.type === 'cmd') {
            if (button.value === 'x_b'){
                this.props.mq.write(button.cmd);
            } else {
                this.props.mq.cmd(button.cmd);    
            }
        } else if (button.type === 'multicmd') {
            if (button.name === 'square') {
                this.props.mq.cmd('^');
                this.props.mq.write('2');
                this.props.mq.keystroke('Right');
            } else if (button.name === 'power') {
                // this.props.mq.cmd('(');
                // this.props.mq.keystroke('Right');
                // this.props.mq.cmd('^');
                // this.props.mq.cmd('(');
                this.props.mq.write('x^{y}')
                this.props.mq.keystroke('Left')
            } else if (button.name === 'root') {
                this.props.mq.write('\\sqrt[{}]{}');
                this.props.mq.keystroke('Left');
            }
        }

        this.props.mq.__controller.cursor.show();
        this.props.mq.__controller.blurred = false;     
        
        this.props.input.val(CleanBrackets(this.props.mq.latex()));
    };
    render() {
        return (
            <div className='math_advboard'>
                <div className='math-board-container'>
                    <div className="math-board-column">
                        <div className="math-board-row">
                            {mathSigns.line1.map((value, index) => {
                                return (
                                    <MathSignButton key={index} value={value} handleClick={() => {this.handleClick(value)}} />
                                )
                            })}
                        </div>
                        <div className="math-board-row">
                            {mathSigns.line2.map((value, index) => {
                                return (
                                    <MathSignButton key={index} value={value} handleClick={() => {this.handleClick(value)}} />
                                )
                            })}
                        </div>
                        <div className="math-board-row">
                            {mathSigns.line3.map((value, index) => {
                                return (
                                    <MathSignButton key={index} value={value} handleClick={() => {this.handleClick(value)}} />
                                )
                            })}
                        </div>
                        <div className="math-board-row">
                            {mathSigns.line4.map((value, index) => {
                                return (
                                    <MathSignButton key={index} value={value} handleClick={() => {this.handleClick(value)}} />
                                )
                            })}
                        </div>

                    </div>
                    <div className="math-board-column">
                        <div className="math-board-row">
                            {mathSigns.line5.map((value, index) => {
                                return (
                                    <MathSignButton key={index} value={value} handleClick={() => {this.handleClick(value)}} />
                                )
                            })}
                        </div>
                        <div className="math-board-row">
                            {mathSigns.line6.map((value, index) => {
                                return (
                                    <MathSignButton key={index} value={value} handleClick={() => {this.handleClick(value)}} />
                                )
                            })}
                        </div>
                        <div className="math-board-row">
                            {mathSigns.line7.map((value, index) => {
                                return (
                                    <MathSignButton key={index} value={value} handleClick={() => {this.handleClick(value)}} />
                                )
                            })}
                        </div>
                        <div className="math-board-row">
                            {mathSigns.line8.map((value, index) => {
                                return (
                                    <MathSignButton key={index} value={value} handleClick={() => {this.handleClick(value)}} />
                                )
                            })}
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToPropsForMathBoard = (state) => {
    return {
        mq: state.value.mq,
        input: state.this.input,
        divelem: state.this.divelem,
    }
};

const ConnectedMathBoard = connect(mapStateToPropsForMathBoard)(MathBoard);

export default ConnectedMathBoard;