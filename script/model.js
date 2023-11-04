// モデルデータ処理

// グローバル変数
let data;
let view;
let constants;
let xSize;
let ySize;
let selectX;
let selectY;
let firstSelectX;
let firstSelectY;


/**
 * 初期化
 * @function
 * @param {number} x ｘサイズ
 * @param {number} y yサイズ
 * @returns {void}
 */
export function init(x, y) {
    (async () => {

        await import("./view.js").then((data) => {
            view = data;
        });
        await import("./constants.js").then((data) => {
            constants = data;
        });
        xSize = constants.WIDTH;
        ySize = constants.HEIGHT;
        
        data = new Array(ySize);
        for (let index = 0; index < ySize; index++) {
            data[index] = new Array(xSize);
        }

        modelCreate();
    })();
}

/**
 * データ作成
 * @function
 * @returns {void}
 */
function modelCreate() {
    for (let x = 0; x < xSize; x++) {
        for (let y = 0; y < ySize; y++) {
            data[x][y] = parseInt(Math.random() * 10);
        }
    }
}

/**
 * @function
 * @returns {data[][]} データ配列
 */
export function getData() {
    return data;
}

/**
 * 選択座標設定
 * @function
 * @param {number} x座標
 * @param {number} y座標
 * @returns {void}
 */
export function setSelectPos(x, y) {
    selectX = x;
    selectY = y;
}

/**
 * 選択座標取得
 * @function
 * @returns {[number,number]} 選択座標
 */
export function getSelectPos() {
    return [selectX, selectY];
}

/**
 * 1回目クリック処理イベント
 * @function
 * @retuns {void}
 */
export function firstClickEvent() {
    const [xPos, yPos] = getSelectPos();
    firstSelectX = xPos;
    firstSelectY = yPos;
    // 選択セルの背景色変更
    view.setSelectCellColor(xPos, yPos);
    statemachine.setState(constants.STATE_MAIN.CLICK_SECOND_IDLE);
}

/**
 * 2回目クリック処理イベント
 * @function
 * @retuns {void}
 */
export function secondClickEvent() {
    const [xPos, yPos] = getSelectPos();

    // 選択セルの背景色変更
    view.setSelectCellColor(xPos, yPos);

    // ここに導通判定処理を作る


    // 一定時間後選択リセット
    const id = setTimeout(() => {

        console.log("time out");
        view.setUnSelectCellColor(xPos, yPos);
        view.setUnSelectCellColor(firstSelectX, firstSelectY);
        statemachine.setState(constants.STATE_MAIN.IDLE);

        clearTimeout(id);
    }, 1000);

    statemachine.setState(constants.STATE_MAIN.TIME_WAIT);


}