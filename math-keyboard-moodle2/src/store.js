import { createStore, combineReducers } from 'redux'

const initialThisState = {
    id: 'defaultid',
    renderInput: false,
    disable: false,
    input: null,
    divelem: null,
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

const thisReducer = (state=initialThisState, action) => {
    switch (action.type) {
        case 'SetPage':
            return {
                ...state,
                renderInput: true,
            }
        case 'DisableInput':
            return {
                ...state,
                disable: true
            }
        case 'SetInput':
            return {
                ...state,
                disable: action.disable,
                id: action.id,
                input: action.input,
            }
        case 'SetDivElem':
            return {
                ...state,
                divelem: action.div,
            }
        default :
            return state
    }
}

const initialPageState = {
    type: '',
    height: 0,
    width: 0,
    orientation: '',
    os: '',
    container: '.card .card-block'
};

const pageReducer = (state = initialPageState, action) => {
    switch (action.type) {
        case 'SetPage' :
            return {
                ...state,
                height: action.pageHeight,
                width: action.pageWidth,
                type: action.devicetype,
                orientation: action.orientation,
                os: action.os,
            };
        default :
            return state;
    }
}

const initialKeyboardState = {
    showkeyboard: false,
    shownumberboardline: true,
    capslock: false,
    showmathboard: false,
    ismath: true,
};

const keyboardReducer = (state = initialKeyboardState, action) => {
    switch (action.type) {
        case 'ShowKeyboard':
            return {
                ...state,
                showkeyboard: true,
            }
        case 'HideKeyboard':
            return {
                ...state,
                showkeyboard: false,
            }
        case 'ToggleKeyboard':
            return {
                ...state,
                showkeyboard: !state.showkeyboard,
            }
        case 'CapsLock':
            return {
                ...state,
                capslock: true,
            };
        case 'ToggleCapsLock':
            return {
                ...state,
                capslock: !state.capslock,
            };
        case 'ToggleShowMathboard':
            return {
                ...state,
                showmathboard: !state.showmathboard,
                shownumberboardline: !state.shownumberboardline,
            };
        case 'NotMath':
            return {
                ...state,
                ismath: false,
            };
        default:
            return state;
    }
}

const initialValueState = {
    inputvalue: '',
    mathquillvalue: '',
    mq: null,
};

const valueReducer = (state=initialValueState, action) => {
    switch (action.type) {
        case 'SetMQ':
            return {
                ...state,
                mq: action.mq
            };
        default:
            return state;
    }
}

const reducer = combineReducers({
    this: thisReducer,
    page: pageReducer,
    keyboard: keyboardReducer,
    value: valueReducer,
});

// const store = createStore(reducer);

export default reducer;