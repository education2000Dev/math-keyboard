import React from 'react'
//import ReactDOM from 'react-dom'
//import ReactSVG from 'react-svg';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux'
import ToggleDisplay from 'react-toggle-display'
import MathQuill from 'mathquill'
//import SVGInline from "react-svg-inline"
import { Link, DirectLink, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import actions from '../actions'
//import ConnectedNumberBoardLine from './numberboardline'
import ConnectedCommandLine from './commandline.js'
//import ConnectedMathBoardSmall from './mathboardsmall'
import ConnectedMathBoard from './mathboard'
import CleanBrackets from '../utils'
//import commonStyles from '../style'

const MQ = MathQuill.getInterface(2);

const NumberButton = require('./buttons/number');

const WordButton = require('./buttons/word');

const ExtraButton = require('./buttons/extra');

const Letters = {
    line1: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    line2: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    line3: ['z', 'x', 'c', 'v', 'b', 'n', 'm']
};

/*
class LetterButton extends React.Component {
    render() {
        return (
            <div className='number-button-container'>
                <div className='number-button'>{this.props.value}</div>
            </div>
        )
    }
}
*/




class LetterBoard extends React.Component {
    handleExtraClick = (type) => {
        if (type === 'shift') {
            this.props.dispatch(actions.toggleCapsLock());
        } else if (type === 'backspace2') {
            this.props.mq.keystroke('Backspace');
        } else if (type === 'Enter') {
            this.props.divelem.css('z-index', '1');
            this.props.dispatch(actions.hideKeyboard());
            this.props.mq.__controller.cursor.hide();
            this.props.mq.__controller.blurred = true;
        } else if (type === 'mathboard') {
            this.props.dispatch(actions.toggleShowMathboard())
        } else if (type === 'Space') {
            this.props.mq.write('\\ ');
        } else {

        }
        this.props.input.val(CleanBrackets(this.props.mq.latex()));
    };
    handleLetterClick = (value) => {
        this.props.mq.write(value);
        this.props.mq.__controller.cursor.show();
        this.props.mq.__controller.blurred = false;        
        this.props.input.val(CleanBrackets(this.props.mq.latex()));     
    };
    render() {
        return (
            <div className='number-board-container'>
                <div className='number-board-row'>
                    {Letters.line1.map((value, index) => {
                        return <NumberButton key={index} value={this.props.capslock ? value.toUpperCase() : value} handleClick={this.handleLetterClick} />
                    })}
                </div>
                <div className='number-board-row shortrow'>
                    {Letters.line2.map((value, index) => {
                        return <NumberButton key={index} value={this.props.capslock ? value.toUpperCase() : value} handleClick={this.handleLetterClick}  />
                    })}
                </div>
                <div className='number-board-row'>
                    <WordButton value='shift' capslock={this.props.capslock} handleExtraClick={this.handleExtraClick} />
                    {Letters.line3.map((value, index) => {
                        return <NumberButton key={index} value={this.props.capslock ? value.toUpperCase() : value} handleClick={this.handleLetterClick}  />
                    })}
                    <WordButton value='backspace2' handleExtraClick={this.handleExtraClick} />
                </div>
                <div className='number-board-row'>
                    <WordButton value='mathboard' handleExtraClick={this.handleExtraClick} />
                    <NumberButton value=',' handleClick={this.handleLetterClick} />
                    <ExtraButton value='Space' handleExtraClick={this.handleExtraClick}/>
                    <NumberButton value='.' handleClick={this.handleLetterClick} />
                    <ExtraButton value='Enter' handleExtraClick={this.handleExtraClick}/>
                </div>


            </div>
        )
    }
}

const mapStateToPropsForLetterBoard = (state) => {
    return {
        capslock: state.keyboard.capslock,
        showmathboard: state.keyboard.showmathboard,
        mq: state.value.mq,
        input: state.this.input,
        divelem: state.this.divelem,
    }
};

const ConnectedLetterBoard = connect(mapStateToPropsForLetterBoard)(LetterBoard);

class KeyBoard extends React.Component {
    componentDidMount () {
        let container = document.getElementById('region-main');

        function getElementViewTop(element){
                let actualTop = element.offsetTop;
                let current = element.offsetParent;
            
            　　　　while (current !== null){
            　　　　　　actualTop += current.offsetTop;
            　　　　　　current = current.offsetParent;
            　　　　}

                   let elementScrollTop = document.compatMode === "BackCompat"?document.body.scrollTop:document.documentElement.scrollTop;
            　　　　return actualTop-elementScrollTop;
            　　}

        // if (document.body.scrollHeight - this.props.divelem.offset().top - this.props.divelem.height() < 260) {
        //     container.style.height = container.offsetHeight + 260 + 'px';
            // container.scrollTo(0, document.body.scrollHeight);
            
            // container.style.height = container.offsetHeight + (214 - container.offsetHeight - this.props.divelem.position().top) + 'px';
            // scroll.scrollMore(450 - (document.body.scrollHeight - this.props.divelem.offset().top - this.props.divelem.height()), {activeClass: "card card-block", duration: 300,});
        // }
        // console.log(document.body.scrollHeight)
        // console.log(this.props.divelem.offset().top)
        // console.log(container.offsetHeight)
        // console.log(container.container.offsetTop)
        // console.log(window.innerHeight)
        // console.log(getElementViewTop(this.props.divelem[0]))
        // console.log(window.innerHeight - getElementViewTop(this.props.divelem[0]) - this.props.divelem.height())
        if (window.innerHeight - getElementViewTop(this.props.divelem[0]) - this.props.divelem.height() < 260) {
            // alert('a')
            scroll.scrollMore(300 - (window.innerHeight - getElementViewTop(this.props.divelem[0])) , {duration: 300,});
        }
    }
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
            <div className='keyboard-touch'>
                <ToggleDisplay if={!this.props.showmathboard}>
                    <ConnectedCommandLine />
                    <ConnectedLetterBoard />
                </ToggleDisplay>
                <ToggleDisplay if={this.props.showmathboard}>
                    <ConnectedCommandLine />
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
        divelem: state.this.divelem
    }
};

const ConnectedKeyboard = connect(mapStateToProps)(KeyBoard);

export default ConnectedKeyboard;