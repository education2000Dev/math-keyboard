import React from 'react'
//import ReactDOM from 'react-dom'
import MathQuill from 'mathquill'
//import ReactSVG from 'react-svg';
import { connect } from 'react-redux'
//import SVGInline from "react-svg-inline"
//import '../style.css'
import actions from '../actions'
import CleanBrackets from '../utils'


const Iconography = require('./iconography');

const MQ = MathQuill.getInterface(2);

class CommandButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ClassName: 'command-button',
        }
    }
    onTouchStart = () => {
        this.setState({ClassName: 'command-button command-button-on-touch'});
    };
    onTouchEnd = (e, command) => {
        this.setState({ClassName: 'command-button'});
        this.handleClick(command);
        e.preventDefault();
    };
    handleClick = (command) => {
        // this.setState({ClassName: 'command-button'});
        if (command === 'Clear') {
            this.props.mq.latex('');
        } else if (command === 'Hide') {
            this.props.divelem.css('z-index', '1');
            this.props.dispatch(actions.hideKeyboard());
            this.props.mq.__controller.cursor.hide();
            this.props.mq.__controller.blurred = true;
        } else {
            command = command.substring(0,command.length-1);
            this.props.mq.keystroke(command);
        }
        this.props.input.val(CleanBrackets(this.props.mq.latex(),this.props.qtype));
    };
    render() {
        let a =  this.props.value;
        const SvgForName = Iconography[a.toUpperCase()];
        let content = SvgForName?<SvgForName />:a;
        return (
            <div className={this.state.ClassName} onTouchStart={() => {this.onTouchStart()}} onTouchEnd={(e) => {this.onTouchEnd(e, this.props.value)}}>
                {content}
            </div>
        );
    }
}

const mapStateToPropsForCommandButton = (state) => {
    return {
        mq: state.value.mq,
        input: state.this.input,
        divelem: state.this.divelem,
    }
};

const ConnectedCommandButton = connect(mapStateToPropsForCommandButton)(CommandButton);



class CommandLine extends React.Component {
    render() {
        return (
            <div className='command-line-container'>
                <ConnectedCommandButton  qtype={this.props.qtype} value='Left2' />
                <ConnectedCommandButton  qtype={this.props.qtype} value='Up2' />
                <ConnectedCommandButton  qtype={this.props.qtype} value='Right2' />
                <ConnectedCommandButton  qtype={this.props.qtype} value='Down2' />
                <ConnectedCommandButton  qtype={this.props.qtype} value='Backspace2' />
                <ConnectedCommandButton  qtype={this.props.qtype} value='Clear' />
                <ConnectedCommandButton  qtype={this.props.qtype} value='Hide' />
            </div>
        )
    }
}

export default CommandLine;


