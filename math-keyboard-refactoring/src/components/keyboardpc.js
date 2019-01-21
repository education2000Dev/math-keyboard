import React from 'react'
import ReactDOM from 'react-dom'
import MathQuill from 'mathquill'
import {Icon} from 'react-fa'
import { connect } from 'react-redux'
import '../style.css'

export const MQ = MathQuill.getInterface(2);

const numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3'];
const extras = ['.', '='];
const defaults = numbers.concat(extras);

class NumberButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			type: 'number',
		}
	}
	render() {
			return <button className='button-pc number-button-pc' onClick={(e) => this.props.onClick(this.state.type, this.props.value, e)}>
				{this.props.value}
			</button>
	}
}

class BasicSignButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			defaultSigns: {
				'/': '\\div',
				'*': '\\times',
				'+': '+',
				'-': '-'
			},
			type: 'basic-sign'
		};
	}
	componentDidMount() {
		MQ.StaticMath(ReactDOM.findDOMNode(this.refs[this.props.value]));
	}
	render() {
		return <button className='button-pc default-sign-button-pc' ref={this.props.value} onClick={(e) => this.props.onClick(this.state.type, this.state.defaultSigns[this.props.value], e)}>
				{this.state.defaultSigns[this.props.value]}
		</button>
	}
}

class ExtraSignButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			extrasigns: {
				'\\cdot': '\\cdot',
				'\\frac{a}{b}': '\\frac',
				'\\sqrt{x}': '\\sqrt',
				'\\sqrt[x]{y}': '\\sqrt[{}]{}',
				'x^2': 'x^2',
				'(x)^{(y)}': '(x)^{(y)}',
				'<': '<',
				'>': '>',
				'(': '(',
				')': ')',
				'{': '{',
				'}': '}',
			},
			type: 'extra-sign'
		};
	}
	componentDidMount() {
		if (this.props.value === '{' || this.props.value === '}') {

		} else {
			MQ.StaticMath(ReactDOM.findDOMNode(this.refs[this.props.value]));
		}
	}
	render() {
		return <button className='button-pc extra-sign-button-pc' ref={this.props.value} onClick={(e) => this.props.onClick(this.state.type, this.state.extrasigns[this.props.value], e)}>
				{this.props.value}
		</button>
	}
}

class DirectionButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			directions: {
				'Left': <Icon name="arrow-left" />,
				'Up': <Icon name="arrow-up" />,
				'Right': <Icon name="arrow-right" />,
				'Down': <Icon name="arrow-down" />,
				'Backspace': <Icon name="long-arrow-left" />,
				'Clear': <Icon name="times-circle" />,
				'Enter': '确认',
			},
			type: 'direction'
		};
	}
	render() {
		return <button className='button-pc direction-button-pc' onClick={(e) => this.props.onClick(this.state.type, this.props.value, e)}>
				{this.state.directions[this.props.value]}
		</button>
	}
}

class NumberBoard extends React.Component {
    render() {
			return <div className='keyboard-pc'>
				<div className='row'>
					<span><DirectionButton value='Left' onClick={this.props.handleClick} /></span>
					<span><DirectionButton value='Up' onClick={this.props.handleClick} /></span>
					<span><DirectionButton value='Right' onClick={this.props.handleClick} /></span>
					<span><DirectionButton value='Down' onClick={this.props.handleClick} /></span>
					<span><DirectionButton value='Backspace' onClick={this.props.handleClick} /></span>
					<span><DirectionButton value='Clear' onClick={this.props.handleClick} /></span>
					<span><DirectionButton value='Enter' onClick={this.props.handleClick} /></span>
				</div>
				<div className='row'>
					<span><NumberButton value='7' onClick={this.props.handleClick} /></span>
					<span><NumberButton value='8' onClick={this.props.handleClick} /></span>
					<span><NumberButton value='9' onClick={this.props.handleClick} /></span>
					<span><BasicSignButton value='*' onClick={this.props.handleClick} /></span>
					<span><ExtraSignButton value='\cdot' onClick={this.props.handleClick} /></span>
					<span><ExtraSignButton value='x^2' onClick={this.props.handleClick} /></span>
					<span><ExtraSignButton value='(x)^{(y)}' onClick={this.props.handleClick} /></span>
				</div>              
				<div className='row'>
					<span><NumberButton value='4' onClick={this.props.handleClick} /></span>
					<span><NumberButton value='5' onClick={this.props.handleClick} /></span>
					<span><NumberButton value='6' onClick={this.props.handleClick} /></span>
					<span><BasicSignButton value='/' onClick={this.props.handleClick} /></span>
					<span><ExtraSignButton value='\frac{a}{b}' onClick={this.props.handleClick} /></span>
					<span><ExtraSignButton value='\sqrt{x}' onClick={this.props.handleClick} /></span>
					<span><ExtraSignButton value='\sqrt[x]{y}' onClick={this.props.handleClick} /></span>
				</div>              
				<div className='row'>
					<span><NumberButton value='1' onClick={this.props.handleClick} /></span>
					<span><NumberButton value='2' onClick={this.props.handleClick} /></span>
					<span><NumberButton value='3' onClick={this.props.handleClick} /></span>
					<span><BasicSignButton value='+' onClick={this.props.handleClick} /></span>
					<span><ExtraSignButton value='<' onClick={this.props.handleClick} /></span>
					<span><ExtraSignButton value='(' onClick={this.props.handleClick} /></span>
					<span><ExtraSignButton value=')' onClick={this.props.handleClick} /></span>
				</div>              
				<div className='row'>
					<span><NumberButton value='.' onClick={this.props.handleClick} /></span>
					<span><NumberButton value='0' onClick={this.props.handleClick} /></span>
					<span><NumberButton value='=' onClick={this.props.handleClick} /></span>
					<span><BasicSignButton value='-' onClick={this.props.handleClick} /></span>
					<span><ExtraSignButton value='>' onClick={this.props.handleClick} /></span>
					<span><ExtraSignButton value='{' onClick={this.props.handleClick} /></span>
					<span><ExtraSignButton value='}' onClick={this.props.handleClick} /></span>
				</div>              
			</div>
    }
}

class Test extends React.Component {
	componentDidMount() {

	}
	handleClick = (type, value, e) => {
		if (type ==='number') {
			this.props.mq.write(value);
		} else if (type === 'basic-sign') {
			this.props.mq.write(value);
		} else if (type === 'extra-sign') {
			if (value === '(x)^{(y)}') {
				this.props.mq.cmd('(');
				this.props.mq.keystroke('Right');
				this.props.mq.cmd('^');
			} else if(value === 'x^2') {
				this.props.mq.cmd('^');
				this.props.mq.write('2');
				// this.m.keystroke('Right');
			} else if(value === '\sqrt[{}]{}') {
				this.props.mq.write(value);
			} else {
				this.props.mq.cmd(value);
			}
		} else if (type === 'direction') {
			if(value === 'Clear') {
				this.props.mq.latex('');
			} else if(value === 'Enter') {

			} else {
				this.props.mq.keystroke(value);
			}
		}

		this.props.mq.focus();
		e.stopPropagation();
	}
	render() {
		return <div>
			<div>
				<NumberBoard handleClick={this.handleClick}/>
			</div>
		</div> 
	}
}

const mapStateToPropsForKeyboardPC = (state) => {
    return {
        mq: state.value.mq,
    }
}

const ConnectedKeyboardPC = connect(mapStateToPropsForKeyboardPC)(Test);
export default ConnectedKeyboardPC;