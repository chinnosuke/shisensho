// ステートマシーン

// グローバル変数
let constants;
let control;

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
 * @function
 * @param {constants.STATE_MAIN} input_state メインステート
 * @returns {void}
 */
export function setState(input_state) {
    console.log(input_state);
    switch (input_state) {
        case constants.STATE_MAIN.INIT:
            // ビュー初期化
            // 入力初期化
            // モデル初期化
            model.init(10, 10);
            view.init();
            control.init();
            break;
        case constants.STATE_MAIN.IDLE:
            break;
        case constants.STATE_MAIN.CLICK_FIRST:
            if (state != constants.STATE_MAIN.IDLE) {
                return;
            }
            console.log("first");
            break;
        case constants.STATE_MAIN.CLICK_SECOND:
            if (state != constants.STATE_MAIN.CLICK_SECOND) {
                return;
            }
            console.log("first")
            break;

    }

    state = input_state;

}