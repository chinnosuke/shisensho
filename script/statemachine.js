// ステートマシーン

// グローバル変数
let constants;
let control;
let state;

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
        await import("./control.js").then((data) => {
            control = data;
        });

        setState(constants.STATE_MAIN.INIT);
    })();

}

/**
 * ステート取得
 * @function
 * @returns {void}
 */
export function getState() {
    return state;
}

/**
 * @function
 * @param {constants.STATE_MAIN} input_state メインステート
 * @returns {void}
 */
export function setState(input_state) {
    switch (input_state) {
        case constants.STATE_MAIN.INIT:
            // ビュー初期化
            // 入力初期化
            // モデル初期化
            model.init(10, 10);
            view.init();
            control.init();
            input_state = constants.STATE_MAIN.IDLE;
            break;
        case constants.STATE_MAIN.IDLE:
            // クリック待機
            break;
        case constants.STATE_MAIN.CLICK_FIRST:
            // クリック1回目
            model.firstClickEvent();
            return;
        case constants.STATE_MAIN.CLICK_SECOND_IDLE:
            // 2回目クリック待機
            break;
        case constants.STATE_MAIN.CLICK_SECOND:
            // クリック2回目
            model.secondClickEvent();
            input_state = constants.STATE_MAIN.IDLE;
            return;
        case constants.STATE_MAIN.TIME_WAIT:

            break;
    }

    state = input_state;
}