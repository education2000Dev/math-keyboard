import React from 'react'
import ReactDOM from 'react-dom'
import MathQuill from 'mathquill'
import { connect } from 'react-redux'
//import SVGInline from "react-svg-inline"
import { StyleSheet, css } from 'aphrodite';
//import { Link, DirectLink, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import '../style.css'
import actions from '../actions'
import CleanBrackets from '../utils'
const Iconography = require('./iconography');

export const MQ = MathQuill.getInterface(2);

//const numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3'];
//const extras = ['.', '='];
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
				'cdot': '\\cdot',
				'frac': '\\frac',
				'sqrt': '\\sqrt',
				'radical': '\\sqrt[{}]{}',
				'exp_2': '^2',
				'exp': '^',
				'x_b': 'x_b',
				'x_b^a': 'x_b^a',
				'lt': '<',
				'gt': '>',
				'left_paren': '(',
				'right_paren': ')',
				'[': '[',
				']': ']',
				'{': '{',
				'}': '}',
				'|': '|',
                //copy from basic buttons
                'divide': '\\div',
                'times': '\\times',
                'plus': '+',
                'minus': '-',
                '\\pm': '\\pm',
                'neq': '\\neq',
                '\\approx': '\\approx',
                'leq': '\\leq',
                'geq': '\\geq',
                '\\pi': '\\pi',
                '%': '%',
                '\\Delta': '\\Delta',
                '\\cup': '\\cup',
                '\\cap': '\\cap',
                '\\varnothing': '\\varnothing',
                '\\phi': '\\phi',
                //create from nubmer buttons
                'equal':'=',
                'period':'.'
            },
			type: 'extra-sign',
            active:0
		};
        this.group = {
            'cdot': 'normal',
            'frac': 'extra',
            'sqrt': 'extra',
            'radical': 'extra',
            'exp_2': 'extra',
            'exp': 'extra',
            'x_b': 'extra',
            'x_b^a': 'extra',
            'lt': 'circle',
            'gt': 'circle',
            'left_paren':'normal',
            'right_paren': 'normal',
            '[': 'extra',
            ']': 'extra',
            '{': 'extra',
            '}': 'extra',
            '|': 'extra',
            //copy from basic buttons
            'divide': 'normal',
            'times': 'normal',
            'plus': 'normal',
            'minus': 'normal',
            '\\pm': 'extra',
            'neq': 'circle',
            '\\approx': 'circle',
            'leq': 'circle',
            'geq': 'circle',
            '\\pi': 'extra',
            '%': 'extra',
            '\\Delta': 'extra',
            '\\cup': 'extra',
            '\\cap': 'extra',
            '\\varnothing': 'extra',
            '\\phi': 'extra',
            //create from nubmer buttons
            'equal':'extra',
            'period':'extra',
        };
        this.color = {
            'normal':['#3B3E40','#fff'],
            'extra':['#fff','#3B3E40'],
            'general':['red','blue'],
            'circle':['red','blue']
        }
    }
	componentDidMount() {
		//if (this.props.value === '{' || this.props.value === '}') {

		//} else {
			//MQ.StaticMath(ReactDOM.findDOMNode(this.refs[this.props.value]));
		//}
	}
	render() {
        let a =  this.props.value;
        const SvgForName = Iconography[a.toUpperCase()];
        if(SvgForName){
            const colore = this.color[this.group[this.props.value]];
            a =  <SvgForName color={this.state.active?colore[1]:colore[0]} />
        }
        return <button
            type='button'
            className={this.props.className + ' math-keyboard-btn-' + this.group[this.props.value]}
            ref={this.props.value}
            onMouseDown={()=>this.setState({active: 1})}
            onMouseUp={()=>this.setState({active: 0})}
            onMouseLeave={()=>this.setState({active: 0})}
            onClick={(e) => this.props.onClick(this.state.type, this.state.extrasigns[this.props.value], e)}>
            {a}
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
            <div className="math-keyboard-column">
                <div className='math-keyboard-row'>
                    <ExtraSignButton className='frac keyboard-pc-item' value='frac' onClick={this.props.handleClick} />
                    <ExtraSignButton className='keyboard-pc-item' value='period' onClick={this.props.handleClick} />
                </div>
                <div className='math-keyboard-row'>
                    <ExtraSignButton className='keyboard-pc-item' value='exp_2' onClick={this.props.handleClick} />
                    <ExtraSignButton className='keyboard-pc-item' value='exp' onClick={this.props.handleClick} />
                </div>
                <div className='math-keyboard-row'>
                    <ExtraSignButton className='keyboard-pc-item' value='sqrt' onClick={this.props.handleClick} />
                    <ExtraSignButton className='keyboard-pc-item' value='radical' onClick={this.props.handleClick} />
                </div>
                <div className='math-keyboard-row'>
                    <ExtraSignButton className='keyboard-pc-item' value='x_b' onClick={this.props.handleClick} />
                    <BasicSignButton className='keyboard-pc-item' value='\pi' onClick={this.props.handleClick} />
                </div>
            </div>
            <div className="math-keyboard-column">
                <div className='math-keyboard-row'>
                    <ExtraSignButton className='keyboard-pc-item' value='plus' onClick={this.props.handleClick} />
                    <ExtraSignButton className='keyboard-pc-item' value='minus' onClick={this.props.handleClick} />
                    <ExtraSignButton className='keyboard-pc-item' value='times' onClick={this.props.handleClick} />
                    <ExtraSignButton className='keyboard-pc-item' value='divide' onClick={this.props.handleClick} />
                </div>
                <div className='math-keyboard-row'>
                    <BasicSignButton className='keyboard-pc-item' value='\pm' onClick={this.props.handleClick} />
                    <ExtraSignButton className='keyboard-pc-item' value='|' onClick={this.props.handleClick} />
                    <ExtraSignButton className='keyboard-pc-item' value='left_paren' onClick={this.props.handleClick} />
                    <ExtraSignButton className='keyboard-pc-item' value='right_paren' onClick={this.props.handleClick} />
                </div>
                <div className='math-keyboard-row'>
                    <BasicSignButton className='keyboard-pc-item' value='\cup' onClick={this.props.handleClick} />
                    <BasicSignButton className='keyboard-pc-item' value='\cap' onClick={this.props.handleClick} />
                    <ExtraSignButton className='keyboard-pc-item' value='[' onClick={this.props.handleClick} />
                    <ExtraSignButton className='keyboard-pc-item' value=']' onClick={this.props.handleClick} />
                </div>
                <div className='math-keyboard-row'>
                    <BasicSignButton className='keyboard-pc-item' value='\phi' onClick={this.props.handleClick} />
                    <BasicSignButton className='keyboard-pc-item' value='\Delta' onClick={this.props.handleClick} />
                    <ExtraSignButton className='keyboard-pc-item' value='{' onClick={this.props.handleClick} />
                    <ExtraSignButton className='keyboard-pc-item' value='}' onClick={this.props.handleClick} />
                </div>
            </div>
            <div className="math-keyboard-column">
                <div className='math-keyboard-row'>
                    <ExtraSignButton className='keyboard-pc-item' value='cdot' onClick={this.props.handleClick} />
                    <ExtraSignButton className='keyboard-pc-item' value='equal' onClick={this.props.handleClick} />
                </div>
                <div className='math-keyboard-row'>
                    <ExtraSignButton className='keyboard-pc-item' value='neq' onClick={this.props.handleClick} />
                    <BasicSignButton className='keyboard-pc-item' value='\approx' onClick={this.props.handleClick} />
                </div>
                <div className='math-keyboard-row'>
                    <ExtraSignButton className='keyboard-pc-item' value='lt' onClick={this.props.handleClick} />
                    <ExtraSignButton className='keyboard-pc-item' value='gt' onClick={this.props.handleClick} />
                </div>
                <div className='math-keyboard-row'>
                    <ExtraSignButton className='keyboard-pc-item' value='leq' onClick={this.props.handleClick} />
                    <ExtraSignButton className='keyboard-pc-item' value='geq' onClick={this.props.handleClick} />
                </div>
            </div>

        </div>
    }
}

