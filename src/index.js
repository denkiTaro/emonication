'use strict';
import * as context from './context/context.js';
import * as EVENT from './js/event.js';

const ranges = document.getElementById('ranges');
const fieldInputDOM = document.getElementById('fieldInput');
const deleteButton = document.getElementById('deleteButton');
const fieldRanges = context.fieldRanges;
const textInputDOM = document.getElementById('textInput');

// fieldRangesのサイズを設定
fieldRanges.height = fieldInputDOM.offsetHeight;
fieldRanges.width  = fieldInputDOM.offsetWidth;

const pointerdownEvent = EVENT.pointerdownEvent;
const pointermoveEvent = EVENT.pointermoveEvent;
const touchendEvent    = EVENT.touchendEvent;
const deleteClickEvent = EVENT.deleteClickEvent;

// event設定
ranges.addEventListener( 'pointerdown' , (e)=>{ pointerdownEvent(e) } );
ranges.addEventListener( 'pointermove' , (e)=>{ pointermoveEvent(e) } );
ranges.addEventListener( 'touchend'    , (e)=>{ touchendEvent(e) } );

deleteButton.addEventListener( 'click' , ()=>{ deleteClickEvent() } );


// 入力された文字に対しての処理
textInputDOM.addEventListener( 'input' , (e)=>{ textInputDOM.value } );
console.log( textInputDOM );
