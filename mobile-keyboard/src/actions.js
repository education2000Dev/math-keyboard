const actions = {
    setInputField (inputfield, divelem) {
        return {
            type: 'SetInputField',
            inputfield: inputfield,
            divelem: divelem,
        }
    },
    setPage (pageWidth, pageHeight, type, orientation) {
        return {
            type: 'SetPage',
            pageHeight: pageHeight,
            pageWidth: pageWidth,
            devicetype: type,
            orientation: orientation,
        }
    },
    setValue (value, cursor_position) {
        return {
            type: 'SetValue',
            value: value,
            cursor_position: cursor_position,
        }
    },
    hideKeyboard () {
        return {
            type: 'HideKeyboard',
        }
    },
    showKeyboard () {
        return {
            type: 'ShowKeyboard',
        }
    },
    blur () {
        return {
            type: 'Blur',
        }
    },
    focus () {
        return {
            type: 'Focus',
        }
    },
    toggleShowNumBoard () {
        return {
            type: 'ToggleShowNumBoard',
        }
    }
}

export default actions;