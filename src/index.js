import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import $ from 'jquery'

import reducer from './store'
import MathKeyboard from './components/math-keyboard'
import CleanBrackets from './utils'

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
_self.CleanBrackets = function(a,b){
    return CleanBrackets(a,b);
};
_self.render_keyboard = function(selector){
    if($(selector).find('input[is_original_input=true]').length > 0){
        $('input[is_original_input=true]').each(function (i, input) {
            let store = createStore(reducer);
            let $input = $(input);
            let innerwidth = input.style.width;
            innerwidth = !innerwidth||innerwidth===""?'auto':innerwidth;
            $input.css('display', 'none');
            const newdiv = $('<div style="display: inline-block;"></div>');
            ReactDOM.render(
            <Provider store={store}>
                <MathKeyboard
                    originalInput={$input}
                    divelem={newdiv}
                    ismath={true}
                    width={innerwidth}

                />
            </Provider>,
            newdiv.get(0)
        );
            newdiv.insertBefore($input);
        })
    }else if($(selector).hasClass('statichtml_math-keyboard')){
        //静态页数学键盘
        let $field = $(selector);
        let store = createStore(reducer);
        const newdiv = $('<div class="math-board " style="display: inline-block;"></div>');
        ReactDOM.render(
            <Provider store={store}>
                <MathKeyboard
                    originalInput={$field}
                    ismath={true}
                    divelem={newdiv}
                />
            </Provider>,
            newdiv.get(0)
        );
        newdiv.insertAfter($field);
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
            let ismath = true;
            let mathkeyboard = $user_input.attr('data-mathkeyboard');
            if(typeof mathkeyboard !=='undefined'){
                ismath = !!Number(mathkeyboard);
            }
            //szy190625 如果单空2位指定数学键盘，则默认显示键盘
            /*else{
                let correct_answers = $field.nextAll('span[id$=question_info]').text();
                correct_answers = JSON.parse(_self.decode64(correct_answers));
                $.each(correct_answers, function(i, val) {
                    if (val.answer.match(/\{|\+|^.+-|\\|<|=|>/) && !val.answer.match(/^[+|-][\d\w]*$/)) {
                        ismath = true;
                        return false;
                    }
                });
            }*/
            let _id = $input.prop('id');
            let innerwidth = $user_input.get(0).style.width;
            innerwidth = !innerwidth||innerwidth===""?'auto':innerwidth;

            $user_input.css('display', 'none');

            const newdiv = $('<div class="math-board " math-board-id=' + _id + ' style="display: inline-block;"></div>');
            ReactDOM.render(
            <Provider store={store}>
                <MathKeyboard
                    originalInput={$user_input}
                    divelem={newdiv}
                    ismath={ismath}
                    width={innerwidth}

                />
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
            let input = $field.nextAll('input[name$=answer]').first();
            let $user_input = input.nextAll('input[name$=user_input]').first();
            if ($user_input.val()) {
                input.val($user_input.val());
            } else {
                $user_input.val(input.val());
            }
            let ismath = true;
            let mathkeyboard = $user_input.attr('data-mathkeyboard');
            if(typeof mathkeyboard !=='undefined'){
                ismath = !!Number(mathkeyboard);
            }
            //szy190625 如果多空2位指定数学键盘，则默认显示键盘
            //PS。无论数值和单空1题如何，都不会出现数学键盘
            /*else{
                let correct_answers = $field.nextAll('span[id$=question_info]').text();
                correct_answers = JSON.parse(_self.decode64(correct_answers));
                $.each(correct_answers, function(i, val) {
                    if (val.answer.match(/\{|\+|^.+-|\\|<|=|>/) && !val.answer.match(/^[+|-][\d\w]*$/)) {
                        ismath = true;
                        return false;
                    }
                });
            }*/
            let _id = input.prop('id');
            let innerwidth = input.get(0).style.width;
            innerwidth = !innerwidth||innerwidth===""?'auto':innerwidth;

            input.css('display', 'none');
            const newdiv = $('<div class="math-board " math-board-id=' + _id + ' style="display: inline-block;"></div>');
            ReactDOM.render(
            <Provider store={store}>
                <MathKeyboard
                    originalInput={$user_input}
                    ismath={ismath}
                    divelem={newdiv}
                    width={innerwidth}

                />
            </Provider>,
            newdiv.get(0)
        );
            newdiv.insertBefore(input)
        });

        //MultiAnswer 3
        let $m3questions = $(selector).hasClass('multianswer3')?$(selector):$(selector).find('.multianswer3');
        $m3questions.each(function (i, m3question) {
            let $m3question = $(m3question);
            let fields = $m3question.find('.content');
            fields.each(function () {
                let self = this;
                //szy多空交换一定是数学键盘题，默认不弹出数学键盘
                //let correct_answers = $(self).find('span[name$=unprocessed_info]').text();
                //correct_answers = JSON.parse(_self.decode64(correct_answers));
                let ismath = false;
                /*
                if ($.isArray(correct_answers['answer'])) {
                    for (let i = 0; i < correct_answers['answer'].length; i++) {
                        if (correct_answers['answer'][i].match(/\{|\+|^.+-|\\|<|=|>/) && !correct_answers['answer'][i].match(/^[+|-][\d\w]*$/)) {
                            break;
                        }
                    }
                } else {
                    if (correct_answers.match(/\{|\+|^.+-|\\|<|=|>/)) ismath = true;
                    if (correct_answers.match(/^[+|-][\d\w]*$/)) ismath = false;
                }*/
                let mathfields_for_multianswer3 = $(self).find('span[class="matheditor3"]');
                mathfields_for_multianswer3.each(function (i, field) {
                    let store = createStore(reducer);
                    let $field = $(field);
                    let $input = $field.nextAll('input[name$=answer]');
                    let $user_input = $field.nextAll('input[name$=user_input]');
                    let _id = $input.prop('id');
                    let innerwidth = $user_input.get(0).style.width;
                    $user_input.css('display', 'none');
                    innerwidth = !innerwidth||innerwidth===""?'auto':innerwidth;
                    let mathkeyboard = $user_input.attr('data-mathkeyboard');
                    if(typeof mathkeyboard !=='undefined'){
                        ismath = !!Number(mathkeyboard);
                    }
                    const newdiv = $('<div class="math-board " math-board-id=' + _id + ' style="display: inline-block;"></div>');
                    ReactDOM.render(
                        <Provider store={store}>
                            <MathKeyboard
                                originalInput={$user_input}
                                ismath={ismath}
                                divelem={newdiv}
                                width={innerwidth}
                            />
                        </Provider>,
                        newdiv.get(0)
                    );
                    newdiv.insertAfter($field);
                })
            })
        });
        let matharea_for_logic = $(selector).hasClass('logic')?$(selector):$(selector).find('.logic');
        matharea_for_logic.each(function (i, qlogic) {
            let mathfields = $(qlogic).find('.content');
            mathfields.each(function () {
                let self = this;

                let mathfields_for_logic = $(self).find('span[class="matheditor4"]');
                   mathfields_for_logic.each(function (i, field) {
                       let store = createStore(reducer);
                       let $field = $(field);
                       let $user_input = $field.nextAll('input[name$=user_input]').first();
                       let _id = $user_input.attr('id');
                       let ismath = !!Number($user_input.attr('data-math'));
                       const newdiv = $('<div class="math-board " math-board-id=' + _id + ' style="display: inline-block;"></div>');
                       let innerwidth = $user_input.get(0).style.width;
                       $user_input.css('display', 'none');
                       innerwidth = !innerwidth||innerwidth===""?'auto':innerwidth;
                       ReactDOM.render(
                           <Provider store={store}>
                               <MathKeyboard
                                   originalInput={$user_input}
                                   ismath={ismath}
                                   divelem={newdiv}
                                   width={innerwidth}
                                   qtype='logic'
                               />
                           </Provider>,
                           newdiv.get(0)
                       );
                       newdiv.insertAfter($field);
                    })
                })

        });

    }
};

_self.mobile_render_keyboard = function(selector){
    $(selector).find('input[id$=answer]').each(function (i, field) {
        let $field = $(field);
        let innerwidth = field.style.width;
        if ($field.attr('hidden') !== 'hidden') {
            let store = createStore(reducer);
            const newdiv = $('<div class="math-board " style="display: inline-block;"></div>');
            innerwidth = !innerwidth||innerwidth===""?'auto':innerwidth;
            ReactDOM.render(
                <Provider store={store}>
                    <MathKeyboard
                        originalInput={$field}
                        ismath={false}
                        divelem={newdiv}
                        width={innerwidth}
                        mobile={true}
                    />
                </Provider>,
                newdiv.get(0)
            );
            newdiv.insertAfter($field);
        }
    })
};

