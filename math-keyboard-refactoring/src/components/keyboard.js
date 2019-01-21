import React from 'react'
import ReactDOM from 'react-dom'
import ReactSVG from 'react-svg';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux'
import ToggleDisplay from 'react-toggle-display'
import MathQuill from 'mathquill'

import actions from '../actions'
import ConnectedNumberBoardLine from './numberboardline'
import ConnectedCommandLine from './commandline.js'
import ConnectedMathBoardSmall from './mathboardsmall'
import ConnectedMathBoard from './mathboard'
import commonStyles from '../style'

const MQ = MathQuill.getInterface(2);

class NumberButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ClassName: 'number-button'
        }
    }
    onTouchStart = () => {
        this.setState({ClassName: 'number-button-on-touch'});
    }
    onTouchEnd = () => {
        this.setState({ClassName: 'number-button'});
        this.props.handleClick(this.props.value);
    }
    render() {
        return (
            <div className='number-button-container col-xs-1-10'>     
                <div className={this.state.ClassName} onTouchStart={() => {this.onTouchStart()}} onTouchEnd={() => {this.onTouchEnd()}}>{this.props.value}</div>
            </div>
        )
    }
}

const Letters = {
    line1: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    line2: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    line3: ['z', 'x', 'c', 'v', 'b', 'n', 'm']
}

class LetterButton extends React.Component {
    render() {
        return (
            <div className='col-xs-1-10 number-button-container'>     
                <div className='number-button'>{this.props.value}</div>
            </div>
        )
    }
}

class LetterBoard extends React.Component {
    handleExtraClick = (type) => {
        if (type === 'shift') {
            this.props.dispatch(actions.toggleCapsLock());
        } else if (type === 'backspace') {
            this.props.mq.keystroke('Backspace');
        } else if (type === 'enter') {

        } else if (type === 'mathboard') {
            this.props.dispatch(actions.toggleShowMathboard())
        } else if (type === 'space') {
            this.props.mq.write('\\ ');
        } else {

        }
        
    }
    handleLetterClick = (value) => {
        this.props.mq.write(value);
        this.props.mq.__controller.cursor.show();
        this.props.mq.__controller.blurred = false;        
    }
    render() {
        return (
            <div className='number-board-container'>
                {Letters.line1.map((value, index) => {
                    return <NumberButton key={index} value={this.props.capslock ? value.toUpperCase() : value} handleClick={this.handleLetterClick} />
                })}
                <div className='col-xs-1-20 fake-button'></div>
                {Letters.line2.map((value, index) => {
                    return <NumberButton key={index} value={this.props.capslock ? value.toUpperCase() : value} handleClick={this.handleLetterClick}  />
                })}
                <div className='col-xs-15 number-button-container'>
                    <div className='word-button' onClick={() => {this.handleExtraClick('shift')}}><ReactSVG path='./img/shift.svg' className='svg' /></div>
                </div>
                {Letters.line3.map((value, index) => {
                    return <NumberButton key={index} value={this.props.capslock ? value.toUpperCase() : value} handleClick={this.handleLetterClick}  />
                })}
                <div className='col-xs-15 number-button-container'>
                    <div className='word-button' onClick={() => {this.handleExtraClick('backspace')}}><ReactSVG path='./img/backspace.svg' className='svg' /></div>
                </div>
                <div className='col-xs-2-12 number-button-container'>
                    <div className='word-button' onClick={() => {this.handleExtraClick('mathboard')}}><ReactSVG path='./img/education_math_formu.svg' className='svg-math' /></div>
                </div>
                <div className='col-xs-1-10 number-button-container'>
                    <div className='number-button' onClick={() => {this.handleLetterClick(',')}}>,</div>
                </div>
                <div className='col-xs-4-12 number-button-container'>
                    <div className='number-button' onClick={() => {this.handleExtraClick('space')}}>Space</div>
                </div>
                <div className='col-xs-1-10 number-button-container'>
                    <div className='number-button' onClick={() => {this.handleLetterClick('.')}}>.</div>
                </div>
                <div className='col-xs-1-10 number-button-container'>
                    <div className='number-button' onClick={() => {this.handleLetterClick('-')}}>-</div>
                </div>
                <div className='col-xs-2-12 number-button-container'>
                    <div className='number-button' onClick={() => {this.handleExtraClick('enter')}}>Enter</div>
                </div>

            </div>
        )
    }
}

const mapStateToPropsForLetterBoard = (state) => {
    return {
        capslock: state.keyboard.capslock,
        showmathboard: state.keyboard.showmathboard,
        mq: state.value.mq
    }
}

const ConnectedLetterBoard = connect(mapStateToPropsForLetterBoard)(LetterBoard);

class KeyBoard extends React.Component {
    render() {
        // var styles = StyleSheet.create({
        //     numberButtonContainer: {
        //         textAlign: 'center',
        //         fontSize: '20px',
        //         padding: 3,
        //         boxSizing: 'border-box'
        //     },
        //     numberButton: {
        //         padding: 3,                
        //         borderRadius: '.25rem',
        //         backgroundColor: '#ffffff',
        //         color: '#00bcd4',
        //         height: (this.props.height)*(2)/(25),
        //         lineHeight: (this.props.height)*(2)/(25) + 'px',
        //     }
        // })
        return (
            <div>
                <ToggleDisplay if={!this.props.showmathboard}>
                    <ConnectedCommandLine />
                    <ConnectedLetterBoard />
                </ToggleDisplay>
                <ToggleDisplay if={this.props.showmathboard}>
                    <ConnectedMathBoard />
                </ToggleDisplay>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        height: state.page.height,
        width: state.page.width,
        showmathboard: state.keyboard.showmathboard,
    }
}

const ConnectedKeyboard = connect(mapStateToProps)(KeyBoard);

export default ConnectedKeyboard;