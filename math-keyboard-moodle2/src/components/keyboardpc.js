import React from 'react'
import ReactDOM from 'react-dom'
import MathQuill from 'mathquill'
import { connect } from 'react-redux'
import SVGInline from "react-svg-inline"
import { StyleSheet, css } from 'aphrodite';
import { Link, DirectLink, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import '../style.css'
import actions from '../actions'
import CleanBrackets from '../utils'

export const MQ = MathQuill.getInterface(2);

const numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3'];
const extras = ['.', '='];
// const defaults = numbers.concat(extras);

class NumberButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			type: 'number',
		}
	}
	render() {
			return <button type='button' className={this.props.className} onClick={(e) => this.props.onClick(this.state.type, this.props.value, e)}>
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
				'-': '-',
				'\\pm': '\\pm',
				'\\neq': '\\neq',
				'\\approx': '\\approx',
				'\\leq': '\\leq',
				'\\geq': '\\geq',
				'\\pi': '\\pi',
				'%': '%',
				'\\Delta': '\\Delta',
				'\\cup': '\\cup',
				'\\cap': '\\cap',
				'\\varnothing': '\\varnothing',
				'\\phi': '\\phi',
			},
			type: 'basic-sign'
		};
	}
	componentDidMount() {
		MQ.StaticMath(ReactDOM.findDOMNode(this.refs[this.props.value]));
	}
	render() {
		return <button type='button' className={this.props.className} ref={this.props.value} onClick={(e) => this.props.onClick(this.state.type, this.state.defaultSigns[this.props.value], e)}>
				{this.state.defaultSigns[this.props.value]}
		</button>
	}
}

class ExtraSignButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			extrasigns: {
				'*/·': '\\cdot',
				'\\frac{a}{b}': '\\frac',
				'\\sqrt{x}': '\\sqrt',
				'\\sqrt[x]{y}': '\\sqrt[{}]{}',
				'x^2': 'x^2',
				'x^{y}': 'x^{y}',
				'x_b': 'x_b',
				'x_b^a': 'x_b^a',
				'<': '<',
				'>': '>',
				'(': '(',
				')': ')',
				'[': '[',
				']': ']',
				'{': '{',
				'}': '}',
				'|': ' | ',
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
		return <button type='button' className={this.props.className} ref={this.props.value} onClick={(e) => this.props.onClick(this.state.type, this.state.extrasigns[this.props.value], e)}>
			{this.props.value}
		</button>		
	}
}

class DirectionButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			directions: {
				'Left': 'Left',
				'Up':'Up',
				'Right': 'Right',
				'Down': 'Down',
				'Backspace': 'Backspace',
				'Clear': 'Clear',
				'Enter': 'Close',
			},
			type: 'direction'
		};
	}
	render() {
		return <button type='button' className={this.props.className} onClick={(e) => this.props.onClick(this.state.type, this.props.value, e)}>
				{this.state.directions[this.props.value]}
		</button>
	}
}

