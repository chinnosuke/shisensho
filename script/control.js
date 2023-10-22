// 操作処理

// グローバル変数
let view;
let statemachine;
let constants;

/**
 * 初期化
 * @function
 * @returns {void}
 */
export function init() {
    (async () => {

        await import("./constants.js").then((data) => {
            constants = data;
        });
        await import("./statemachine.js").then((data) => {
            statemachine = data;
        });
        await import("./view.js").then((data) => {
            view = data;
        });
    })();
}

/**
 * クリックイベント関数
 * @function
 * @param {Event} e イベント
 * @returns {void}
 */
export function cellClick(e) {
    let data = e.currentTarget.getAttribute('id').split('_');
    let x = data[1];
    let y = data[2];
    console.log(x, y);
    statemachine.setState(constants.STATE_MAIN.IDLE);
}