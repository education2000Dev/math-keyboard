import React from 'react'
import Device from 'react-device'
import { connect } from 'react-redux'

import actions from '../actions'

const DeviceInfo = (props) => {
    const onChange = (deviceInfo) => {
        props.dispatch(actions.setPage(deviceInfo.screen.width, deviceInfo.screen.height, deviceInfo.device.type, deviceInfo.screen.orientation));
        if (deviceInfo.device.type == 'mobile' || deviceInfo.device.type == 'tablet') {
            props.inputfield.css('display', 'none');
        }
    }
   
    return <Device onChange={onChange} />
}

const mapStateToPropsForDeviceInfo = (state) => {
    return {
        inputfield: state.page.inputfield,
    }
}

const ConnectedDeviceInfo = connect(mapStateToPropsForDeviceInfo)(DeviceInfo);


export default ConnectedDeviceInfo;