class NumberBoard extends React.Component {
    render() {
			return <div className='keyboard-pc' onClick={(e) => {e.stopPropagation()}}>
				<div className='math-keyboard-row'>
					<ExtraSignButton className='frac keyboard-pc-item' value='\frac{a}{b}' onClick={this.props.handleClick} />
					<NumberButton className='keyboard-pc-item' value='.' onClick={this.props.handleClick} />
					<ExtraSignButton className='keyboard-pc-item' value='(' onClick={this.props.handleClick} />
					<ExtraSignButton className='keyboard-pc-item' value=')' onClick={this.props.handleClick} />
					<BasicSignButton className='keyboard-pc-item' value='+' onClick={this.props.handleClick} />
					<BasicSignButton className='keyboard-pc-item' value='-' onClick={this.props.handleClick} />
					<BasicSignButton className='keyboard-pc-item' value='*' onClick={this.props.handleClick} />
					<BasicSignButton className='keyboard-pc-item' value='/' onClick={this.props.handleClick} />
				</div>              
				<div className='math-keyboard-row'>
					<ExtraSignButton className='keyboard-pc-item' value='x^2' onClick={this.props.handleClick} />
					<ExtraSignButton className='keyboard-pc-item' value='x^{y}' onClick={this.props.handleClick} />
					<ExtraSignButton className='keyboard-pc-item' value='[' onClick={this.props.handleClick} />
					<ExtraSignButton className='keyboard-pc-item' value=']' onClick={this.props.handleClick} />
					<BasicSignButton className='keyboard-pc-item' value='\pm' onClick={this.props.handleClick} />
					<BasicSignButton className='keyboard-pc-item' value='\neq' onClick={this.props.handleClick} />
					<BasicSignButton className='keyboard-pc-item' value='\approx' onClick={this.props.handleClick} />
					<NumberButton className='keyboard-pc-item' value='=' onClick={this.props.handleClick} />
				</div>              
				<div className='math-keyboard-row'>
					<ExtraSignButton className='keyboard-pc-item' value='\sqrt{x}' onClick={this.props.handleClick} />
					<ExtraSignButton className='keyboard-pc-item' value='\sqrt[x]{y}' onClick={this.props.handleClick} />
					<ExtraSignButton className='keyboard-pc-item' value='{' onClick={this.props.handleClick} />
					<ExtraSignButton className='keyboard-pc-item' value='}' onClick={this.props.handleClick} />
					<BasicSignButton className='keyboard-pc-item' value='\leq' onClick={this.props.handleClick} />
					<BasicSignButton className='keyboard-pc-item' value='\geq' onClick={this.props.handleClick} />
					<ExtraSignButton className='keyboard-pc-item' value='<' onClick={this.props.handleClick} />
					<ExtraSignButton className='keyboard-pc-item' value='>' onClick={this.props.handleClick} />
				</div>              
				<div className='math-keyboard-row'>
					<ExtraSignButton className='keyboard-pc-item' value='x_b' onClick={this.props.handleClick} />
					<BasicSignButton className='keyboard-pc-item' value='\pi' onClick={this.props.handleClick} />
					<BasicSignButton className='keyboard-pc-item' value='\phi' onClick={this.props.handleClick} />
					<BasicSignButton className='keyboard-pc-item' value='\Delta' onClick={this.props.handleClick} />
					<ExtraSignButton className='keyboard-pc-item' value='|' onClick={this.props.handleClick} />
					<BasicSignButton className='keyboard-pc-item' value='\cup' onClick={this.props.handleClick} />
					<BasicSignButton className='keyboard-pc-item' value='\cap' onClick={this.props.handleClick} />
					<ExtraSignButton className='keyboard-pc-item' value='*/·' onClick={this.props.handleClick} />
				</div>              
			</div>
    }
}