class Test extends React.Component {
	componentDidMount () {
		let container = document.getElementById('region-main');
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
        //if (container.offsetHeight - this.props.divelem.offset().top - this.props.divelem.height() < 150) {
			// container.style.height = container.offsetHeight + (150 - (container.offsetHeight - this.props.divelem.offset().top - this.props.divelem.height())) + 'px';
			// container.scrollTo(0, document.body.scrollHeight);
			
			//if (document.body.offsetHeight - container.offsetTop - container.offsetHeight < 150) {
			//	scroll.scrollMore(150, {duration: 300});
			//}
            // container.style.height = container.offsetHeight + (214 - container.offsetHeight - this.props.divelem.position().top) + 'px';
            // scroll.scrollMore(450 - (document.body.scrollHeight - this.props.divelem.offset().top - this.props.divelem.height()), {activeClass: "card card-block", duration: 300,});
		//}
		//  else if (document.documentElement.clientHeight - this.props.divelem.position().top - this.props.divelem.height() < 105) {
		// 	scroll.scrollMore(150, {duration: 300});
		// }
		//var container = document.getElementById('region-main');
		this.inter = setInterval(() => {
			// console.log(window.innerWidth)
			// console.log(document.body.scrollWidth)
			// console.log(document.body.offsetWidth)
			// console.log(container.offsetLeft)
			// console.log(container.offsetWidth)
			// console.log(container.scrollWidth)
			let left = 448 - container.offsetWidth + this.props.divelem.position().left > 0 ? 490 - container.offsetWidth + this.props.divelem.position().left: 0;
			// console.log(left)
			this.props.stylesheet._definition.left = (-left) + 'px';
            let stylesheet = StyleSheet.create({'stylesheet': this.props.stylesheet._definition});
			ReactDOM.findDOMNode(this.refs.keyboard_pc).className = css(stylesheet.stylesheet);
		}, 300);
	}
	componentWillUnmount() {
		clearInterval(this.inter);
	}
	handleClick = (type, value, e) => {
		let _self = this;
		switch(type){
			case 'number':
                _self.props.mq.write(value);
				break;
            case 'basic-sign':
                _self.props.mq.write(value);
                break;
            case 'extra-sign':
            	switch(value){
                    case '^':
                        _self.props.mq.write('^{}');
                        // this.props.mq.cmd('(');
                        // this.props.mq.keystroke('Right');
                        // this.props.mq.cmd('^');
                        break;
                    case '^2':
                        _self.props.mq.cmd('^');
                        _self.props.mq.write('{2}');
                        //下一步
                        _self.props.mq.keystroke('Right');
                        break;
                    case '\\sqrt[{}]{}':
                        _self.props.mq.write('\\sqrt[{}]{}');
                        _self.props.mq.keystroke('Left');
                        break;
                    case 'x_b':
                        _self.props.mq.write('x_{}');
                        break;
                    case 'x_b^a':
                        _self.props.mq.write('x_{b}^{a}');
                        break;
                    default:
                        _self.props.mq.cmd(value);
                        break;
				}
                break;
            case 'direction':
                switch(value){
                    case 'Clear':
                        _self.props.mq.latex('');
                        break;
                    case 'Enter':
                        _self.props.divelem.css('z-index', '1');
                        _self.props.dispatch(actions.hideKeyboard());
                        setTimeout("window.dispatchEvent(new Event('resize'));", 300);
                        break;
                    default:
                        _self.props.mq.keystroke(value);
                        break;
                }
                break;
            default:break;
		}

        _self.props.mq.focus();
		e.stopPropagation();
        _self.props.input.val(CleanBrackets(_self.props.mq.latex()));
	};
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
};

const ConnectedKeyboardPC = connect(mapStateToPropsForKeyboardPC)(Test);
export default ConnectedKeyboardPC;