const actions = {

    // page
    setPage (pageWidth, pageHeight, type, orientation) {
        return {
            type: 'SetPage',
            pageHeight: pageHeight,
            pageWidth: pageWidth,
            devicetype: type,
            orientation: orientation,
        }
    },

    // keyboard
    showKeyboard () {
        return {
            type: 'ShowKeyboard'
        }
    },
    hideKeyboard () {
        return {
            type: 'HideKeyboard'
        }
    },
    toggleCapsLock () {
        return {
            type: 'ToggleCapsLock',
        }
    },
    toggleShowMathboard () {
        return {
            type: 'ToggleShowMathboard',
        }
    },
    cancelCapsLock () {
        return {
            type: 'CancelCapsLock',
        }
    },

    // value
    setMQ (mq) {
        return {
            type: 'SetMQ',
            mq: mq,
        }
    }
}

export default actions;