class Test extends React.Component {
	componentDidMount () {
		var container = document.getElementById('region-main');
		// 竖式或矩阵的题中，改变位键盘置后，监听resize事件修正位置
		// container出现滚动条，位置变化，不触发resize，这里dispatch一个resize事件
		// try {
		// 	window.dispatchEvent(new Event('resize'));
		// } catch (error) {
		// 	var e = document.createEvent("Event");
		// 	e.initEvent("resize", true, true);
		// 	window.dispatchEvent(e);
		// }

        // var insert = document.createElement('div')
        // console.log(this.props.divelem.offset().top - document.body.scrollTop)
        // console.log(document.documentElement.clientHeight - this.props.divelem.offset().top + document.body.scrollTop - this.props.divelem.height())
        // console.log(document.documentElement.clientHeight)
		// console.log(container.offsetHeight);
		// console.log(document.documentElement.clientHeight - this.props.divelem.position().top - this.props.divelem.height());
		
        // console.log(this.props.divelem.position().top)
		// console.log(document.body.offsetHeight);
		// console.log(this.props.divelem.offset().top);
		// console.log(document.body.scrollHeight - this.props.divelem.offset().top - this.props.divelem.height());
        if (container.offsetHeight - this.props.divelem.offset().top - this.props.divelem.height() < 150) {
			// container.style.height = container.offsetHeight + (150 - (container.offsetHeight - this.props.divelem.offset().top - this.props.divelem.height())) + 'px';
			// container.scrollTo(0, document.body.scrollHeight);
			
			if (document.body.offsetHeight - container.offsetTop - container.offsetHeight < 150) {
				scroll.scrollMore(150, {duration: 300});
			}
            // container.style.height = container.offsetHeight + (214 - container.offsetHeight - this.props.divelem.position().top) + 'px';
            // scroll.scrollMore(450 - (document.body.scrollHeight - this.props.divelem.offset().top - this.props.divelem.height()), {activeClass: "card card-block", duration: 300,});
		}
		//  else if (document.documentElement.clientHeight - this.props.divelem.position().top - this.props.divelem.height() < 105) {
		// 	scroll.scrollMore(150, {duration: 300});
		// }
		var container = document.getElementById('region-main');
		this.inter = setInterval(() => {
			var left = 0;

			// console.log(window.innerWidth)
			// console.log(document.body.scrollWidth)
			// console.log(document.body.offsetWidth)
			// console.log(container.offsetLeft)
			// console.log(container.offsetWidth)
			// console.log(container.scrollWidth)
			left = 448 - container.offsetWidth + this.props.divelem.position().left > 0 ? 490 - container.offsetWidth + this.props.divelem.position().left: 0;
			// console.log(left)
			this.props.stylesheet._definition.left = (-left) + 'px';
			var stylesheet = StyleSheet.create({'stylesheet': this.props.stylesheet._definition});
			ReactDOM.findDOMNode(this.refs.keyboard_pc).className = css(stylesheet.stylesheet);
		}, 300);
	}
	componentWillUnmount() {
		clearInterval(this.inter);
	}
	handleClick = (type, value, e) => {
		if (type ==='number') {
			this.props.mq.write(value);
		} else if (type === 'basic-sign') {
			this.props.mq.write(value);
		} else if (type === 'extra-sign') {
			if (value === 'x^{y}') {
				this.props.mq.write('x^{}');
				// this.props.mq.cmd('(');
				// this.props.mq.keystroke('Right');
				// this.props.mq.cmd('^');
			} else if(value === 'x^2') {
				this.props.mq.cmd('^');
				this.props.mq.write('{2}');
				this.props.mq.keystroke('Right');
			} else if(value === '\\sqrt[{}]{}') {
				this.props.mq.write('\\sqrt[{}]{}');
                this.props.mq.keystroke('Left');
			} else if(value === 'x_b') {
				this.props.mq.write('x_{}');
			} else if(value === 'x_b^a') {
				this.props.mq.write('x_{b}^{a}');
			} else {
				this.props.mq.cmd(value);
			}
		} else if (type === 'direction') {
			if(value === 'Clear') {
				this.props.mq.latex('');
			} else if(value === 'Enter') {
				this.props.divelem.css('z-index', '1');
				this.props.dispatch(actions.hideKeyboard());
				setTimeout("window.dispatchEvent(new Event('resize'));", 300);
			} else {
				this.props.mq.keystroke(value);
			}
		}

		this.props.mq.focus();
		e.stopPropagation();
		this.props.input.val(CleanBrackets(this.props.mq.latex()));
	}
	render() {
		return <div className={css(this.props.stylesheet)} ref='keyboard_pc'>
			<NumberBoard handleClick={this.handleClick}/>
		</div> 
	}
}

const mapStateToPropsForKeyboardPC = (state) => {
    return {
		mq: state.value.mq,
		input: state.this.input,
		divelem: state.this.divelem,
    }
}

const ConnectedKeyboardPC = connect(mapStateToPropsForKeyboardPC)(Test);
export default ConnectedKeyboardPC;