import React from 'react'
//import ReactDOM from 'react-dom'
//import ReactSVG from 'react-svg';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux'
import ToggleDisplay from 'react-toggle-display'
import MathQuill from 'mathquill'
import SVGInline from "react-svg-inline"
import { Link, DirectLink, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import actions from '../actions'
//import ConnectedNumberBoardLine from './numberboardline'
import ConnectedCommandLine from './commandline.js'
//import ConnectedMathBoardSmall from './mathboardsmall'
import ConnectedMathBoard from './mathboard'
import CleanBrackets from '../utils'
//import commonStyles from '../style'

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
    };
    onTouchEnd = (e) => {
        this.setState({ClassName: 'number-button'});
        this.props.handleClick(this.props.value);
        e.preventDefault();
    };
    render() {
        return (
            <div className={this.state.ClassName} onTouchStart={() => {this.onTouchStart()}} onTouchEnd={(e) => {this.onTouchEnd(e)}}>{this.props.value}</div>
        )
    }
}

const Letters = {
    line1: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    line2: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    line3: ['z', 'x', 'c', 'v', 'b', 'n', 'm']
};

class LetterButton extends React.Component {
    render() {
        return (
            <div className='col-xs-1-10 number-button-container'>     
                <div className='number-button'>{this.props.value}</div>
            </div>
        )
    }
}

class ExtraButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ClassName: 'number-button'
        }
    }
    onTouchStart = () => {
        this.setState({ClassName: 'number-button-on-touch'});
    };
    onTouchEnd = (e) => {
        this.setState({ClassName: 'number-button'});
        this.props.handleExtraClick(this.props.value);
        e.preventDefault();
    };
    render() {
        return <div className={this.state.ClassName} onTouchStart={() => this.onTouchStart()} onTouchEnd={(e) => this.onTouchEnd(e)}>{this.props.value}</div>
    }
}

