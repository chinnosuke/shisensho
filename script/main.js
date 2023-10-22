// グローバル変数
let constants;
let model;
let view;
let control;
let statemachine;
let state;

let data = [10][10];




/**
 * メイン関数
 * @function
 * @returns {void}
 */
function main() {
    // 初期化
    init().then(() => {

        statemachine.init();
        //        statemachine.setState(constants.STATE_MAIN.INIT);
    });
}

/**
 * 初期化
 * @function
 * @returns {void}
 */
async function init() {
    // 必要なデータをimportする
    let modelPromise = import("./model.js").then((data) => {
        model = data;
    });

    let viewPromise = import("./view.js").then((data) => {
        view = data;
    });

    let controlPromise = import("./control.js").then((data) => {
        control = data;
    });

    let constantsPromise = import("./constants.js").then((data) => {
        constants = data;
    });

    let statemachinePromise = import("./statemachine.js").then((data) => {
        statemachine = data;
    });
    await Promise.all([modelPromise, viewPromise, controlPromise, constantsPromise, statemachinePromise]);

}

// ゲームスタート
main();