import React from 'react'
import ReactDOM from 'react-dom'
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux'
import MathQuill from 'mathquill'
//import SVGInline from "react-svg-inline"

import actions from '../actions'

//import commonStyles from '../style'
import CleanBrackets from '../utils'

const MQ = MathQuill.getInterface(2);

const ExtraButton = require('./buttons/extra');
const WordButton = require('./buttons/word');
class SignSignButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ClassName: 'math-board-number-button'
        };

    }
    getconfig = () =>{
        return signSigns[this.props.value];
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

        return (
            <div className={this.state.ClassName + ' ' + (this.getconfig(this.props.value)['extraClassName']||'')} onTouchStart={() => {this.onTouchStart()}} onTouchEnd={(e) => {this.onTouchEnd(e)}}>
                {this.getconfig().value}
            </div>
       )
    }
}
const signSigns = {
    'left_paren':{value: '(', type: 'cmd', cmd: '(',extraClassName:'mb_board'},
    'right_paren':{value: ')', type: 'cmd', cmd: ')',extraClassName:'mb_board'},
    'lbrace':{value: '{', type: 'cmd', cmd: '{',extraClassName:'mb_sign'},
    'rbrace':{value: '}', type: 'cmd', cmd: '}',extraClassName:'mb_sign'},
    'lt':{value: '<', type: 'basic',extraClassName:'mb_sign'},
    'gt':{value: '>', type: 'basic',extraClassName:'mb_sign'},
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
    'times':{value: '*', type: 'basic',extraClassName:'mb_normal'},
    '0':{value: '0', type: 'basic'},
    'period':{value: '.', type: 'basic',extraClassName:'mb_sign'},
    'equal':{value: '=', type: 'basic',extraClassName:'mb_board'},
    'divide':{value: '/', type: 'basic',extraClassName:'mb_normal'},
    'percent':{value: '%', type: 'basic',extraClassName:'mb_sign'},
    'vert':{value: '|', type: 'basic',extraClassName:'mb_sign'},
    'lbracket':{value: '[', type: 'basic',extraClassName:'mb_sign'},
    'rbracket':{value: ']', type: 'basic',extraClassName:'mb_sign'},
    'dollar':{value: '$', type: 'basic',extraClassName:'mb_sign'},
    'semicolon':{value: ';', type: 'basic',extraClassName:'mb_sign'},
    'colon':{value: ':', type: 'basic',extraClassName:'mb_sign'},
    'exclamatory':{value: '!', type: 'basic',extraClassName:'mb_sign'},
    'question':{value: '?', type: 'basic',extraClassName:'mb_sign'},
    'sq':{value: '\'', type: 'basic',extraClassName:'mb_sign'},
    'dq':{value: '\"', type: 'basic',extraClassName:'mb_sign'}

};

const signSignsConfig = {
    Area1:{
        Line1:['left_paren','right_paren','plus','minus','times','divide','equal'],
        Line2:['lbracket','rbracket','percent','vert','sq','semicolon','colon'],
        Line3:['lbrace','rbrace','lt','gt','dq','exclamatory','question']
    }
};

class SignBoard extends React.Component {
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
        button = signSigns[button];
        button['name'] = name;
        if (button.type === 'basic') {
                this.props.mq.write(button.value);
        } else if (button.type === 'cmd') {
                this.props.mq.cmd(button.cmd);    

        }
        this.props.mq.__controller.cursor.show();
        this.props.mq.__controller.blurred = false;
        this.props.input.val(CleanBrackets(this.props.mq.latex()));
    };
    render() {
        return (
            <div className='math_advboard math_advboard_noexp'>
                <div className='math-board-container'>
                    <div className="math-board-area">
                        <div className="math-board-column math-board-tabs">
                            <div className="math-board-row">
                                {signSignsConfig['Area1'].Line1.map((value,index) => {
                                    return (
                                        <SignSignButton key={index} value={value} handleClick={() => {this.handleClick(value)}}  />
                                    )
                                })}
                            </div>
                            <div className="math-board-row">
                                {signSignsConfig['Area1'].Line2.map((value, index) => {
                                    return (
                                        <SignSignButton key={index} value={value} handleClick={() => {this.handleClick(value)}}  />
                                    )
                                })}
                            </div>
                            <div className="math-board-row">
                                {signSignsConfig['Area1'].Line3.map((value, index) => {
                                    return (
                                        <SignSignButton key={index} value={value} handleClick={() => {this.handleClick(value)}}  />
                                    )
                                })}
                            </div>

                        </div>
                        <div className="math-board-column">
                            <div className="math-board-row">
                                <SignSignButton value={'7'} handleClick={() => {this.handleClick('7')}} />
                                <SignSignButton value={'8'} handleClick={() => {this.handleClick('8')}} />
                                <SignSignButton value={'9'} handleClick={() => {this.handleClick('9')}} />
                            </div>
                            <div className="math-board-row">
                                <SignSignButton value={'4'} handleClick={() => {this.handleClick('4')}} />
                                <SignSignButton value={'5'} handleClick={() => {this.handleClick('5')}} />
                                <SignSignButton value={'6'} handleClick={() => {this.handleClick('6')}} />
                            </div>
                            <div className="math-board-row">
                                <SignSignButton value={'1'} handleClick={() => {this.handleClick('1')}} />
                                <SignSignButton value={'2'} handleClick={() => {this.handleClick('2')}} />
                                <SignSignButton value={'3'} handleClick={() => {this.handleClick('3')}} />
                            </div>
                        </div>
                    </div>
                    <div className="math-board-area">
                        <div className="math-board-column">
                            <div className="math-board-row">
                                <WordButton value='ABC' handleExtraClick={this.handleExtraClick} />
                                <ExtraButton value='Space' handleExtraClick={this.handleExtraClick}/>
                                <SignSignButton value='period' handleClick={() => {this.handleClick('period')}}  />
                            </div>
                        </div>
                        <div className="math-board-column">
                            <div className="math-board-row">
                                <SignSignButton value={'0'} handleClick={() => {this.handleClick('0')}} />
                                <ExtraButton value='Enter' handleExtraClick={this.handleExtraClick}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToPropsForSignBoard = (state) => {
    return {
        mq: state.value.mq,
        input: state.this.input,
        divelem: state.this.divelem,
    }
};

const ConnectedSignBoard = connect(mapStateToPropsForSignBoard)(SignBoard);

export default ConnectedSignBoard;