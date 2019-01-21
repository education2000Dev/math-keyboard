import { createStore, combineReducers } from 'redux'

const initialThisState = {
    id: 'defaultid',
    renderInput: false,
    disable: false,
}

const thisReducer = (state=initialThisState, action) => {
    switch (action.type) {
        case 'SetPage':
            return {
                ...state,
                renderInput: true,
            }
        default :
            return state
    }
}

const initialPageState = {
    type: '',
    height: 0,
    width: 0,
    orientation: ''
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

const store = createStore(reducer);

export default store;