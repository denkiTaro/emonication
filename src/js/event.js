'use strict';
import * as context from '../context/context.js';


const fieldRanges = context.fieldRanges;
const textValues = context.textValues;
const textInputDOM = document.getElementById('textInput');
const backgroundDOM = document.getElementById('emonicationRoot');
const designArray =
[
    [ '#6ECC84' , [ '😦' , '😥' ] ],
    [ '#B7E55C' , [ '😊' , '🥰' ] ],
    [ '#FFDC46' , [ '😀' , '😆' ] ],
    [ '#FAB466' , [ '😕' , '😧' ] ],
    [ '#ED748B' , [ '😠' , '😡' ] ],
    [ '#C1ADCC' , [ '🙁' , '😩' ] ],
    [ '#97BADB' , [ '😢' , '😭' ] ],
    [ '#91C2CF' , [ '😮' , '😵' ] ],
    ['🤯']
];

// ===================================================

/**
 * 数値を小数点第一位までにする
 * @param {number} num 小数点を省略したい値
 */
function simplifyNumbers( num ) {
    return Math.floor(num);
}

/**
 * 中央をoriginとした座標を設定
 * @param {number} X X座標
 * @param {number} Y Y座標
 */
function setCoordinate(X,Y) {
    fieldRanges.startX = simplifyNumbers(X);
    fieldRanges.startY = simplifyNumbers(Y);
}

/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @returns 求めた角度(deg)
 */
function createAngleByTan( x , y ) {
    const deg = Math.atan2(y, x) * 180 / Math.PI;
    fieldRanges.deg = deg;
    return deg;
}

/**
 * 
 * @param {number} deg 
 * @returns [ 感情番号 ,感情 ]
 */
function emotionalDisplayWithDeg( deg ) {
        if( 22.5*-1    <= deg && deg <= 22.5*1    ) { return [ 0 , '優'] }
    else if( 22.5*1    <= deg && deg <= 22.5*3    ) { return [ 1 , '信'] }
    else if( 22.5*3    <= deg && deg <= 22.5*5    ) { return [ 2 , '喜'] }
    else if( 22.5*5    <= deg && deg <= 22.5*7    ) { return [ 3 , '警'] }
    else if( 22.5*7    <= deg || deg <= 22.5*(-7) ) { return [ 4 , '怒'] }
    else if( 22.5*(-7) <= deg && deg <= 22.5*(-5) ) { return [ 5 , '嫌'] }
    else if( 22.5*(-5) <= deg && deg <= 22.5*(-3) ) { return [ 6 , '悲'] }
    else if( 22.5*(-3) <= deg && deg <= 22.5*(-1) ) { return [ 7 , '驚'] }
}

/**
 * 
 * @param {number} num emotionの値
 */
function playMusic(num) {
    context.musics[num].play();
}


// ===================================================

/**
 * 素の座標（要素の左上をoriginとした）の設定
 * @param {Element} e 
 */
export const pointerdownEvent = function(e) {
    // 中央をoriginとした x の値
    const xRange = e.offsetX - fieldRanges.width/2;
    // 中央をoriginとした y の値
    const yRange = (e.offsetY - fieldRanges.height/2)*(-1);
    setCoordinate( xRange , yRange );
}


/**
 * 
 * @param {Element} e 
 */
export const pointermoveEvent = function(e) {
    const xRange = e.offsetX - fieldRanges.width/2;
    const yRange = (e.offsetY - fieldRanges.height/2)*(-1);
    fieldRanges.endX = simplifyNumbers(xRange);
    fieldRanges.endY = simplifyNumbers(yRange);
    const deg = createAngleByTan( fieldRanges.endX - fieldRanges.startX , fieldRanges.endY - fieldRanges.startY );
    fieldRanges.emotion = emotionalDisplayWithDeg( deg );
}

/**
 * 接触終わりのevent
 */
export const touchendEvent = function() {
    // 感情追加部分
    const textValue = textInputDOM.value;
    const designInfo = designArray[ fieldRanges.emotion[0] ];
    textValues.textValue = textValue;
    textInputDOM.value = textInputDOM.value + designInfo[1][1];
    backgroundDOM.style.backgroundColor = designInfo[0];
    playMusic( fieldRanges.emotion[0] );
}

/**
 * ゴミ箱ボタンevent
 */
export const deleteClickEvent = function () {
    textInputDOM.value = '';
    backgroundDOM.style.backgroundColor = '';
}

