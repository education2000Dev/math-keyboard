import React from 'react'
import ReactDOM from 'react-dom'
import MathQuill from 'mathquill'
import { connect } from 'react-redux'
//import SVGInline from "react-svg-inline"
import { StyleSheet, css } from 'aphrodite';
import $ from 'jquery'

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
				'subscript': 'x_b',
				'x_b^a': 'x_b^a',
				'lt': '<',
				'gt': '>',
				'left_paren': '(',
				'right_paren': ')',
				'lbracket': '[',
				'rbracket': ']',
				'lbrace': '{',
				'rbrace': '}',
				'vert': '|',
                //copy from basic buttons
                'divide': '\\div',
                'times': '\\times',
                'plus': '+',
                'minus': '-',
                'plusminus': '\\pm',
                'neq': '\\neq',
                'approx': '\\approx',
                'leq': '\\leq',
                'geq': '\\geq',
                'pi': '\\pi',
                '%': '%',
                'delta': '\\Delta',
                'cup': '\\cup',
                'cap': '\\cap',
                '\\varnothing': '\\varnothing',
                'phi': '\\phi',
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
            'subscript': 'extra',
            'x_b^a': 'extra',
            'lt': 'equals',
            'gt': 'equals',
            'left_paren':'general',
            'right_paren': 'general',
            'lbracket': 'general',
            'rbracket': 'general',
            'lbrace': 'general',
            'rbrace': 'general',
            'vert': 'general',
            //copy from basic buttons
            'divide': 'normal',
            'times': 'normal',
            'plus': 'normal',
            'minus': 'normal',
            'plusminus': 'general',
            'neq': 'equals',
            'approx': 'equals',
            'leq': 'equals',
            'geq': 'equals',
            'pi': 'symbol',
            '%': 'extra',
            'delta': 'symbol',
            'cup': 'general',
            'cap': 'general',
            '\\varnothing': 'extra',
            'phi': 'symbol',
            //create from nubmer buttons
            'equal':'extra',
            'period':'extra',
        };
        this.color = {
            'normal':['#fff','#fff'],
            'extra':['#fff','#fff'],
            'general':['#3B3E40','#3B3E40'],
            'equals':['#fff','#fff'],
            'symbol':['#fff','#fff']
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
				'Enter': 'close',
			},
			type: 'direction'
		};
	}
	render() {
        let a =  this.state.directions[this.props.value];
        const SvgForName = Iconography[a.toUpperCase()];
        if(SvgForName){
            a =  <SvgForName color='#fff' />
        }

        return <button type='button' className={this.props.className} onClick={(e) => this.props.onClick(this.state.type, this.props.value, e)}>
				{a}
		</button>
	}
}

