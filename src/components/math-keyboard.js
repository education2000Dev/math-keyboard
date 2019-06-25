import React from 'react'
import ToggleDisplay from 'react-toggle-display'
import { connect } from 'react-redux'

import KeyboardContainer from './keyboardContainer'
import InputField from './input'
import actions from '../actions'
import ConnectedDeviceInfo from './device-detect'

class MathKeyboard extends React.Component {
    componentDidMount () {
        let input = this.props.originalInput;
        let id = input.prop('id');
        let disable = false;
        if (input.attr('readonly') === 'readonly') {
            disable = true;
        }
        let divelem = this.props.divelem;
        if (!this.props.ismath) this.props.dispatch(actions.notMath());
        this.props.dispatch(actions.setInput(id, disable, input));
        this.props.dispatch(actions.setDivElem(divelem));
    }
    render () {
        return (
            <div className='math-keyboard'>
                <ConnectedDeviceInfo />

                <ToggleDisplay if={!this.props.mobile || this.props.type === 'tablet' || this.props.type === 'mobile'}>

                    <ToggleDisplay if={this.props.renderInput} >
                        <InputField width={this.props.width}/>
                    </ToggleDisplay>
                    <KeyboardContainer originalInput = {this.props.originalInput} ismath={this.props.ismath} mobile={this.props.mobile}/>

                </ToggleDisplay>

            </div>
        )
    }
}

const mapStateToPropsForMathKeyboard = (state) => {
    return {
        renderInput: state.this.renderInput,
        type: state.page.type,
    }
};

const ConnectedMathKeyboard = connect(mapStateToPropsForMathKeyboard)(MathKeyboard);

export default ConnectedMathKeyboard;