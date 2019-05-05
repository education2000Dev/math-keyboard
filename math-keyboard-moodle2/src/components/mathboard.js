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

const ExtraButton = require('./buttons/extra');
const WordButton = require('./buttons/word');
class MathSignButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ClassName: 'math-board-number-button'
        };
        this.config = mathSigns[this.props.value];
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
        if (this.config.value === '{' || this.config.value === '}') {
            
        } else {
            MQ.StaticMath(ReactDOM.findDOMNode(this.refs[this.config.value]));
        }
    }
    render() {
        let a =  this.props.value;
        const SvgForName = Iconography[a.toUpperCase()];
        let content = SvgForName? <SvgForName color='#000' />:this.config.value;

        return (
            <div className={this.state.ClassName + ' ' + (this.config.extraClassName||'')} onTouchStart={() => {this.onTouchStart()}} onTouchEnd={(e) => {this.onTouchEnd(e)}}>
                {content}
            </div>
       )
    }
}
const mathSigns = {
    'left_paren':{value: '(', type: 'cmd', cmd: '('},
    'right_paren':{value: ')', type: 'cmd', cmd: ')'},
    'cdot':{value: '* / \\cdot', type: 'basic',extraClassName:'mb_normal'},
    'frac':{value: '\\frac{a}{b}', type: 'cmd', cmd: '\\frac',extraClassName:'mb_extra'},
    'lbrace':{value: '{', type: 'cmd', cmd: '{'},
    'rbrace':{value: '}', type: 'cmd', cmd: '}'},
    'exp_2':{value: 'x^2', type: 'multicmd',extraClassName:'mb_extra'},
    'sqrt':{value: '\\sqrt{x}', type: 'cmd', cmd: '\\sqrt',extraClassName:'mb_extra'},
    'lt':{value: '<', type: 'basic'},
    'gt':{value: '>', type: 'basic'},
    'exp':{value: 'x^{y}', type: 'multicmd',extraClassName:'mb_extra'},
    'radical':{value: '\\sqrt[y]{x}', type: 'multicmd',extraClassName:'mb_extra'},
    'leq':{value: '\\leq', type: 'basic'},
    'geq':{value: '\\geq', type: 'basic'},
    '7':{value: '7', type: 'basic'},
    '8':{value: '8', type: 'basic'},
    '9':{value: '9', type: 'basic'},
    'plus':{value: '+', type: 'basic',extraClassName:'mb_normal'},
    '4':{value: '4', type: 'basic'},
    '5':{value: '5', type: 'basic'},
    '6':{value: '6', type: 'basic'},
    'minus':{value: '-', type: 'basic',extraClassName:'mb_normal'},
    '1':{value: '1', type: 'basic'},
    '2':{value: '2', type: 'basic'},
    '3':{value: '3', type: 'basic'},
    'times':{value: '\\times', type: 'basic',extraClassName:'mb_normal'},
    '0':{value: '0', type: 'basic'},
    'period':{value: '.', type: 'basic'},
    'equal':{value: '=', type: 'basic'},
    'divide':{value: '\\div', type: 'basic',extraClassName:'mb_normal'},
    'subscript':{value: 'x_b', type: 'cmd', cmd: 'x_{}'},
    '%':{value: '%', type: 'basic'},
    '|':{value: '|', type: 'basic'},
    // 'varnothing':{value: '\\varnothing', type: 'basic'},
    'a':{value: 'a', type: 'basic'},
    'b':{value: 'b', type: 'basic'},
    'c':{value: 'c', type: 'basic'},
    'x':{value: 'x', type: 'basic'},
    'y':{value: 'y', type: 'basic'},
    'lbracket':{value: 'x', type: 'basic'},
    'rbracket':{value: 'x', type: 'basic'},
    'neq':{value: 'x', type: 'basic'},
    'approx':{value: 'x', type: 'basic'},
    'cap':{value: 'x', type: 'basic'},
    'cup':{value: 'x', type: 'basic'},
    'pm':{value: 'x', type: 'basic'},
    'pi':{value: 'x', type: 'basic'},
    'phi':{value: 'x', type: 'basic'},
    'delta':{value: 'x', type: 'basic'},
    'none':{value: 'x', type: 'basic'},

};

