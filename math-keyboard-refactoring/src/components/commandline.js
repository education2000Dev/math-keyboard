import React from 'react'
import ReactDOM from 'react-dom'
import MathQuill from 'mathquill'
import ReactSVG from 'react-svg';
import { connect } from 'react-redux'
import '../style.css'
import actions from '../actions'

const MQ = MathQuill.getInterface(2);

class CommandButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ClassName: 'command-button',
        }
    }
    onTouchStart = () => {
        this.setState({ClassName: 'command-button-on-touch'});
    }
    onTouchEnd = () => {
        this.setState({ClassName: 'command-button'});
    }
    onClick = (command) => {
        this.setState({ClassName: 'command-button'});
        if (command === 'Clear') {
            this.props.mq.latex('');
        } else if (command === 'Hide') {
            this.props.dispatch(actions.hideKeyboard());
        } else {
            this.props.mq.keystroke(command);
        }
    }
    render() {
        return (
            <div className={this.state.ClassName} onClick={() => {this.onClick(this.props.value)}} onTouchStart={() => {this.onTouchStart()}} onTouchEnd={() => {this.onTouchEnd()}}>
                <ReactSVG
                    path={this.props.src} 
                    className='svg'
                />
            </div>
        )
    }
}

const mapStateToPropsForCommandButton = (state) => {
    return {
        mq: state.value.mq
    }
}

const ConnectedCommandButton = connect(mapStateToPropsForCommandButton)(CommandButton);

class CommandLine extends React.Component {
    render() {
        return (
            <div className='command-line-container'>
                <ConnectedCommandButton src='/img/arrows-left.svg' value='Left' />
                <ConnectedCommandButton src='/img/arrows-up.svg' value='Up' />
                <ConnectedCommandButton src='/img/arrows-right.svg' value='Right' />
                <ConnectedCommandButton src='/img/arrows-down.svg' value='Down' />
                <ConnectedCommandButton src='/img/backspace.svg' value='Backspace' />
                <ConnectedCommandButton src='/img/clear.svg' value='Clear' />
                <ConnectedCommandButton src='/img/keyboard.svg' value='Hide' />
            </div>
        )
    }
}

export default CommandLine;