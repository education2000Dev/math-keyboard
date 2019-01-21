import React from 'react'
import ToggleDisplay from 'react-toggle-display'
import { connect } from 'react-redux'

import KeyboardContainer from './keyboardContainer'
import InputField from './input'
import actions from '../actions'

class MathKeyboard extends React.Component {
    componentDidMount () {
        var input = this.props.originalInput;
        var id = input.prop('id');
        var disable = false; 
        if (input.attr('readonly') === 'readonly') {
            disable = true;
        }
        var divelem = this.props.divelem;
        if (!this.props.ismath) this.props.dispatch(actions.notMath());
        this.props.dispatch(actions.setInput(id, disable, input));
        this.props.dispatch(actions.setDivElem(divelem));
    }
    render () {
        return (
            <div className='math-keyboard'>
                <ToggleDisplay if={this.props.renderInput}>
                    <InputField />
                </ToggleDisplay>
                <KeyboardContainer />
            </div>
        )
    }
}

const mapStateToPropsForMathKeyboard = (state) => {
    return {
        renderInput: state.this.renderInput,
    }
}

const ConnectedMathKeyboard = connect(mapStateToPropsForMathKeyboard)(MathKeyboard);

export default ConnectedMathKeyboard;