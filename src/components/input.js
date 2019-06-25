import React from 'react'
import MathQuill from 'mathquill'
import { connect } from 'react-redux'

import action from '../actions'
import '../style.css'
import CleanBrackets from '../utils'

const MQ = MathQuill.getInterface(2);

class InputField extends React.Component {
    componentDidMount() {
        this.props.divelem.keypress(function(e){

            if(e.charCode === 92){
                e.preventDefault();
                e.stopPropagation();
            }
        });
        this.mq = null;
        if (this.props.type === 'mobile' || this.props.type === 'tablet') {
            this.mq = MQ.MathField(this.refs['mathquill'], {
                autoOperatorNames: 'sin cos',
                substituteTextarea: function() {
                    return document.createElement('span');
                }
            });
        } else if(this.props.disable) {
            this.mq = MQ.MathField(this.refs['mathquill'], {
                autoOperatorNames: 'arcos',
                restrictMismatchedBrackets: true,
                substituteTextarea: function() {
                    let substitutetextarea = document.createElement('textarea');
                    substitutetextarea.setAttribute("readonly", 'readonly');
                    return substitutetextarea;
                }
            });
            this.mq.__controller.cursor.blink = null;
            this.mq.__controller.keystroke = function(){};
        } else {
            this.mq = MQ.MathField(this.refs['mathquill'], {
                autoOperatorNames: 'arcos',
                restrictMismatchedBrackets: true,
            });
        }
        if (this.props.input.val().match('^{.*}$')) {
            this.mq.cmd('{');
            this.mq.write(this.props.input.val().replace(/\s+/g, '\\ '));
            this.mq.blur();
        } else {
            this.mq.latex(this.props.input.val().replace(/\s+/g, '\\ '));
        }

        this.props.dispatch(action.setMQ(this.mq));

    }
    handleClick = (e, isDeskdop) => {
        if (e.type === 'touchstart') {
            if (e.cancelable) {
                if (!e.defaultPrevented) {
                    e.preventDefault();
                }
            }
        }
        e.stopPropagation();
        let trigger = () => {
            // 竖式或矩阵的题中，改变位键盘置后，监听resize事件修正位置
            // container出现滚动条，位置变化，不触发resize，这里dispatch一个resize事件
            // 2018-3-12 延伸页面滚动条不出现，停止触发resize事件
            // componentWillUnmount()在键盘消失之前触发，所以放在这里和close.click
            // try {
            //     window.dispatchEvent(new Event('resize'));
            // } catch (error) {
            //     var e = document.createEvent("Event");
            //     e.initEvent("resize", true, true);
            //     window.dispatchEvent(e);
            // }
            // if(document.all) {
            //     window.click();
            // }
            // else {
            //     var e = document.createEvent("MouseEvents");
            //     e.initEvent("click", true, true);　　　　　　　　　　　　　
            //     window.dispatchEvent(e);　　　
            // }
            // var event = document.createEvent('Events');
            //     event.initEvent('touchstart', true, true); 
            //     window.dispatchEvent(event); 
            try {
                window.click();
            } catch(error) {
                let e = document.createEvent("MouseEvents");
                e.initEvent("click", true, true);　　　　　　　　　　　　　
                window.dispatchEvent(e);　　
            }
        };
        if (!this.props.showkeyboard) {
            trigger();
        }
        this.mq.__controller.cursor.show();            
        this.mq.__controller.blurred = false; 
        this.props.divelem.css('z-index', '995');
        if (this.props.type === 'mobile' || this.props.type === 'tablet') {
            this.props.dispatch(action.showKeyboard());
            // this.mq.__controller.cursor.show();            
            // this.mq.__controller.blurred = false;         
        }
        if (isDeskdop && this.props.ismath) {
            this.props.dispatch(action.showKeyboard());
            // this.mq.__controller.cursor.show();
            // this.mq.__controller.blurred = false;
        }
    };
    setValue = () => {
        this.props.input.val(CleanBrackets(this.mq.latex()));
    };
    render() {
        let stylestr = this.props.width==="auto"?{}:{
            width:this.props.width,
            minWidth:'unset'
        };
        if (this.props.os === 'Android') {
            return (
                <div style={{position: 'relative', display: 'inline-block',zIndex:'850'}}>
                    <span style={stylestr} className={this.props.disable ? 'math-field-disable' : 'math-field'} ref='mathquill' onClick={(e) => {this.handleClick(e, 1)}}
                        onKeyDown={() => {this.setValue()}} onKeyUp={() => {this.setValue()}} onKeyPress={() => {this.setValue()}}
                        ></span>
                </div>
            )   
        } else {
            return (
                <div style={{position: 'relative', display: 'inline-block',zIndex:'850'}}>
                    <span style={stylestr} className={this.props.disable ? 'math-field-disable' : 'math-field'} ref='mathquill'
                         onKeyDown={() => {this.setValue()}} onKeyUp={() => {this.setValue()}} onKeyPress={() => {this.setValue()}}
                        onTouchStart={(e) => {this.handleClick(e, 1)}} onClick={(e) => {this.handleClick(e, 1)}}></span>
                </div>
            )   
        }
    }
}

const mapStateToPropsForInputField = (state) => {
    console.log(state.keyboard.qtype);
    return {
        id: state.this.id,
        type: state.page.type,
        os: state.page.os,
        disable: state.this.disable,
        input: state.this.input,
        showkeyboard: state.keyboard.showkeyboard,
        ismath: state.keyboard.ismath,
        divelem: state.this.divelem,
    }
};

const ConnectedInput = connect(mapStateToPropsForInputField)(InputField);

export default ConnectedInput;