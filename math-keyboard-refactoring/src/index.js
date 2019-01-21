import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import $ from 'jquery'

import store from './store'
import MathKeyboard from './components/math-keyboard'

var answerinputs = $('input[id$="answer"]');
answerinputs.each(function (i, input) {
    console.log(input)
    input = $(input)
    var _id = input.prop('id');
    input.css('display', 'none');
    var width = input.innerWidth();
    var newdiv = $('<div keyboard-id=' + _id + '></div>')
    ReactDOM.render(
        <Provider store={store}>
            <MathKeyboard originalInput={input}  />
        </Provider>,
        newdiv.get(0)
    );
    newdiv.insertAfter(input)
})
