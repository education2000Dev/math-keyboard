import React from 'react'
import Device from 'react-device'
import { connect } from 'react-redux'

import actions from '../actions'

const DeviceInfo = (props) => {
    const onChange = (deviceInfo) => {
        props.dispatch(actions.setPage(deviceInfo.screen.width, deviceInfo.screen.height, deviceInfo.device.type, deviceInfo.screen.orientation,
            deviceInfo.os.name));
    }
   
    return <Device onChange={onChange} />
}

const mapStateToPropsForDeviceInfo = (state) => {
    return {
        mq: state.value.mq,
        id: state.this.id,
    }
}

const ConnectedDeviceInfo = connect(mapStateToPropsForDeviceInfo)(DeviceInfo);


export default ConnectedDeviceInfo;