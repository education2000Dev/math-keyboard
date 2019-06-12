import React from 'react'
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux'
import ToggleDisplay from 'react-toggle-display'

//import $ from 'jquery'

import ConnectedDeviceInfo from './device-detect'
import ConnectedKeyboard from './keyboard'
import ConnectedKeyboardPC from './keyboardpc'
import actions from '../actions'

//import '../style.css'

class KeyboardContainer extends React.Component {
    componentDidMount() {
        // window.onload=function () {  
        //     document.addEventListener('touchstart',function (event) {  
        //         if(event.touches.length>1){  
        //             event.preventDefault();  
        //         }  
        //     })  
        //     var lastTouchEnd=0;  
        //     document.addEventListener('touchend',function (event) {  
        //         var now=(new Date()).getTime();  
        //         if(now-lastTouchEnd<=300){  
        //             event.preventDefault();  
        //         }  
        //         lastTouchEnd=now;  
        //     },false)  
        // }  
        this.props.addClickEvent(() => {
            this.props.dispatch(actions.hideKeyboard());
            // try {
            //     window.dispatchEvent(new Event('resize'));
            // } catch (error) {
            //     var e = document.createEvent("Event");
            //     e.initEvent("resize", true, true);
            //     window.dispatchEvent(e);
            // }
            this.props.divelem.css('z-index', '1');
            // if (this.props.type) {
            this.props.mq.__controller.cursor.hide();
            this.props.mq.__controller.blurred = true;
            // }
        })
    }
    render() {
        //let container = document.getElementById('region-main');
        // console.log(window.innerWidth)
        // console.log(document.body.scrollWidth)
        // console.log(document.body.offsetWidth)
        // console.log(container.offsetLeft)
        // console.log(container.offsetWidth)
        // console.log(container.scrollWidth)
        //if (this.props.divelem) {
            // console.log(this.props.divelem.position().left)
            // console.log(this.props.divelem.offset().left)
            // console.log(448 - container.offsetWidth + this.props.divelem.position().left)
        //    let  left = 448 - container.offsetWidth + this.props.divelem.position().left > 0 ? 490 - container.offsetWidth + this.props.divelem.position().left: 0;
        //}
        // console.log(this.props.divelem.width())
        // console.log(this.props.divelem.innerWidth)
//hide input
        if((this.props.type === 'tablet' || this.props.type === 'mobile')&&this.props.mobile){
            this.props.originalInput.css('display','none');
        }
        return (
            <div>
                <ConnectedDeviceInfo />
                <ToggleDisplay if={this.props.showkeyboard && !this.props.disable}>
                    <ToggleDisplay if={this.props.type === 'tablet' || this.props.type === 'mobile'}>
                        <div onClick={(e) => {e.stopPropagation()}} onTouchStart={(e) => {e.stopPropagation()}}  onTouchMove={(e) => {e.stopPropagation();e.preventDefault()}} onTouchEnd={(e) => {e.stopPropagation();e.preventDefault()}}>
                            <ConnectedKeyboard ismath={this.props.ismath} />
                        </div>
                    </ToggleDisplay>
                    <ToggleDisplay if={this.props.type === undefined}>
                        <ConnectedKeyboardPC  />
                    </ToggleDisplay>

                </ToggleDisplay>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        height: state.page.height,
        width: state.page.width,
        type: state.page.type,
        showkeyboard: state.keyboard.showkeyboard,
        mq: state.value.mq,
        disable: state.this.disable,
        id: state.this.id,
        addClickEvent: state.this.addClickEvent,
        divelem: state.this.divelem
    }
};

const ConnectedKeyboardContainer = connect(mapStateToProps)(KeyboardContainer);

export default ConnectedKeyboardContainer;