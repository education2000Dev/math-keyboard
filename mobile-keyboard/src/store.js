import { combineReducers } from 'redux'


const initialPageState = {
    inputfield: null,
    divelem: null,
    type: '',
    height: 0,
    width: 0,
    orientation: '',
    showkeyboard: false,
    shownumboard: false,
    addClickEvent: function addClickEvent(func) {
        var oldonclick = window.onclick;
        if(typeof window.onclick !== 'function') {
            window.onclick = func;
        } else {
            window.onclick = function() {
                oldonclick();
                func();
            }
        }
    }
}

const pageReducer = (state=initialPageState, action) => {
    switch (action.type) {
        case 'SetInputField':
            return {
                ...state,
                inputfield: action.inputfield,
                divelem: action.divelem,
            }
        case 'SetPage':
            return {
                ...state,
                height: action.pageHeight,
                width: action.pageWidth,
                type: action.devicetype,
                orientation: action.orientation,
            }
        case 'HideKeyboard':
            return {
                ...state,
                showkeyboard: false,
            }
        case 'ShowKeyboard':
            return {
                ...state,
                showkeyboard: true,
            }
        case 'ToggleShowNumBoard':
            return {
                ...state,
                shownumboard: !state.shownumboard,
            }
        default :
            return state
    }
}

const initialInputState = {
    value: '',
    cursor_position: 0,
    focus: false,
    disable: false,
}

const inputReducer = (state=initialInputState, action) => {
    switch (action.type) {
        case 'SetInputField':
            return {
                ...state,
                disable: action.inputfield.attr('readonly') == 'readonly' ? true : false,
                value: action.inputfield.val(),
            }
        case 'InsertChar':
            return {
                ...state,
                value: '',
            }
        case 'SetValue':
            return {
                ...state,
                value: action.value,
                cursor_position: action.cursor_position < 0 ? 0 : (action.cursor_position > action.value.length ? action.value.length : action.cursor_position),
            }
        case 'Blur':
            return {
                ...state,
                focus: false,
            }
        case 'Focus':
            return {
                ...state,
                focus: true,
            }
        default :
            return state
    }
}

const reducer = combineReducers({
    page: pageReducer,
    input: inputReducer,
});

// const store = createStore(reducer);

export default reducer;