import React from 'react'
import ReactDOM from 'react-dom'
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux'
import SVGInline from "react-svg-inline"

import actions from '../actions'


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
    onTouchEnd = (e) => {
        this.setState({ClassName: 'math-board-number-button'});
        this.props.handleClick();
        e.preventDefault();
    }
    componentDidMount() {

    }
    render() {
        return (
            <div className={this.state.ClassName} onTouchStart={() => {this.onTouchStart()}} onTouchEnd={(e) => {this.onTouchEnd(e)}}><span ref={this.props.value}>{this.props.value}</span></div>
        )
    }
}

const mathSigns = {
    line1: [
        {name: 'leftParenthesis', value: '(', type: 'cmd', cmd: '('},
        {name: 'rightParenthesis', value: ')', type: 'cmd', cmd: ')'},
        {name: 'cdot', value: '#', type: 'basic'},
        {name: 'fraction', value: '&', type: 'cmd', cmd: '\\frac'},
    ],
    line2: [
        {name: 'leftBracket', value: '{', type: 'cmd', cmd: '{'},
        {name: 'rightBracket', value: '}', type: 'cmd', cmd: '}'},
        {name: 'square', value: '@', type: 'multicmd'},
        {name: 'squareRoot', value: '$', type: 'cmd', cmd: '\\sqrt'},
    ],
    line3: [
        {name: 'lessThen', value: '<', type: 'basic'},
        {name: 'greaterThen', value: '>', type: 'basic'},
        {name: 'power', value: '_', type: 'multicmd'},
        {name: 'root', value: '|', type: 'multicmd'},
    ],
    line4: [
        {name: 'lessThenOrEqual', value: '!', type: 'basic'},
        {name: 'greaterThenOrEqual', value: '%', type: 'basic'},
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
        {name: 'times', value: '*', type: 'basic'},
    ],
    line8: [
        {name: '0', value: '0', type: 'basic'},
        {name: '.', value: '.', type: 'basic'},
        {name: '=', value: '=', type: 'basic'},
        {name: 'division', value: '/', type: 'basic'},
    ],
}

