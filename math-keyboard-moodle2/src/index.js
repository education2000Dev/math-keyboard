import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import $ from 'jquery'

import reducer from './store'
import MathKeyboard from './components/math-keyboard'

let M = window.M;
M.extention = M.extention || {};
M.extention.math_question = M.extention.math_question || {};
let _self = M.extention.math_question;
_self.keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
_self.utf8_decode = (utftext) => {
    let string = "";
    let i = 0;
    let c = 0;
    let c1 = 0;
    let c2 = 0;
    let c3 = 0;
    while ( i < utftext.length ) {
        c = utftext.charCodeAt(i);
        if (c < 128) {
            string += String.fromCharCode(c);
            i++;
        } else if((c > 191) && (c < 224)) {
            c2 = utftext.charCodeAt(i+1);
            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            i += 2;
        } else {
            c2 = utftext.charCodeAt(i+1);
            c3 = utftext.charCodeAt(i+2);
            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }
    }
    return string;
};
_self.decode64 = (input) => {
    let output = "";
    let chr1, chr2, chr3;
    let enc1, enc2, enc3, enc4;
    let i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < input.length) {
        enc1 = _self.keyStr.indexOf(input.charAt(i++));
        enc2 = _self.keyStr.indexOf(input.charAt(i++));
        enc3 = _self.keyStr.indexOf(input.charAt(i++));
        enc4 = _self.keyStr.indexOf(input.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        output = output + String.fromCharCode(chr1);
        if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
        }
    }
    output = _self.utf8_decode(output);
    return output;
};
_self.render_keyboard = function(selector){
    if($(selector).find('input[is_original_input=true]').length > 0){
        $('input[is_original_input=true]').each(function (i, input) {
            let store = createStore(reducer);
            let $input = $(input);
            $input.css('display', 'none');
            const newdiv = $('<div style="display: inline-block;"></div>');
            ReactDOM.render(
            <Provider store={store}>
                <MathKeyboard originalInput={$input} ismath='true' divelem={newdiv} />
            </Provider>,
            newdiv.get(0)
        );
            newdiv.insertBefore($input);
        })
    }else{

        //ShortAnswer 2
        let mathfields_for_shortanswer2 = $(selector).find('span[class="matheditor2"]');
        mathfields_for_shortanswer2.each(function (i, field) {
            let store = createStore(reducer);
            let $field = $(field);
            if ($field.nextAll('div[math-board-id]').length > 0) return true;
            let $input = $field.nextAll('input[name$=answer]');
            let $user_input = $field.nextAll('input[name$=user_input]');
            if ($input.val() && !$user_input.val()) {
                $user_input.val($input.val());
            }
            let ismath = false;
            let correct_answers = $field.nextAll('span[id$=question_info]').text();
            correct_answers = JSON.parse(_self.decode64(correct_answers));
            $.each(correct_answers, function(i, val) {
                if (val.answer.match(/\{|\+|^.+-|\\|<|=|>/)) {
                    ismath = true;
                    if (val.answer.match(/^[+|-][\d\w]*$/)) {
                        ismath = false;
                    }
                    if (ismath) return false;
                }
            });
            let _id = $input.prop('id');
            $user_input.css('display', 'none');
            let width = $input.innerWidth();
            const newdiv = $('<div class="math-board " math-board-id=' + _id + ' style="display: inline-block;"></div>');
            ReactDOM.render(
            <Provider store={store}>
                <MathKeyboard originalInput={$user_input} ismath={ismath} divelem={newdiv} />
            </Provider>,
            newdiv.get(0)
        );
            newdiv.insertAfter($field);
        });

        //MultiAnswer 2
        let mathfields_for_multianswer2 = $(selector).find('span[class="matheditor"]');
        mathfields_for_multianswer2.each(function (i, field) {
            let store = createStore(reducer);
            let $field = $(field);
            let input = $field.nextAll('input[name$=answer]');
            let $user_input = input.nextAll('input[name$=user_input]');
            if ($user_input.val()) {
                input.val($user_input.val());
            } else {
                $user_input.val(input.val());
            }
            let ismath = false;
            let correct_answers = $field.nextAll('span[id$=question_info]').text();
            correct_answers = $.parseJSON(_self.decode64(correct_answers));
            $.each(correct_answers, function(i, val) {
                if (val.answer.match(/\{|\+|^.+-|\\|<|=|>/) && !val.answer.match(/^[+|-][\d\w]*$/)) {
                    return false;
                }
            });
            let _id = input.prop('id');
            input.css('display', 'none');
            let width = input.innerWidth();
            const newdiv = $('<div class="math-board " math-board-id=' + _id + ' style="display: inline-block;"></div>');
            ReactDOM.render(
            <Provider store={store}>
                <MathKeyboard originalInput={input} ismath={ismath} divelem={newdiv} />
            </Provider>,
            newdiv.get(0)
        );
            newdiv.insertBefore(input)
        });

        //MultiAnswer 3
        let $m3questions = $(selector).find('.multianswer3');
        $m3questions.each(function (i, m3question) {
            let $m3question = $(m3question);
            let fields = $m3question.find('.content');
            fields.each(function () {
                let self = this;
                let correct_answers = $(self).find('span[name$=unprocessed_info]').text();
                correct_answers = JSON.parse(_self.decode64(correct_answers));
                let ismath = false;
                if ($.isArray(correct_answers['answer'])) {
                    for (let i = 0; i < correct_answers['answer'].length; i++) {
                        if (correct_answers['answer'][i].match(/\{|\+|^.+-|\\|<|=|>/) && !correct_answers['answer'][i].match(/^[+|-][\d\w]*$/)) {
                            break;
                        }
                    }
                } else {
                    if (correct_answers.match(/\{|\+|^.+-|\\|<|=|>/)) ismath = true;
                    if (correct_answers.match(/^[+|-][\d\w]*$/)) ismath = false;
                }

                let mathfields_for_multianswer3 = $(self).find('span[class="matheditor3"]');
                mathfields_for_multianswer3.each(function (i, field) {
                    let store = createStore(reducer);
                    let $field = $(field);
                    let $input = $field.nextAll('input[name$=answer]');
                    let $user_input = $field.nextAll('input[name$=user_input]');
                    let _id = $input.prop('id');
                    $user_input.css('display', 'none');
                    let width = $input.innerWidth();
                    const newdiv = $('<div class="math-board " math-board-id=' + _id + ' style="display: inline-block;"></div>');
                    ReactDOM.render(
                        <Provider store={store}>
                            <MathKeyboard originalInput={$user_input} ismath={ismath} divelem={newdiv} />
                        </Provider>,
                        newdiv.get(0)
                    );
                    newdiv.insertAfter($field);
                })
            })
        });

        /*logic
        let matharea_for_logic = $(selector).find('.logic');
        matharea_for_logic.each(function (i, qlogic) {
            let mathfields = $(qlogic).find('.content');
            mathfields.each(function () {
                let self = this;
                $(self).find('span[name$=unprocessed_info]').text();
                correct_answers = JSON.parse(_self.decode64(correct_answers));
                let ismath = false;

                let mathfields_for_multianswer3 = $(self).find('span[class="matheditor3"]');
                mathfields_for_multianswer3.each(function (i, field) {
                    let store = createStore(reducer);
                    let $field = $(field);
                    let $input = $field.nextAll('input[name$=answer]');
                    let $user_input = $field.nextAll('input[name$=user_input]');
                    let _id = $input.prop('id');
                    $user_input.css('display', 'none');
                    let width = $input.innerWidth();
                    const newdiv = $('<div class="math-board " math-board-id=' + _id + ' style="display: inline-block;"></div>');
                    ReactDOM.render(
                        <Provider store={store}>
                            <MathKeyboard originalInput={$user_input} ismath={ismath} divelem={newdiv} />
                        </Provider>,
                        newdiv.get(0)
                    );
                    newdiv.insertAfter($field);
                })
            })
        });
        */

    }
};

