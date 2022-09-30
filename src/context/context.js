

// 座標関係
/**
 * start&end は指が 触れた、離れた 瞬間の座標
 * emotion は [ 左を0とした右回りの値 , 感情(漢字) ]
 * height&width エモコン要素についての情報
 * deg 角度
 */
export const fieldRanges = {
    // 実際に使う値 origin は中央
    startX: null,
    startY: null,
    endX: null,
    endY: null,

    emotion: ['' , '' ],

    height: null,
    width: null,

    deg: null,
}

// 入力関係
/**
 * 入力された値 (ここを変更すると出力も変更される)
 */
export const textValues = {
    textValue: '',
}

// 音楽関係
/**
 * 使用する音源一覧
 */
export const musics = {
    // terror
    get 0(){ return new Audio('../src/music/terror.mp3')},
    // admiration
    get 1(){ return new Audio('../src/music/admiration.mp3')},
    // ecstasy
    get 2(){ return new Audio('../src/music/ecstasy.mp3')},
    // vigilance
    get 3(){ return new Audio('../src/music/vigilance.mp3')},
    // rage
    get 4(){ return new Audio('../src/music/rage.mp3')},
    // loathing
    get 5(){ return new Audio('../src/music/loathing.mp3')},
    // grief
    get 6(){ return new Audio('../src/music/grief.mp3')},
    // amazement
    get 7(){ return new Audio('../src/music/amaziment.mp3')},

    // bomb
    get 8(){ return new Audio('../src/music/bomb_4.wav')},
    // explosion
    get 9(){ return new Audio('../src/music/explosion.mp3')},
}

