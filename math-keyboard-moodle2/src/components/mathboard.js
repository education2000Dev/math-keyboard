import React from 'react'
import ReactDOM from 'react-dom'
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux'
import MathQuill from 'mathquill'
//import SVGInline from "react-svg-inline"

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

    }
    getconfig = () =>{
        return mathSigns[this.props.value];
    };
    onTouchStart = () => {
        this.setState({ClassName: 'math-board-number-button math-board-number-button-on-touch'});
    };
    onTouchEnd = (e) => {
        this.setState({ClassName: 'math-board-number-button'});
        this.props.handleClick();
        e.preventDefault();
    };

    componentDidMount() {
        if('{}'.indexOf(this.getconfig(this.props.value).value)<0){
            MQ.StaticMath(ReactDOM.findDOMNode(this.refs[this.props.value]));
        }
        //if (this.getconfig(this.props.value).value === '{' || this.getconfig(this.props.value).value === '}') {
        //
        //} else {
        //    MQ.StaticMath(ReactDOM.findDOMNode(this.refs[this.props.value]));
        //}
    }
    render() {
        let a =  this.props.value;
        const SvgForName = Iconography[a.toUpperCase()];
        let content = SvgForName? <SvgForName color='#FFF' />:this.getconfig(this.props.value).value;
        if( this.props.value === 'none'){
            content = '';
        }
        return (
            <div className={this.state.ClassName + ' ' + (this.getconfig(this.props.value)['extraClassName']||'')} onTouchStart={() => {this.onTouchStart()}} onTouchEnd={(e) => {this.onTouchEnd(e)}}>
                {content}
            </div>
       )
    }
}
const mathSigns = {
    'left_paren':{value: '(', type: 'cmd', cmd: '(',extraClassName:'mb_board'},
    'right_paren':{value: ')', type: 'cmd', cmd: ')',extraClassName:'mb_board'},
    'cdot':{value: '\\cdot', type: 'basic',extraClassName:'mb_normal'},
    'frac':{value: '\\frac{a}{b}', type: 'cmd', cmd: '\\frac',extraClassName:'mb_board'},
    'lbrace':{value: '{', type: 'cmd', cmd: '{',extraClassName:'mb_sign'},
    'rbrace':{value: '}', type: 'cmd', cmd: '}',extraClassName:'mb_sign'},
    'exp_2':{value: 'x^2', type: 'multicmd',extraClassName:'mb_board'},
    'sqrt':{value: '\\sqrt', type: 'cmd', cmd: '\\sqrt',extraClassName:'mb_board'},
    'lt':{value: '<', type: 'basic',extraClassName:'mb_sign'},
    'gt':{value: '>', type: 'basic',extraClassName:'mb_sign'},
    'exp':{value: 'x^{y}', type: 'multicmd',extraClassName:'mb_board'},
    'radical':{value: '\\sqrt[{}]{}', type: 'multicmd',extraClassName:'mb_board'},
    'leq':{value: '\\leq', type: 'basic',extraClassName:'mb_sign'},
    'geq':{value: '\\geq', type: 'basic',extraClassName:'mb_sign'},
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
    'period':{value: '.', type: 'basic',extraClassName:'mb_sign'},
    'equal':{value: '=', type: 'basic',extraClassName:'mb_board'},
    'divide':{value: '\\div', type: 'basic',extraClassName:'mb_normal'},
    'subscript':{value: 'x_b', type: 'cmd', cmd: '_{}',extraClassName:'mb_board'},
    'percent':{value: '%', type: 'basic',extraClassName:'mb_sign'},
    'vert':{value: '|', type: 'basic',extraClassName:'mb_sign'},
    'a':{value: 'a', type: 'basic',extraClassName:'mb_sign mb_letter'},
    'b':{value: 'b', type: 'basic',extraClassName:'mb_sign mb_letter'},
    'c':{value: 'c', type: 'basic',extraClassName:'mb_sign mb_letter'},
    'x':{value: 'x', type: 'basic',extraClassName:'mb_sign mb_letter'},
    'y':{value: 'y', type: 'basic',extraClassName:'mb_sign mb_letter'},
    'lbracket':{value: '[', type: 'basic',extraClassName:'mb_sign'},
    'rbracket':{value: ']', type: 'basic',extraClassName:'mb_sign'},
    'neq':{value: '\\neq', type: 'basic',extraClassName:'mb_sign'},
    'approx':{value: '\\approx', type: 'basic',extraClassName:'mb_sign'},
    'cap':{value: '\\cap', type: 'basic',extraClassName:'mb_sign'},
    'cup':{value: '\\cup', type: 'basic',extraClassName:'mb_sign'},
    'plusminus':{value: '\\pm', type: 'basic',extraClassName:'mb_sign'},
    'pi':{value: '\\pi', type: 'basic',extraClassName:'mb_sign'},
    'phi':{value: '\\phi', type: 'basic',extraClassName:'mb_sign'},
    'delta':{value: '\\Delta', type: 'basic',extraClassName:'mb_sign'},
    'none':{value: 'none', type: 'none',extraClassName:'mb_none'},

};

