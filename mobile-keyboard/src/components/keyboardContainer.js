import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import { connect } from 'react-redux'
import ToggleDisplay from 'react-toggle-display'

import ConnectedDeviceInfo from './device-detect'
import ConnectedInputField from './input'
import ConnectedKeyboard from './keyboard'
import actions from '../actions'

import '../style.css'

class KeyboardContainer extends React.Component {
    componentDidMount() {
        window.onload=function () {  
            document.addEventListener('touchstart',function (event) {  
                if(event.touches.length>1){  
                    event.preventDefault();  
                }  
            })  
            var lastTouchEnd=0;  
            document.addEventListener('touchend',function (event) {  
                var now=(new Date()).getTime();  
                if(now-lastTouchEnd<=300){  
                    event.preventDefault();  
                }  
                lastTouchEnd=now;  
            },false)  
        }  
        this.props.addClickEvent(() => {
            this.props.dispatch(actions.hideKeyboard());
            this.props.dispatch(actions.blur());
            this.props.divelem.css('z-index', '1');
        })
        this.props.dispatch(actions.setInputField(this.props.originalInput, this.props.divelem));
    }
    render() {
        var styles = StyleSheet.create({
            keyboardContainer: {
                zIndex: 999,
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
                <ToggleDisplay if={(this.props.type === 'tablet' || this.props.type === 'mobile')}>
                    <ConnectedInputField />
                </ToggleDisplay>
                <ToggleDisplay if={(this.props.type === 'tablet' || this.props.type === 'mobile') && this.props.showkeyboard && !this.props.disable}>
                    <div className={css(styles.keyboardContainer)} onClick={(e) => {e.stopPropagation()}} onClick={(e) => {e.stopPropagation()}} onTouchStart={(e) => {e.stopPropagation()}}  onTouchMove={(e) => {e.stopPropagation();e.preventDefault()}} onTouchEnd={(e) => {e.stopPropagation();e.preventDefault()}}>
                        <ConnectedKeyboard />
                    </div>
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
        showkeyboard: state.page.showkeyboard,
        disable: state.input.disable,
        // id: state.this.id,
        addClickEvent: state.page.addClickEvent,
    }
};

const ConnectedKeyboardContainer = connect(mapStateToProps)(KeyboardContainer);

export default ConnectedKeyboardContainer;