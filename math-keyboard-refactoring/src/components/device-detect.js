import React from 'react'
import Device from 'react-device'
import { connect } from 'react-redux'

import actions from '../actions'

const DeviceInfo = (props) => {
    const onChange = (deviceInfo) => {
        console.log('Screen height', deviceInfo.screen.height)
        console.log('Screen width', deviceInfo.screen.width)
        console.log('Screen orientation', deviceInfo.screen.orientation)
        console.log('Browser name', deviceInfo.browser.name)
        console.log('Device model', deviceInfo.device.model)
        console.log('Device type', deviceInfo.device.type)
        console.log('Device vendor', deviceInfo.device.vendor)
        props.dispatch(actions.setPage(deviceInfo.screen.width, deviceInfo.screen.height, deviceInfo.device.type, deviceInfo.screen.orientation));
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