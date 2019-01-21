import React from 'react'
import ToggleDisplay from 'react-toggle-display'
import { connect } from 'react-redux'

import KeyboardContainer from './keyboardContainer'
import InputField from './input'


class MathKeyboard extends React.Component {
    render() {
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