import React from 'react'
//import ReactDOM from 'react-dom'
//import ReactSVG from 'react-svg';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';
//import ToggleDisplay from 'react-toggle-display'
import MathQuill from 'mathquill';

//import actions from '../actions'
//import ConnectedMathBoardSmall from './mathboardsmall'
//import commonStyles from '../style'

//const MQ = MathQuill.getInterface(2);

class NumberButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ClassName: 'number-button'
        }
    }
    onTouchStart = () => {
        this.setState({ClassName: 'number-button-on-touch'});
    };
    onTouchEnd = () => {
        this.setState({ClassName: 'number-button'});
        this.props.handleClick(this.props.value);
    };
    render() {
        return (
            <div className='number-button-container'>
                <div className={this.state.ClassName} onTouchStart={() => {this.onTouchStart()}} onTouchEnd={() => {this.onTouchEnd()}}>{this.props.value}</div>
            </div>
        )
    }
}

const Numbers = [1, 2, 3 ,4, 5, 6, 7, 8, 9, 0];

class NumberBoardLine extends React.Component {
    handleNumberClick = (value) => {
        this.props.mq.write(value);
        this.props.mq.__controller.cursor.show();
        this.props.mq.__controller.blurred = false;
    }
    render() {
        return (
            <div className='number-board-container'>
                {Numbers.map((value, index) => {
                    return <NumberButton key={index} value={value} handleClick={this.handleNumberClick}  />
                })}
            </div>
        )
    }
}

const mapStateToPropsForNumberBoardLine = (state) => {
    return {
        mq: state.value.mq
    }
};

const ConnectedNumberBoardLine = connect(mapStateToPropsForNumberBoardLine)(NumberBoardLine);

export default ConnectedNumberBoardLine;