const actions = {
    // input(this)
    disableInput () {
        return {
            type: 'DisableInput',
        }
    },
    setInput (id, disable, input) {
        return {
            type: 'SetInput',
            id: id,
            disable: disable,
            input: input,
        }
    },
    setDivElem (divelem) {
        return {
            type: 'SetDivElem',
            div: divelem,
        }
    },
    // page
    setPage (pageWidth, pageHeight, type, orientation, os) {
        return {
            type: 'SetPage',
            pageHeight: pageHeight,
            pageWidth: pageWidth,
            devicetype: type,
            orientation: orientation,
            os: os,
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

    notMath () {
        return {
            type: 'NotMath',
        }
    },
    
    // value
    setMQ (mq) {
        return {
            type: 'SetMQ',
            mq: mq,
        }
    }
};

export default actions;