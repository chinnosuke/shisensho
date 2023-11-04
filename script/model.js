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

    let indexList = [];

    for (let x = 1; x < xSize - 1; x++) {
        for (let y = 1; y < ySize - 1; y++) {
            indexList.push([x, y]);
        }
    }

    // ペアでデータを作成
    for (let index = 0; index < constants.ICON_PAIR_COUNT; index++) {
        const index1 = parseInt(Math.random() * indexList.length);
        const position1 = indexList[index1];
        indexList.splice(index1, 1);

        const index2 = parseInt(Math.random() * indexList.length);
        const position2 = indexList[index2];
        indexList.splice(index2, 1);

        const x1 = position1[0];
        const y1 = position1[1];

        const x2 = position2[0];
        const y2 = position2[1];
        const icon = parseInt(Math.random() * constants.ICON_TYPE.length);//constants.ICON_TYPE[parseInt(Math.random() * constants.ICON_TYPE.length)]

        data[x1][y1] = icon;
        data[x2][y2] = icon;
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