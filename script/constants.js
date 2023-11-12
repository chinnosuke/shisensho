// 定数管理

// 縦横サイズ
export const WIDTH = 10;
export const HEIGHT = 10;
export const ICON_PAIR_COUNT = 40;
export const ICON_TYPE = [
    "","●", "▲", "■", "×", "△", "□", "∴", "◇", "◆","◎","☆","★","▼","▽"
];

// メインステート
export const STATE_MAIN = Object.freeze({
    INIT: 0,
    IDLE: 1,
    CLICK_FIRST: 2,
    CLICK_SECOND_IDLE: 3,
    CLICK_SECOND: 4,
    TIME_WAIT: 5,
});