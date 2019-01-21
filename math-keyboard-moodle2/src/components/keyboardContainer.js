import React from 'react'
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux'
import ToggleDisplay from 'react-toggle-display'

import $ from 'jquery'

import ConnectedDeviceInfo from './device-detect'
import ConnectedKeyboard from './keyboard'
import ConnectedKeyboardPC from './keyboardpc'
import actions from '../actions'

import '../style.css'

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
        var container = document.getElementsByClassName('card card-block')[0];
        // console.log(window.innerWidth)
        // console.log(document.body.scrollWidth)
        // console.log(document.body.offsetWidth)
        // console.log(container.offsetLeft)
        // console.log(container.offsetWidth)
        // console.log(container.scrollWidth)
        var left = 0;
        if (this.props.divelem) {
            // console.log(this.props.divelem.position().left)
            // console.log(this.props.divelem.offset().left)
            // console.log(448 - container.offsetWidth + this.props.divelem.position().left)
            left = 448 - container.offsetWidth + this.props.divelem.position().left > 0 ? 490 - container.offsetWidth + this.props.divelem.position().left: 0;
        }
        // console.log(this.props.divelem.width())
        // console.log(this.props.divelem.innerWidth)
        var styles = StyleSheet.create({
            keyboardContainer: {
                zIndex: 1000,
                touchAction: 'none',
                padding: '10px 10px 0px 10px',
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: '#eeeeee',
                height: 250,
                userSelect: 'none',
                MsUserSelect: 'none',
                MozUserSelect: 'none',
                WebkitUserSelect: 'none',
                MsZoom: 'fixed',
                WebkitTapHighlightColor: 'rgba(0,0,0,0)',
            },
            keyboardPCContainer: {
                width: '448px',
                height: '194px',
                padding: '9px',
                background: '#f5f5f5',
                border: 'solid 1px #ccc',
                boxShadow: '0 0 3px rgba(0,0,0,.125)',
                borderRadius: '4px',
                marginLeft: '3px',
                position: 'absolute',
                fontStyle: 'initial',
                left: (-left) + 'px',
            }
        })
        return (
            <div>
                <ConnectedDeviceInfo />
                <ToggleDisplay if={this.props.showkeyboard && !this.props.disable}>
                    <ToggleDisplay if={this.props.type === 'tablet' || this.props.type === 'mobile'}>
                        <div className={css(styles.keyboardContainer)} onClick={(e) => {e.stopPropagation()}} onTouchStart={(e) => {e.stopPropagation()}}  onTouchMove={(e) => {e.stopPropagation();e.preventDefault()}} onTouchEnd={(e) => {e.stopPropagation();e.preventDefault()}}>
                            <ConnectedKeyboard />
                        </div>
                    </ToggleDisplay>
                    <ToggleDisplay if={this.props.type === undefined}>
                        <ConnectedKeyboardPC className={css(styles.keyboardPCContainer)} stylesheet={styles.keyboardPCContainer} />
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
        divelem: state.this.divelem,
    }
}

const ConnectedKeyboardContainer = connect(mapStateToProps)(KeyboardContainer);

export default ConnectedKeyboardContainer;