class NumberBoard extends React.Component {
    render() {
        return <div className='keyboard-pc' onClick={(e) => {e.stopPropagation()}}>
            <div className="math-keyboard-tool">
                <DirectionButton className='keyboard-pc-direction' value='Left' onClick={this.props.handleClick} />
                <DirectionButton className='keyboard-pc-direction' value='Right' onClick={this.props.handleClick} />
                <DirectionButton className='keyboard_close keyboard-pc-direction' value='Enter' onClick={this.props.handleClick} />
            </div>
            <div className='math-keyboard-row'>
                <ExtraSignButton className='frac keyboard-pc-item' value='frac' onClick={this.props.handleClick} />
                <ExtraSignButton className='keyboard-pc-item' value='period' onClick={this.props.handleClick} />
                <ExtraSignButton className='keyboard-pc-item' value='plus' onClick={this.props.handleClick} />
                <ExtraSignButton className='keyboard-pc-item' value='minus' onClick={this.props.handleClick} />
                <ExtraSignButton className='keyboard-pc-item' value='times' onClick={this.props.handleClick} />
                <ExtraSignButton className='keyboard-pc-item' value='divide' onClick={this.props.handleClick} />
                <ExtraSignButton className='keyboard-pc-item' value='cdot' onClick={this.props.handleClick} />
                <ExtraSignButton className='keyboard-pc-item' value='equal' onClick={this.props.handleClick} />
            </div>
            <div className='math-keyboard-row'>
                <ExtraSignButton className='keyboard-pc-item' value='exp_2' onClick={this.props.handleClick} />
                <ExtraSignButton className='keyboard-pc-item' value='exp' onClick={this.props.handleClick} />
                <ExtraSignButton className='keyboard-pc-item' value='plusminus' onClick={this.props.handleClick} />
                <ExtraSignButton className='keyboard-pc-item' value='vert' onClick={this.props.handleClick} />
                <ExtraSignButton className='keyboard-pc-item' value='left_paren' onClick={this.props.handleClick} />
                <ExtraSignButton className='keyboard-pc-item' value='right_paren' onClick={this.props.handleClick} />
                <ExtraSignButton className='keyboard-pc-item' value='neq' onClick={this.props.handleClick} />
                <ExtraSignButton className='keyboard-pc-item' value='approx' onClick={this.props.handleClick} />
            </div>
            <div className='math-keyboard-row'>
                <ExtraSignButton className='keyboard-pc-item' value='sqrt' onClick={this.props.handleClick} />
                <ExtraSignButton className='keyboard-pc-item' value='radical' onClick={this.props.handleClick} />
                <ExtraSignButton className='keyboard-pc-item' value='cap' onClick={this.props.handleClick} />
                <ExtraSignButton className='keyboard-pc-item' value='cup' onClick={this.props.handleClick} />
                <ExtraSignButton className='keyboard-pc-item' value='lbracket' onClick={this.props.handleClick} />
                <ExtraSignButton className='keyboard-pc-item' value='rbracket' onClick={this.props.handleClick} />
                <ExtraSignButton className='keyboard-pc-item' value='lt' onClick={this.props.handleClick} />
                <ExtraSignButton className='keyboard-pc-item' value='gt' onClick={this.props.handleClick} />
            </div>
            <div className='math-keyboard-row'>
                <ExtraSignButton className='keyboard-pc-item' value='subscript' onClick={this.props.handleClick} />
                <ExtraSignButton className='keyboard-pc-item' value='pi' onClick={this.props.handleClick} />
                <ExtraSignButton className='keyboard-pc-item' value='phi' onClick={this.props.handleClick} />
                <ExtraSignButton className='keyboard-pc-item' value='delta' onClick={this.props.handleClick} />
                <ExtraSignButton className='keyboard-pc-item' value='lbrace' onClick={this.props.handleClick} />
                <ExtraSignButton className='keyboard-pc-item' value='rbrace' onClick={this.props.handleClick} />
                <ExtraSignButton className='keyboard-pc-item' value='leq' onClick={this.props.handleClick} />
                <ExtraSignButton className='keyboard-pc-item' value='geq' onClick={this.props.handleClick} />
            </div>
        </div>
    }
}

class Test extends React.Component {
	componentDidMount () {
		//let container = document.getElementById('region-main');
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

        //this.inter = setInterval(() => {
			// console.log(window.innerWidth)
			// console.log(document.body.scrollWidth)
			// console.log(document.body.offsetWidth)
			// console.log(container.offsetLeft)
			// console.log(container.offsetWidth)
			// console.log(container.scrollWidth)
			//let left = 400 - container.offsetWidth + this.props.divelem.position().left > 0 ? 452 - container.offsetWidth + this.props.divelem.position().left: 0;
			// console.log(left)
			//console.log(left);
			//left=200;fdas
            //this.props.stylesheet._definition.left = (-left) + 'px';
            //let stylesheet = StyleSheet.create({'stylesheet': this.props.stylesheet._definition});
			//ReactDOM.findDOMNode(this.refs.keyboard_pc).className = css(stylesheet.stylesheet);

        this.positioning();
        window.addEventListener('resize',this.positioning,false);
        window.addEventListener('keydown',this.positioning,false);
	}
	componentWillUnmount() {
		//clearInterval(this.inter);
        window.removeEventListener('resize',this.positioning,false);
        window.removeEventListener('keydown',this.positioning,false);
	}
	positioning = ()=>{
        //使用箭头函数确保this指向这个类
        let container = document.getElementById('region-main');
        //获取主要区域最右侧位置数值
        let container_right = $(container).offset().left + container.offsetWidth;
        //获取数学键盘预期最右侧位置数值
        let keyboard_right =  this.props.divelem.offset().left + 400;
        //右侧部分不足以显示数学键盘时调整键盘显示位置 否则相反
        this.props.divelem[keyboard_right>container_right?'addClass':'removeClass']('keyboard_right');
        //获取当前底部区域的高度
        let container_view_bottom = $(window).scrollTop() + $(window).height();
        //获取数学键盘预期底部所在的Y轴坐标
        let keyboard_bottom =  this.props.divelem.offset().top + $('.keyboard-pc').height()+30;
        //如果下面显示不全，滚动屏幕至勉强显示
        if( container_view_bottom<keyboard_bottom){
            $('html,body').scrollTop(keyboard_bottom - $(window).height()+30);
        }
    };

	handleClick = (type, value, e) => {
		let _self = this;
        _self.positioning();
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
                        _self.props.mq.write('x^{}');
                        // this.props.mq.cmd('(');
                        _self.props.mq.keystroke('Left');
                        // this.props.mq.cmd('^');
                        break;
                    case '^2':
                        _self.props.mq.write('x');
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