const mathSignsConfig = {
    Area1:{
        Line1:['plus','minus','times','divide','cdot'],
        Line2:['left_paren','right_paren','frac','period','equal'],
        Line3:['a','b','c','x','y']
    },
    Area2:{
        Line1:['exp_2','exp','sqrt','radical','none'],
        Line2:['lbrace','rbrace','lbracket','rbracket','neq'],
        Line3:['lt','gt','leq','geq','approx']
    },
    Area3:{
        Line1:['cap','cup','none','none','none'],
        Line2:['pm','|','%','none','none'],
        Line3:['pi','phi','delta','none','none']
    },
    Area4:{
        Line1:['(',')','%','/','!'],
        Line2:['[',']','{','}','|'],
        Line3:['\'','\"','<','>','?']
    }
};

class MathBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyboard:1
        }
    }
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
            case 'calc':
                this.setState({keyboard : 1});
                break;
            case 'math':
                this.setState({keyboard : 2});
                break;
            case 'sign':
                this.setState({keyboard : 3});
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
                    <div className="math-board-area">
                        <div className="math-board-column">
                            <div className="math-board-row">
                                <WordButton value='calc' area={this.state.keyboard}  handleExtraClick={this.handleExtraClick} />

                                {mathSignsConfig['Area'+this.state.keyboard].Line1.map((value, index) => {
                                    return (
                                        <MathSignButton key={index} value={value} handleClick={() => {this.handleClick(value)}}  />
                                    )
                                })}
                            </div>
                            <div className="math-board-row">
                                <WordButton value='math' area={this.state.keyboard} handleExtraClick={this.handleExtraClick} />
                                {mathSignsConfig['Area'+this.state.keyboard].Line2.map((value, index) => {
                                    return (
                                        <MathSignButton key={index} value={value} handleClick={() => {this.handleClick(value)}}  />
                                    )
                                })}
                            </div>
                            <div className="math-board-row">
                                <WordButton value='sign' area={this.state.keyboard} handleExtraClick={this.handleExtraClick} />
                                {mathSignsConfig['Area'+this.state.keyboard].Line3.map((value, index) => {
                                    return (
                                        <MathSignButton key={index} value={value} handleClick={() => {this.handleClick(value)}}  />
                                    )
                                })}
                            </div>

                        </div>
                        <div className="math-board-column">
                            <div className="math-board-row">
                                <MathSignButton value={'7'} handleClick={() => {this.handleClick(mathSigns['7'])}} />
                                <MathSignButton value={'8'} handleClick={() => {this.handleClick(mathSigns['8'])}} />
                                <MathSignButton value={'9'} handleClick={() => {this.handleClick(mathSigns['9'])}} />
                            </div>
                            <div className="math-board-row">
                                <MathSignButton value={'4'} handleClick={() => {this.handleClick(mathSigns['4'])}} />
                                <MathSignButton value={'5'} handleClick={() => {this.handleClick(mathSigns['5'])}} />
                                <MathSignButton value={'6'} handleClick={() => {this.handleClick(mathSigns['6'])}} />
                            </div>
                            <div className="math-board-row">
                                <MathSignButton value={'1'} handleClick={() => {this.handleClick(mathSigns['1'])}} />
                                <MathSignButton value={'2'} handleClick={() => {this.handleClick(mathSigns['2'])}} />
                                <MathSignButton value={'3'} handleClick={() => {this.handleClick(mathSigns['3'])}} />
                            </div>
                        </div>
                    </div>
                    <div className="math-board-area">
                        <div className="math-board-column">
                            <div className="math-board-row">
                                <div className='word-button mathboard_mathboard' onTouchEnd={() => {this.props.dispatch(actions.toggleShowMathboard())}}>ABC</div>
                                <MathSignButton value='subscript' handleClick={() => {this.handleClick('subscript')}}  />
                                <ExtraButton value='Space' handleExtraClick={this.handleExtraClick}/>
                            </div>


                        </div>
                        <div className="math-board-column">
                            <div className="math-board-row">
                                <MathSignButton value={'0'} handleClick={() => {this.handleClick(mathSigns['0'])}} />
                                <ExtraButton value='Enter' handleExtraClick={this.handleExtraClick}/>
                            </div>
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