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
            this.props.mq.keystroke(command);
        }
        this.props.input.val(CleanBrackets(this.props.mq.latex()));
    };
    render() {
        let a =  this.props.value;
        const SvgForName = Iconography[a.toUpperCase()];
        let content = SvgForName? <SvgForName color='#3b3e40' />:this.getconfig(this.props.value).value;
        if( this.props.value === 'none'){
            content = '';
        }
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
                <ConnectedCommandButton value='Left' />
                <ConnectedCommandButton value='Up' />
                <ConnectedCommandButton value='Right' />
                <ConnectedCommandButton value='Down' />
                <ConnectedCommandButton value='Backspace2' />
                <ConnectedCommandButton value='Clear' />
                <ConnectedCommandButton value='Hide' />
            </div>
        )
    }
}

export default CommandLine;

<ConnectedCommandButton src='<svg t="1509352711407" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3249" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M63.312466 510.004553l428.924933 305.264519L492.237399 611.758028l466.521203 0L958.758602 408.246985 492.236376 408.246985 492.236376 204.736964 63.312466 510.004553z" p-id="3250"></path></svg>' value='Left' />
<ConnectedCommandButton src='<svg t="1509352698434" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2993" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M511.034511 62.279439 205.769992 491.203348l203.51002 0L409.280012 957.725574l203.511044 0L612.791056 491.203348l203.51002 0L511.034511 62.279439z" p-id="2994"></path></svg>' value='Up' />
    <ConnectedCommandButton src='<svg t="1509352707049" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3121" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M958.759625 510.002506 529.835715 204.736964l0 203.51002L63.312466 408.246985l0 203.51002 466.522226 0 0 203.51002L958.759625 510.002506z" p-id="3122"></path></svg>' value='Right' />
    <ConnectedCommandButton src='<svg t="1509352715345" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3377" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M511.035534 957.726597l305.264519-428.92391L612.790032 528.802688 612.790032 62.281485 409.278989 62.281485l0 466.522226L205.768969 528.803711 511.035534 957.726597z" p-id="3378" ></path></svg>' value='Down' />
    <ConnectedCommandButton src='<svg t="1508825625440" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1796" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M997.882 187.118C980.074 169.308 957.392 160 931.75 160L336 160c-48.606 0-87.434 18.804-115.412 56.882L0 511.876l220.8 293.056 0.36 0.462 0.368 0.464c13.808 17.71 28.848 31.402 45.98 40.834C287.766 857.848 310.81 864 336 864l596 0c52.382 0 92-44.514 92-98L1024 254C1024 228.358 1015.692 204.926 997.882 187.118zM826.884 664.614c3.056 3.02 4.744 7.124 4.744 11.42 0 4.302-1.688 8.406-4.744 11.414l-43.646 43.81c-3.15 3.172-7.25 4.742-11.382 4.742-4.142 0-8.276-1.57-11.39-4.742l-152.46-152.922-152.46 152.922c-3.116 3.172-7.25 4.742-11.39 4.742-4.132 0-8.234-1.57-11.384-4.742l-43.648-43.81c-3.054-3.008-4.746-7.112-4.746-11.414 0-4.296 1.692-8.4 4.746-11.42L542.196 512l-153.476-152.594c-6.292-6.306-6.292-16.546 0-22.854l43.614-43.838c3.032-3.022 7.104-4.714 11.392-4.714 4.304 0 8.378 1.694 11.382 4.714l152.896 151.066 152.894-151.066c3.008-3.022 7.082-4.714 11.386-4.714 4.286 0 8.358 1.694 11.39 4.714l43.614 43.838c6.292 6.306 6.292 16.546 0 22.854L673.808 512 826.884 664.614z" p-id="1797"></path></svg>' value='Backspace' />
    <ConnectedCommandButton src='<svg t="1509352735979" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3756" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M866.461538 551.384615v393.846154H157.538462V551.384615h708.923076m0-78.76923H157.538462a78.769231 78.769231 0 0 0-78.769231 78.76923v393.846154a78.769231 78.769231 0 0 0 78.769231 78.769231h708.923076a78.769231 78.769231 0 0 0 78.769231-78.769231V551.384615a78.769231 78.769231 0 0 0-78.769231-78.76923z" p-id="3757"></path><path d="M512 748.307692a39.384615 39.384615 0 0 0-39.384615 39.384616v196.923077a39.384615 39.384615 0 0 0 78.76923 0V787.692308a39.384615 39.384615 0 0 0-39.384615-39.384616zM354.461538 748.307692a39.384615 39.384615 0 0 0-39.384615 39.384616v196.923077a39.384615 39.384615 0 0 0 78.769231 0V787.692308a39.384615 39.384615 0 0 0-39.384616-39.384616zM669.538462 748.307692a39.384615 39.384615 0 0 0-39.384616 39.384616v196.923077a39.384615 39.384615 0 0 0 78.769231 0V787.692308a39.384615 39.384615 0 0 0-39.384615-39.384616zM911.911385 551.384615H112.088615C50.254769 551.384615 0 498.372923 0 433.230769S50.254769 315.076923 112.088615 315.076923H393.846154a39.384615 39.384615 0 0 1 0 78.769231H112.088615C93.656615 393.846154 78.769231 411.490462 78.769231 433.230769s14.887385 39.384615 33.319384 39.384616h799.82277c18.432 0 33.319385-17.644308 33.319384-39.384616s-14.887385-39.384615-33.319384-39.384615H630.153846a39.384615 39.384615 0 0 1 0-78.769231h281.757539C973.666462 315.076923 1024 368.088615 1024 433.230769S973.666462 551.384615 911.911385 551.384615z" p-id="3758"></path><path d="M669.538462 359.424h-78.769231V118.153846A39.384615 39.384615 0 0 0 551.384615 78.769231H472.615385a39.384615 39.384615 0 0 0-39.384616 39.384615v236.307692h-78.769231v-236.307692C354.461538 53.011692 407.473231 0 472.615385 0h78.76923c65.142154 0 118.153846 53.011692 118.153847 118.153846v241.270154z" p-id="3759"></path></svg>' value='Clear' />
    <ConnectedCommandButton src='<svg t="1509352720782" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3505" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M204.8 556.8V608c0 6.4 0 6.4-6.4 6.4h-51.2c-6.4 0-6.4 0-6.4-6.4v-51.2c0-6.4 0-6.4 6.4-6.4h51.2c6.4-6.4 6.4 0 6.4 6.4z m70.4-147.2v51.2c0 6.4 0 6.4-6.4 6.4H147.2c-6.4 0-6.4 0-6.4-6.4v-51.2c0-6.4 0-6.4 6.4-6.4h121.6s6.4 0 6.4 6.4z m-70.4-147.2V320c0 6.4 0 6.4-6.4 6.4h-51.2c-6.4 0-6.4 0-6.4-6.4v-57.6c-6.4-6.4 0-6.4 6.4-6.4h51.2c6.4 0 6.4 0 6.4 6.4z m544 294.4V608c0 6.4 0 6.4-6.4 6.4H281.6c-6.4 0-6.4 0-6.4-6.4v-51.2c0-6.4 0-6.4 6.4-6.4h460.8c6.4-6.4 6.4 0 6.4 6.4zM409.6 409.6v51.2c0 6.4 0 6.4-6.4 6.4H352c-6.4 0-6.4 0-6.4-6.4v-51.2c0-6.4 0-6.4 6.4-6.4h51.2c6.4 0 6.4 0 6.4 6.4z m-70.4-147.2V320c0 6.4 0 6.4-6.4 6.4h-51.2c-6.4 0-6.4 0-6.4-6.4v-57.6c0-6.4 0-6.4 6.4-6.4h51.2c6.4 0 6.4 0 6.4 6.4zM544 409.6v51.2c0 6.4 0 6.4-6.4 6.4h-51.2c-6.4 0-6.4 0-6.4-6.4v-51.2c0-6.4 0-6.4 6.4-6.4h51.2c6.4 0 6.4 0 6.4 6.4z m-64-147.2V320c0 6.4 0 6.4-6.4 6.4H416c-6.4 0-6.4 0-6.4-6.4v-57.6c0-6.4 6.4-6.4 6.4-6.4h51.2c6.4 0 12.8 0 12.8 6.4z m204.8 147.2v51.2c0 6.4 0 6.4-6.4 6.4h-57.6c-6.4 0-6.4 0-6.4-6.4v-51.2c0-6.4 0-6.4 6.4-6.4H672c6.4 0 12.8 0 12.8 6.4z m204.8 147.2V608c0 6.4 0 6.4-6.4 6.4H832c-6.4 0-6.4 0-6.4-6.4v-51.2c0-6.4 0-6.4 6.4-6.4h51.2c0-6.4 6.4 0 6.4 6.4zM614.4 262.4V320c0 6.4 0 6.4-6.4 6.4h-51.2c-6.4 0-6.4 0-6.4-6.4v-57.6c-6.4-6.4 0-6.4 6.4-6.4H608c6.4 0 6.4 0 6.4 6.4z m134.4 0V320c0 6.4 0 6.4-6.4 6.4h-51.2c-6.4 0-6.4 0-6.4-6.4v-57.6c0-6.4 0-6.4 6.4-6.4h51.2c6.4 0 6.4 0 6.4 6.4z m140.8 0v198.4c0 6.4 0 6.4-6.4 6.4H761.6c-6.4 0-6.4 0-6.4-6.4v-51.2c0-6.4 0-6.4 6.4-6.4h57.6V262.4c0-6.4 0-6.4 6.4-6.4h51.2c6.4 0 12.8 0 12.8 6.4z m64 428.8V185.6H70.4v505.6h883.2z m70.4-505.6v505.6c0 19.2-6.4 38.4-19.2 51.2s-32 19.2-44.8 19.2H70.4c-19.2 0-32-6.4-44.8-19.2C6.4 729.6 0 710.4 0 691.2V185.6c0-19.2 6.4-38.4 19.2-51.2s32-19.2 44.8-19.2h889.6c19.2 0 32 6.4 44.8 19.2 19.2 12.8 25.6 25.6 25.6 51.2zM409.6 800l96 115.2 96-115.2h-192z" p-id="3506"></path></svg>' value='Hide' />

