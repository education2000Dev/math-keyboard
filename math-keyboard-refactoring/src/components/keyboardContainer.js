import React from 'react'
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux'
import ToggleDisplay from 'react-toggle-display'

import ConnectedDeviceInfo from './device-detect'
import ConnectedKeyboard from './keyboard'
import ConnectedKeyboardPC from './keyboardpc'
import action from '../actions'

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
        window.onclick = () => {
            this.props.dispatch(action.hideKeyboard());
            if (this.props.type) {
                this.props.mq.__controller.cursor.hide();
                this.props.mq.__controller.blurred = true;
            }
        }
    }
    render() {
        var styles = StyleSheet.create({
            keyboardContainer: {
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
            }
        })
        return (
            <div>
                <ConnectedDeviceInfo />
                <ToggleDisplay if={this.props.showkeyboard}>
                    <ToggleDisplay if={this.props.type === 'tablet' || this.props.type === 'mobile'}>
                        <div className={css(styles.keyboardContainer)} onClick={(e) => {e.stopPropagation()}}>
                            <ConnectedKeyboard />
                        </div>
                    </ToggleDisplay>
                    <ToggleDisplay if={this.props.type === undefined}>
                        <ConnectedKeyboardPC />
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
    }
}

const ConnectedKeyboardContainer = connect(mapStateToProps)(KeyboardContainer);

export default ConnectedKeyboardContainer;