class LetterBoard extends React.Component {
    handleExtraClick = (type) => {
        if (type === 'shift') {
            this.props.dispatch(actions.toggleCapsLock());
        } else if (type === 'backspace') {
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
                    <div className={this.props.capslock ? 'word-button-on-touch' : 'word-button'} onTouchEnd={() => {this.handleExtraClick('shift')}}>
                        <SVGInline className='svg' svg={'<svg t="1508825736163" class="icon" style="" viewBox="0 0 1137 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2713" xmlns:xlink="http://www.w3.org/1999/xlink" width="222.0703125" height="200"><defs><style type="text/css"></style></defs><path d="M607.345778 41.927111l491.235555 535.950222C1151.687111 635.733333 1130.951111 682.666667 1052.416 682.666667H853.333333v256.085333A85.219556 85.219556 0 0 1 768.170667 1024H369.607111A85.248 85.248 0 0 1 284.444444 938.752V682.666667H85.390222c-78.876444 0-99.271111-46.933333-46.222222-104.789334L530.488889 41.927111a51.370667 51.370667 0 0 1 76.885333 0z m-19.029334 121.031111a26.168889 26.168889 0 0 0-38.855111 0L142.222222 597.333333h227.555556v312.832c0 15.729778 12.8 28.501333 28.643555 28.501334h340.935111A28.728889 28.728889 0 0 0 768 910.165333V597.333333h227.555556L588.316444 162.986667z" p-id="2714"></path></svg>'} />
                    </div>
                    {Letters.line3.map((value, index) => {
                        return <NumberButton key={index} value={this.props.capslock ? value.toUpperCase() : value} handleClick={this.handleLetterClick}  />
                    })}
                    <div className='word-button' onTouchEnd={() => {this.handleExtraClick('backspace')}}>
                        <SVGInline className='svg' svg={'<svg t="1508825625440" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1796" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M997.882 187.118C980.074 169.308 957.392 160 931.75 160L336 160c-48.606 0-87.434 18.804-115.412 56.882L0 511.876l220.8 293.056 0.36 0.462 0.368 0.464c13.808 17.71 28.848 31.402 45.98 40.834C287.766 857.848 310.81 864 336 864l596 0c52.382 0 92-44.514 92-98L1024 254C1024 228.358 1015.692 204.926 997.882 187.118zM826.884 664.614c3.056 3.02 4.744 7.124 4.744 11.42 0 4.302-1.688 8.406-4.744 11.414l-43.646 43.81c-3.15 3.172-7.25 4.742-11.382 4.742-4.142 0-8.276-1.57-11.39-4.742l-152.46-152.922-152.46 152.922c-3.116 3.172-7.25 4.742-11.39 4.742-4.132 0-8.234-1.57-11.384-4.742l-43.648-43.81c-3.054-3.008-4.746-7.112-4.746-11.414 0-4.296 1.692-8.4 4.746-11.42L542.196 512l-153.476-152.594c-6.292-6.306-6.292-16.546 0-22.854l43.614-43.838c3.032-3.022 7.104-4.714 11.392-4.714 4.304 0 8.378 1.694 11.382 4.714l152.896 151.066 152.894-151.066c3.008-3.022 7.082-4.714 11.386-4.714 4.286 0 8.358 1.694 11.39 4.714l43.614 43.838c6.292 6.306 6.292 16.546 0 22.854L673.808 512 826.884 664.614z" p-id="1797"></path></svg>'} />
                    </div>
                </div>
                <div className='number-board-row'>
                    <div className='word-button' onTouchEnd={() => {this.handleExtraClick('mathboard')}}>
                        <SVGInline className='svg' svg={'<svg t="1508830347802" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5313" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M159.999819 470.143967L74.336308 256H0v-63.999639h117.664053l42.335766 105.855672 106.336128-265.856214H1024v64.000362H309.663692zM0 543.999819h1024v64.000362H0zM557.248125 864.000181H480.000181v-64.000362h50.752056l13.247582-13.247582v-37.503751l-13.247582-13.248305h-37.504474l-22.623339 22.623339-45.248125-45.247402 41.375576-41.375576h90.49625l50.752056 50.751333v90.49625z" p-id="5314" ></path><path d="M557.248125 992.000181H466.751875l-41.375576-41.376299 45.248125-45.247402 22.623339 22.624062h37.504474l13.247582-13.248305v-37.503751l-22.623339-22.624785 45.248124-45.247402 41.375577 41.375576v90.49625zM512 480.000181h-64.000361V269.248305l-31.99982-31.999819-31.999819 31.999819v210.751876h-63.999639V242.752417L415.999819 146.752237 512 242.752417z" p-id="5315" ></path><path d="M352.000181 320.000361h128v63.999639H352.000181zM543.999819 287.999819h128v64.000362H543.999819z" p-id="5316" ></path><path d="M576.000361 256h63.999639v128h-63.999639zM845.247944 480.000181H703.999639V159.999819h141.248305l50.752056 50.752056v90.49625l-18.752237 18.752236 18.752237 18.751514v90.49625l-50.752056 50.752056z m-77.247944-63.999639h50.752056l13.248305-13.248305v-37.503751l-45.248124-45.248125 45.248124-45.248124v-37.503751l-13.248305-13.248305h-50.752056v192.000361z" p-id="5317"></path><path d="M736.000181 287.999819h96.00018v64.000362h-96.00018z" p-id="5318"></path></svg>'} />
                    </div>
                    <NumberButton value=',' handleClick={this.handleLetterClick} />
                    <ExtraButton value='Space' handleExtraClick={this.handleExtraClick}/>
                    <NumberButton value='.' handleClick={this.handleLetterClick} />
                    <NumberButton value='-' handleClick={this.handleLetterClick} />
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
        divelem: state.this.divelem,
    }
};

const ConnectedKeyboard = connect(mapStateToProps)(KeyBoard);

export default ConnectedKeyboard;