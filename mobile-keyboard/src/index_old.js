import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import $ from 'jquery'

import reducer from './store'
import ConnectedKeyboardContainer from './components/keyboardContainer'

    
var mathfields_for_answer = $('input[id$=answer]');
mathfields_for_answer.each(function (i, field) {
    var $field = $(field);
    if ($field.attr('hidden') !== 'hidden') {
        var store = createStore(reducer);

        var newdiv = $('<div class="mobile-keyboard" style="display: inline-block;position: relative"></div>')
        ReactDOM.render(
            <Provider store={store}>
                <ConnectedKeyboardContainer originalInput={$field} divelem={newdiv} />
            </Provider>,
            newdiv.get(0)
        );
        newdiv.insertAfter($field);
    }
})
    
    