const mathSignsConfig = {
    Area1:{
        Line1:['plus','minus','times','divide','cdot'],
        Line2:['left_paren','right_paren','subscript','frac','equal'],
        Line3:['a','b','c','x','y']
    },
    Area2:{
        Line1:['exp_2','exp','sqrt','radical','none'],
        Line2:['lbrace','rbrace','lbracket','rbracket','neq'],
        Line3:['lt','gt','leq','geq','approx']
    },
    Area3:{
        Line1:['cap','cup','none','none','none'],
        Line2:['plusminus','vert','percent','none','none'],
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
            case 'Space':
                this.props.mq.write('\\ ');
                break;
            case 'ABC':
                this.props.dispatch(actions.toggleShowMathboard())
                break;
            default:
        }
    };
    handleClick = (button) => {
        let name = button;
        button = mathSigns[button];
        button['name'] = name;
        if (button.type === 'basic') {
            if (button.name === 'cdot') {
                this.props.mq.write('\\cdot');
            } else {
                this.props.mq.write(button.value);
            }
        } else if (button.type === 'cmd') {
            if (button.value === 'x_b'){
                this.props.mq.write(button.cmd);
                this.props.mq.keystroke('Left')
            } else {
                this.props.mq.cmd(button.cmd);    
            }
        } else if (button.type === 'multicmd') {
            if (button.name === 'exp_2') {
                this.props.mq.cmd('^');
                this.props.mq.write('2');
                this.props.mq.keystroke('Right');
            } else if (button.name === 'exp') {
                // this.props.mq.cmd('(');
                // this.props.mq.keystroke('Right');
                // this.props.mq.cmd('^');
                // this.props.mq.cmd('(');
                this.props.mq.write('^{}');
                this.props.mq.keystroke('Left')
            } else if (button.name === 'radical') {
                this.props.mq.write('\\sqrt[{}]{}');
                this.props.mq.keystroke('Left');
            }
        }else if (button.type === 'none') {
            return false;
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
                        <div className="math-board-column math-board-tabs">
                            <div className="math-board-row">
                                <WordButton value='calc' area={this.state.keyboard}  handleExtraClick={this.handleExtraClick} />

                                {mathSignsConfig['Area'+this.state.keyboard].Line1.map((value,index) => {
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
                                <MathSignButton value={'7'} handleClick={() => {this.handleClick('7')}} />
                                <MathSignButton value={'8'} handleClick={() => {this.handleClick('8')}} />
                                <MathSignButton value={'9'} handleClick={() => {this.handleClick('9')}} />
                            </div>
                            <div className="math-board-row">
                                <MathSignButton value={'4'} handleClick={() => {this.handleClick('4')}} />
                                <MathSignButton value={'5'} handleClick={() => {this.handleClick('5')}} />
                                <MathSignButton value={'6'} handleClick={() => {this.handleClick('6')}} />
                            </div>
                            <div className="math-board-row">
                                <MathSignButton value={'1'} handleClick={() => {this.handleClick('1')}} />
                                <MathSignButton value={'2'} handleClick={() => {this.handleClick('2')}} />
                                <MathSignButton value={'3'} handleClick={() => {this.handleClick('3')}} />
                            </div>
                        </div>
                    </div>
                    <div className="math-board-area">
                        <div className="math-board-column">
                            <div className="math-board-row">
                                <WordButton value='ABC' handleExtraClick={this.handleExtraClick} />
                                <ExtraButton value='Space' handleExtraClick={this.handleExtraClick}/>
                                <MathSignButton value='period' handleClick={() => {this.handleClick('period')}}  />
                            </div>
                        </div>
                        <div className="math-board-column">
                            <div className="math-board-row">
                                <MathSignButton value={'0'} handleClick={() => {this.handleClick('0')}} />
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