class NumBoard extends React.Component {
    insertChar = (char) => {
        var value = this.props.value_;
        var cursor_position = this.props.cursor_position;
        var new_value = '';
        var temp_l = value.substring(0, cursor_position);
        var temp_r = value.substring(cursor_position, value.length);
        new_value = temp_l + char + temp_r;
        this.props.dispatch(actions.setValue(new_value, this.props.cursor_position + 1))
        this.props.inputfield.val(new_value);
    }
    deleteChar = () => {
        var value = this.props.value_;
        var cursor_position = this.props.cursor_position;
        var new_value = '';
        var temp_l = value.substring(0, cursor_position - 1);
        var temp_r = value.substring(cursor_position, value.length);
        new_value = temp_l + temp_r;
        this.props.dispatch(actions.setValue(new_value, this.props.cursor_position - 1));
        this.props.inputfield.val(new_value);
    }
    handleClick = (value) => {
        this.insertChar(value);
    }
    handleExtraClick = (value) => {
        switch (value) {
            case 'left':
                this.props.dispatch(actions.setValue(this.props.value_, this.props.cursor_position - 1));
                break;
            case 'right':
                this.props.dispatch(actions.setValue(this.props.value_, this.props.cursor_position + 1));
                break;
            case 'backspace':
                this.deleteChar();
                break;
            case 'hide':
            case 'enter':
                this.props.dispatch(actions.hideKeyboard());
                this.props.dispatch(actions.blur());
                this.props.divelem.css('z-index', '1');
                break;
            default:
        }
    }
    render() {
        return (
            <div>
                <div className='math-board-container col-xs-4-12'>
                    {mathSigns.line1.map((value, index) => {
                        return (
                            <div key={index} className='mathboard-number-button-container col-xs-3-12'>
                                <MathSignButton value={value.value} handleClick={() => {this.handleClick(value.value)}} />
                            </div>
                        )
                    })}
                    {mathSigns.line2.map((value, index) => {
                        return (
                            <div key={index} className='mathboard-number-button-container col-xs-3-12'>
                                <MathSignButton value={value.value} handleClick={() => {this.handleClick(value.value)}}  />
                            </div>
                        )        
                    })}
                    {mathSigns.line3.map((value, index) => {
                        return (
                            <div key={index} className='mathboard-number-button-container col-xs-3-12'>
                                <MathSignButton value={value.value} handleClick={() => {this.handleClick(value.value)}}  />
                            </div>
                        )        
                    })}
                    <div className='mathboard-number-button-container col-xs-6-12'>
                        <div className='math-board-number-button-on-touch' onTouchEnd={() => {this.props.dispatch(actions.toggleShowNumBoard())}}> A B C</div>
                    </div>
                    {mathSigns.line4.map((value, index) => {
                        return (
                            <div key={index} className='mathboard-number-button-container col-xs-3-12'>
                                <MathSignButton value={value.value} handleClick={() => {this.handleClick(value.value)}}  />
                            </div>
                        )        
                    })}
                </div>
                <div className='math-board-container col-xs-4-12'>
                {mathSigns.line5.map((value, index) => {
                        return (
                            <div key={index} className='mathboard-number-button-container col-xs-3-12'>
                                <MathSignButton value={value.value} handleClick={() => {this.handleClick(value.value)}}  />
                            </div>
                        )        
                    })}
                {mathSigns.line6.map((value, index) => {
                        return (
                            <div key={index} className='mathboard-number-button-container col-xs-3-12'>
                                <MathSignButton value={value.value} handleClick={() => {this.handleClick(value.value)}}  />
                            </div>
                        )        
                    })}
                {mathSigns.line7.map((value, index) => {
                        return (
                            <div key={index} className='mathboard-number-button-container col-xs-3-12'>
                                <MathSignButton value={value.value} handleClick={() => {this.handleClick(value.value)}}  />
                            </div>
                        )        
                    })}
                {mathSigns.line8.map((value, index) => {
                        return (
                            <div key={index} className='mathboard-number-button-container col-xs-3-12'>
                                <MathSignButton value={value.value} handleClick={() => {this.handleClick(value.value)}}  />
                            </div>
                        )        
                    })}
                </div>
                <div className='math-board-container col-xs-4-12'>
                    <div className='mathboard-number-button-container col-xs-6-12'>
                        <div className='math-board-number-button' onTouchEnd={() => {this.handleExtraClick('backspace')}}>
                            <SVGInline className='mathboard-command' svg={'<svg t="1508825625440" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1796" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M997.882 187.118C980.074 169.308 957.392 160 931.75 160L336 160c-48.606 0-87.434 18.804-115.412 56.882L0 511.876l220.8 293.056 0.36 0.462 0.368 0.464c13.808 17.71 28.848 31.402 45.98 40.834C287.766 857.848 310.81 864 336 864l596 0c52.382 0 92-44.514 92-98L1024 254C1024 228.358 1015.692 204.926 997.882 187.118zM826.884 664.614c3.056 3.02 4.744 7.124 4.744 11.42 0 4.302-1.688 8.406-4.744 11.414l-43.646 43.81c-3.15 3.172-7.25 4.742-11.382 4.742-4.142 0-8.276-1.57-11.39-4.742l-152.46-152.922-152.46 152.922c-3.116 3.172-7.25 4.742-11.39 4.742-4.132 0-8.234-1.57-11.384-4.742l-43.648-43.81c-3.054-3.008-4.746-7.112-4.746-11.414 0-4.296 1.692-8.4 4.746-11.42L542.196 512l-153.476-152.594c-6.292-6.306-6.292-16.546 0-22.854l43.614-43.838c3.032-3.022 7.104-4.714 11.392-4.714 4.304 0 8.378 1.694 11.382 4.714l152.896 151.066 152.894-151.066c3.008-3.022 7.082-4.714 11.386-4.714 4.286 0 8.358 1.694 11.39 4.714l43.614 43.838c6.292 6.306 6.292 16.546 0 22.854L673.808 512 826.884 664.614z" p-id="1797"></path></svg>'} />
                        </div>
                    </div>
                    <div className='mathboard-number-button-container col-xs-6-12'>
                        <div className='math-board-number-button' onTouchEnd={() => {this.handleExtraClick('hide')}}>
                            <SVGInline className='mathboard-command' svg={'<svg t="1509352720782" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3505" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M204.8 556.8V608c0 6.4 0 6.4-6.4 6.4h-51.2c-6.4 0-6.4 0-6.4-6.4v-51.2c0-6.4 0-6.4 6.4-6.4h51.2c6.4-6.4 6.4 0 6.4 6.4z m70.4-147.2v51.2c0 6.4 0 6.4-6.4 6.4H147.2c-6.4 0-6.4 0-6.4-6.4v-51.2c0-6.4 0-6.4 6.4-6.4h121.6s6.4 0 6.4 6.4z m-70.4-147.2V320c0 6.4 0 6.4-6.4 6.4h-51.2c-6.4 0-6.4 0-6.4-6.4v-57.6c-6.4-6.4 0-6.4 6.4-6.4h51.2c6.4 0 6.4 0 6.4 6.4z m544 294.4V608c0 6.4 0 6.4-6.4 6.4H281.6c-6.4 0-6.4 0-6.4-6.4v-51.2c0-6.4 0-6.4 6.4-6.4h460.8c6.4-6.4 6.4 0 6.4 6.4zM409.6 409.6v51.2c0 6.4 0 6.4-6.4 6.4H352c-6.4 0-6.4 0-6.4-6.4v-51.2c0-6.4 0-6.4 6.4-6.4h51.2c6.4 0 6.4 0 6.4 6.4z m-70.4-147.2V320c0 6.4 0 6.4-6.4 6.4h-51.2c-6.4 0-6.4 0-6.4-6.4v-57.6c0-6.4 0-6.4 6.4-6.4h51.2c6.4 0 6.4 0 6.4 6.4zM544 409.6v51.2c0 6.4 0 6.4-6.4 6.4h-51.2c-6.4 0-6.4 0-6.4-6.4v-51.2c0-6.4 0-6.4 6.4-6.4h51.2c6.4 0 6.4 0 6.4 6.4z m-64-147.2V320c0 6.4 0 6.4-6.4 6.4H416c-6.4 0-6.4 0-6.4-6.4v-57.6c0-6.4 6.4-6.4 6.4-6.4h51.2c6.4 0 12.8 0 12.8 6.4z m204.8 147.2v51.2c0 6.4 0 6.4-6.4 6.4h-57.6c-6.4 0-6.4 0-6.4-6.4v-51.2c0-6.4 0-6.4 6.4-6.4H672c6.4 0 12.8 0 12.8 6.4z m204.8 147.2V608c0 6.4 0 6.4-6.4 6.4H832c-6.4 0-6.4 0-6.4-6.4v-51.2c0-6.4 0-6.4 6.4-6.4h51.2c0-6.4 6.4 0 6.4 6.4zM614.4 262.4V320c0 6.4 0 6.4-6.4 6.4h-51.2c-6.4 0-6.4 0-6.4-6.4v-57.6c-6.4-6.4 0-6.4 6.4-6.4H608c6.4 0 6.4 0 6.4 6.4z m134.4 0V320c0 6.4 0 6.4-6.4 6.4h-51.2c-6.4 0-6.4 0-6.4-6.4v-57.6c0-6.4 0-6.4 6.4-6.4h51.2c6.4 0 6.4 0 6.4 6.4z m140.8 0v198.4c0 6.4 0 6.4-6.4 6.4H761.6c-6.4 0-6.4 0-6.4-6.4v-51.2c0-6.4 0-6.4 6.4-6.4h57.6V262.4c0-6.4 0-6.4 6.4-6.4h51.2c6.4 0 12.8 0 12.8 6.4z m64 428.8V185.6H70.4v505.6h883.2z m70.4-505.6v505.6c0 19.2-6.4 38.4-19.2 51.2s-32 19.2-44.8 19.2H70.4c-19.2 0-32-6.4-44.8-19.2C6.4 729.6 0 710.4 0 691.2V185.6c0-19.2 6.4-38.4 19.2-51.2s32-19.2 44.8-19.2h889.6c19.2 0 32 6.4 44.8 19.2 19.2 12.8 25.6 25.6 25.6 51.2zM409.6 800l96 115.2 96-115.2h-192z" p-id="3506"></path></svg>'} />
                        </div>
                    </div>
                    <div className='mathboard-number-button-container col-xs-6-12'>
                        <div className='math-board-number-button' onTouchEnd={() => {this.handleExtraClick('left')}}>
                            <SVGInline className='mathboard-command' svg={'<svg t="1509352711407" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3249" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M63.312466 510.004553l428.924933 305.264519L492.237399 611.758028l466.521203 0L958.758602 408.246985 492.236376 408.246985 492.236376 204.736964 63.312466 510.004553z" p-id="3250"></path></svg>'} />
                        </div>
                    </div>
                    <div className='mathboard-number-button-container col-xs-6-12'>
                        <div className='math-board-number-button' onTouchEnd={() => {this.handleExtraClick('right')}}>
                            <SVGInline className='mathboard-command' svg={'<svg t="1509352707049" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3121" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M958.759625 510.002506 529.835715 204.736964l0 203.51002L63.312466 408.246985l0 203.51002 466.522226 0 0 203.51002L958.759625 510.002506z" p-id="3122"></path></svg>'} />
                        </div>
                    </div>
                    
                    <div className='mathboard-number-button-container col-xs-12-12'>
                        <div className='math-board-number-button' onTouchEnd={() => {this.handleExtraClick('enter')}}>Enter</div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToPropsForNumBoard = (state) => {
    return {
        value_: state.input.value,
        cursor_position: state.input.cursor_position,
        inputfield: state.page.inputfield,
        divelem: state.page.divelem,
    }
}

const ConnectedNumBoard = connect(mapStateToPropsForNumBoard)(NumBoard);

export default ConnectedNumBoard;