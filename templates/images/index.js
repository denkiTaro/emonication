'use strict';

const ranges = document.getElementById('ranges');
const fieldInputDOM = document.getElementById('fieldInput');
const fieldRanges = {
    height: null,
    width: null,
    X: null,
    Y: null,
}

fieldRanges.height = fieldInputDOM.offsetHeight;
fieldRanges.width = fieldInputDOM.offsetWidth;

/**
 * 
 * @param {number} X X座標
 * @param {number} Y Y座標
 */
function setCoordinate(X,Y) {
    fieldRanges.X = X;
    fieldRanges.Y = Y;
}
const pointerEvent = function(e) {
    // 中央をoriginとした x の値
    const xRange = e.offsetX - fieldRanges.width/2;
    // 中央をoriginとした y の値
    const yRange = (e.offsetY - fieldRanges.height/2)*(-1);
    setCoordinate( xRange , yRange );
    
    TEST( e );
    console.log( e.offsetX , e.offsetY );
}

ranges.addEventListener( 'pointerdown' , (e)=>{ pointerEvent(e) } );
ranges.addEventListener( 'pointermove' , (e)=>{ console.log('動くnow') } );
ranges.addEventListener( 'touchend' , (e)=>{ console.log( e.changedTouches ) } )


// ====================================================================
function TEST() {
    console.log( fieldRanges.X , fieldRanges.Y );
}
// ====================================================================
