import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, css } from 'aphrodite'

import actions from '../actions'

import '../style.css'


class Charachter extends React.Component {
    render() {
        if (this.props.char === ' ') {
            return <div style={{'display': 'inline-block', 'width': '8.03px'}} onClick={this.props.onClick}>{this.props.char}</div>
        } else {
            return <div style={{'display': 'inline-block'}} onClick={this.props.onClick}>{this.props.char}</div>
        }
    }
}


class Cursor extends React.Component {
    componentDidMount() {
        this.blinkInterval = setInterval(() => {
            this.refs.blink.className = this.refs.blink.className === 'input_cursor_blink' ? 'input_cursor' : 'input_cursor_blink';
        }, 500)
    }
    componentDidUpdate() {
        // console.log('updated')
        // console.log(this.refs.blink.offsetLeft)
        if(this.refs.blink.offsetLeft < 7) {
            
        }
        if(this.refs.blink.offsetLeft > 93) {
            
        }
    }
    componentWillUnmount() {
        clearInterval(this.blinkInterval);
    }
    render() {
        return <div ref='blink' className='input_cursor'></div>
    }
}

class InputField extends React.Component {
    getValueWithCursor = () => {
        var value_arr = [];
        for (let i = 0, j = 0; i < this.props.value.length; i++, j++) {
            if (i === this.props.cursor_position && !this.props.disable && this.props.focus) {
                value_arr[j] = <Cursor key='cursor' />;
                j++;
            }
            value_arr[j] = <Charachter onClick={(e) => this.charOnClick(e, i)} key={i} char={this.props.value.charAt(i)} />;
        }
        if (this.props.cursor_position >= this.props.value.length && !this.props.disable && this.props.focus) value_arr.push(<Cursor key='cursor' />);
        return <div style={{'whiteSpace': 'nowrap'}}>
            {
                value_arr.map((value, index) => {
                    return value;
                })
            }
        </div>;
    }
    insertChar = (char) => {
        var value = this.props.value;
        var cursor_position = this.props.cursor_position;
        var new_value = '';
        for(var i = 0; i < value.length; i += cursor_position) {
            var temp = value.substring(i, i + cursor_position);
            new_value += temp + char;
        }
        this.props.dispatch(actions.setValue(new_value, this.props.cursor_position + 1))
    }
    onClick = (e, i) => {
        let trigger = () => {
            try {
                window.click();
            } catch(e) {
                var e = document.createEvent("MouseEvents");
                e.initEvent("click", true, true);　　　　　　　　　　　　　
                window.dispatchEvent(e);　　
            }
        }
        if (!this.props.focus) {
            trigger();
        }
        e.stopPropagation();
        this.props.dispatch(actions.focus());
        this.props.dispatch(actions.showKeyboard());
        this.props.divelem.css('z-index', '998');
        this.props.divelem.css('-webkit-transform', 'translate(0,0,1px)');
    }
    charOnClick = (e, i) => {
        this.props.dispatch(actions.setValue(this.props.value, i + 1))
    }
    render() {
        var styles = StyleSheet.create({
            inputField: {
                display: 'inline-block',
                position: 'relative',
                height: '33px',
                minWidth: '100px',
                maxWidth: '250px',
                overflowX: 'hidden',
                overflowY: 'hidden',
                WebkitOverflowX: 'hidden',
                verticalAlign: 'middle',
                padding: '0.5rem 0.75rem',
                fontSize: '1rem',
                lineHeight: '17px',
                color: '#55595c',
                backgroundColor: this.props.disable ? '#eceeef' : '#fff',
                backgroundImage: 'none',
                WebkitBackgroundClip: 'padding-box',
                backgroundClip: 'padding-box',
                border: this.props.focus ? '1px solid rgba(0, 188, 212, 1)' :'1px solid rgba(0, 0, 0, .15)',
                borderRadius: '.25rem',
            }
        })
        return (
            <div onClick={this.onClick} className={css(styles.inputField)}>{this.getValueWithCursor()}</div>
        )
    }
}

const mapStateToPropsForInputField = (state) => {
    return {
        disable: state.input.disable,
        cursor_position: state.input.cursor_position,
        value: state.input.value,
        // id: state.this.id,
        addClickEvent: state.page.addClickEvent,
        divelem: state.page.divelem,
        focus: state.input.focus,
    }
}

const ConnectedInputField = connect(mapStateToPropsForInputField)(InputField);

export default ConnectedInputField;