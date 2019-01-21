import React from 'react'
import MathQuill from 'mathquill'
import { connect } from 'react-redux'
import ToggleDisplay from 'react-toggle-display'

import action from '../actions'
import '../style.css'

const MQ = MathQuill.getInterface(2);

class InputField extends React.Component {
    componentDidMount() {
        var mq = null;
        if (this.props.type === 'mobile' || this.props.type === 'tablet') {
            mq = MQ.MathField(this.refs['mathquill'], {
                substituteTextarea: function() {
                    return document.createElement('span');
                }
            });
        } else {
            mq = MQ.MathField(this.refs['mathquill']);
        }
        this.props.dispatch(action.setMQ(mq));
    }
    handleClick = (e, isDeskdop) => {
        e.stopPropagation();
        if (this.props.type === 'mobile' || this.props.type === 'tablet') {
            this.props.dispatch(action.showKeyboard());
        }
        if (isDeskdop) {
            this.props.dispatch(action.showKeyboard());
        }
    }
    render() {
        return (
            <div style={{position: 'relative', display: 'inline-block'}}>
                <span className='math-field' ref='mathquill' onClick={(e) => {this.handleClick(e, null)}}></span>
                <ToggleDisplay if={!this.props.type}>
                    <span onClick={(e) => {this.handleClick(e, true)}} style={{position: 'absolute', bottom: '1', height: '30px', boxSizing: 'box-border'}}><embed style={{pointerEvents: 'none'}} src="/img/math.svg" width="28" height="28" /></span>
                </ToggleDisplay>
            </div>
        )
    }
}

const mapStateToPropsForInputField = (state) => {
    return {
        id: state.this.id,
        type: state.page.type,
    }
}

const ConnectedInput = connect(mapStateToPropsForInputField)(InputField);

export default ConnectedInput;