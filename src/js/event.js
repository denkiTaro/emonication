'use strict';
import * as context from '../context/context.js';


const fieldRanges = context.fieldRanges;
const textValues = context.textValues;
const textInputDOM = document.getElementById('textInput');
const backgroundDOM = document.getElementById('emonicationRoot');
const designArray =
[
    [ '#6ECC84' , [ 'ð¦' , 'ð¥' ] ],
    [ '#B7E55C' , [ 'ð' , 'ð¥°' ] ],
    [ '#FFDC46' , [ 'ð' , 'ð' ] ],
    [ '#FAB466' , [ 'ð' , 'ð§' ] ],
    [ '#ED748B' , [ 'ð ' , 'ð¡' ] ],
    [ '#C1ADCC' , [ 'ð' , 'ð©' ] ],
    [ '#97BADB' , [ 'ð¢' , 'ð­' ] ],
    [ '#91C2CF' , [ 'ð®' , 'ðµ' ] ],
    ['ð¤¯']
];
const fieldImgDOM = document.getElementById('fieldInput').getElementsByTagName('img')[0];

// ===================================================

/**
 * æ°å¤ãå°æ°ç¹ç¬¬ä¸ä½ã¾ã§ã«ãã
 * @param {number} num å°æ°ç¹ãçç¥ãããå¤
 */
function simplifyNumbers( num ) {
    return Math.floor(num);
}

/**
 * ä¸­å¤®ãoriginã¨ããåº§æ¨ãè¨­å®
 * @param {number} X Xåº§æ¨
 * @param {number} Y Yåº§æ¨
 */
function setCoordinate(X,Y) {
    fieldRanges.startX = simplifyNumbers(X);
    fieldRanges.startY = simplifyNumbers(Y);
}

/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @returns æ±ããè§åº¦(deg)
 */
function createAngleByTan( x , y ) {
    const deg = Math.atan2(y, x) * 180 / Math.PI;
    fieldRanges.deg = deg;
    return deg;
}

/**
 * 
 * @param {number} deg 
 * @returns [ ææçªå· ,ææ ]
 */
function emotionalDisplayWithDeg( deg ) {
        if( 22.5*-1    <= deg && deg <= 22.5*1    ) { return [ 0 , 'åª'] }
    else if( 22.5*1    <= deg && deg <= 22.5*3    ) { return [ 1 , 'ä¿¡'] }
    else if( 22.5*3    <= deg && deg <= 22.5*5    ) { return [ 2 , 'å'] }
    else if( 22.5*5    <= deg && deg <= 22.5*7    ) { return [ 3 , 'è­¦'] }
    else if( 22.5*7    <= deg || deg <= 22.5*(-7) ) { return [ 4 , 'æ'] }
    else if( 22.5*(-7) <= deg && deg <= 22.5*(-5) ) { return [ 5 , 'å«'] }
    else if( 22.5*(-5) <= deg && deg <= 22.5*(-3) ) { return [ 6 , 'æ²'] }
    else if( 22.5*(-3) <= deg && deg <= 22.5*(-1) ) { return [ 7 , 'é©'] }
}

/**
 * 
 * @param {number} num emotionã®å¤
 */
function playMusic(num) {
    context.musics[num].play();
}


// ===================================================


/**
 * ç´ ã®åº§æ¨ï¼è¦ç´ ã®å·¦ä¸ãoriginã¨ããï¼ã®è¨­å®
 * @param {Element} e 
 */
export const pointerdownEvent = function(e) {
    // ä¸­å¤®ãoriginã¨ãã x ã®å¤
    const xRange = e.offsetX - fieldRanges.width/2;
    // ä¸­å¤®ãoriginã¨ãã y ã®å¤
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
    context.emoconImages.setIcons( fieldImgDOM , fieldRanges.emotion[0] );
    console.log( fieldRanges.emotion[0] );
}

/**
 * æ¥è§¦çµããã®event
 */
export const touchendEvent = function() {
    // ææè¿½å é¨å
    const textValue = textInputDOM.value;
    const designInfo = designArray[ fieldRanges.emotion[0] ];
    textValues.textValue = textValue;
    textInputDOM.value = textInputDOM.value + designInfo[1][1];
    backgroundDOM.style.backgroundColor = designInfo[0];
    playMusic( fieldRanges.emotion[0] );
    context.emoconImages.init( fieldImgDOM )
}

/**
 * ã´ãç®±ãã¿ã³event
 */
export const deleteClickEvent = function () {
    textInputDOM.value = '';
    backgroundDOM.style.backgroundColor = '';
    context.emoconImages.init( fieldImgDOM );
}

