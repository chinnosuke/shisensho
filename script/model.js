// モデルデータ処理

// グローバル変数
let data;
let connectData;
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

        data = new Array(ySize + 2);
        for (let index = 0; index < ySize + 2; index++) {
            data[index] = new Array(xSize + 2);
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

    for (let x = 0; x < xSize + 2; x++) {
        for (let y = 0; y < ySize + 2; y++) {
            data[x][y] = 0;
        }
    }

    for (let x = 0; x < xSize; x++) {
        for (let y = 0; y < ySize; y++) {
            indexList.push([x + 1, y + 1]);
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
        const icon = parseInt(Math.random() * constants.ICON_TYPE.length - 1) + 1;

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

    // 空白セルの場合はキャンセル
    if (!data[xPos][yPos]) {
        statemachine.setState(constants.STATE_MAIN.IDLE);
        return;
    }

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

    // 1回目同一座標同一種類チェック
    if (xPos == firstSelectX && yPos == firstSelectY) {
        statemachine.setState(constants.STATE_MAIN.CLICK_SECOND_IDLE);
        return;
    }

    if (data[xPos][yPos] != data[firstSelectX][firstSelectY]) {
        view.setUnSelectCellColor(firstSelectX, firstSelectY);
        statemachine.setState(constants.STATE_MAIN.IDLE);
        return;
    }

    // 選択セルの背景色変更
    view.setSelectCellColor(xPos, yPos);

    connectData = [];

    // ここに導通判定処理を作る
    const isConnect = varidate();

    view.setConnectCellColor(connectData);
    // 一定時間後選択リセット
    const id = setTimeout(() => {

        view.setUnSelectCellColor(xPos, yPos);
        view.setUnSelectCellColor(firstSelectX, firstSelectY);
        statemachine.setState(constants.STATE_MAIN.IDLE);
        view.setUnConnectCellColor(connectData);

        if (isConnect == true) {
            data[firstSelectX][firstSelectY] = constants.ICON_TYPE[0];
            data[xPos][yPos] = constants.ICON_TYPE[0];

            view.viewCellData(firstSelectX, firstSelectY, data);
            view.viewCellData(xPos, yPos, data);
        }

        clearTimeout(id);
    }, 1000);

    statemachine.setState(constants.STATE_MAIN.TIME_WAIT);


}

/**
 * バリデーションチェック
 * @function
 * @returns {boolean} true:成功 false:失敗
 */
export function varidate() {
    let isConnect = true;
    let left1 = 0;
    let right1 = constants.WIDTH + 1;
    let top1 = 0;
    let bottom1 = constants.HEIGHT + 1;
    let left2 = 0;
    let right2 = constants.WIDTH + 1;
    let top2 = 0;
    let bottom2 = constants.HEIGHT + 1;

    let x1 = parseInt(firstSelectX);
    let y1 = parseInt(firstSelectY);
    let x2 = parseInt(selectX);
    let y2 = parseInt(selectY);

    const firstData = data[x1][y1];
    const secondData = data[x2][y2];

    if (firstData != secondData) {
        return false;
    }

    // 1つ目左チェック
    for (let index = x1; index > 0; index--) {
        //空じゃないセルに当たったら終わり
        if (data[index - 1][y1]) {
            left1 = index;
            break;
        }
    }

    // 1つ目右チェック
    for (let index = x1; index < constants.WIDTH; index++) {
        //空じゃないセルに当たったら終わり
        if (data[index + 1][y1]) {
            right1 = index;
            break;
        }
    }

    // 1つ目上チェック

    for (let index = y1; index > 0; index--) {
        //空じゃないセルに当たったら終わり
        if (data[x1][index - 1]) {
            top1 = index;
            break;
        }
    }

    // 1つ目下チェック
    for (let index = y1; index < constants.HEIGHT; index++) {
        //空じゃないセルに当たったら終わり
        if (data[x1][index + 1]) {
            bottom1 = index;
            break;
        }
    }

    // 2つ目左チェック
    for (let index = x2; index > 0; index--) {
        //空じゃないセルに当たったら終わり
        if (data[index - 1][y2]) {
            left2 = index;
            break;
        }
    }

    // 2つ目右チェック
    for (let index = x2; index < constants.WIDTH; index++) {
        //空じゃないセルに当たったら終わり
        if (data[index + 1][y2]) {
            right2 = index;
            break;
        }
    }

    // 2つ目上チェック

    for (let index = y2; index > 0; index--) {
        //空じゃないセルに当たったら終わり
        if (data[x2][index - 1]) {
            top2 = index;
            break;
        }
    }

    // 2つ目下チェック
    for (let index = y2; index < constants.HEIGHT; index++) {
        //空じゃないセルに当たったら終わり
        if (data[x2][index + 1]) {
            bottom2 = index;
            break;
        }
    }

    let ret = false;
    let startPos = 0;
    let endPos = 0;

    // 横軸上下共通範囲チェック
    if (left1 <= left2 && right1 >= left2) {
        startPos = left2;
        if (left1 <= right2 && right1 >= right2) {
            endPos = right2;
        }
        else {
            endPos = right1;
        }
    }
    else if (left2 <= left1 && right2 >= left1) {
        startPos = left1;
        if (left2 <= right1 && right2 >= right1) {
            endPos = right1;
        }
        else {
            endPos = right2;
        }
    }
    else {
        isConnect = false;
    }

    if (isConnect == true) {
        const startY = y1 < y2 ? y1 : y2;
        const endY = y1 < y2 ? y2 : y1;
        let index = 0;

        // 横軸範囲導通チェック
        for (let posX = startPos; posX <= endPos; posX++) {
            isConnect = true;
            for (let posY = startY + 1; posY < endY; posY++) {
                const cellData = data[posX][posY];

                if (cellData != 0) {
                    isConnect = false;
                    break;
                }
            }
            if (isConnect == true) {
                ret = true;
                index = posX;
                break;
            }
        }

        // 導通OKならセルを記録
        if (ret) {
            connectData = [];

            const startIndex1 = x1 < index ? x1 : index;
            const endIndex1 = x1 < index ? index : x1;
            const startIndex2 = x2 < index ? x2 : index;
            const endIndex2 = x2 < index ? index : x2;

            const startIndex3 = Math.min(y1, y2) + 1;
            const endIndex3 = Math.max(y1, y2) - 1;
            for (let indexX = startIndex1; indexX <= endIndex1; indexX++) {
                connectData.push([indexX, y1]);
            }
            for (let indexX = startIndex2; indexX <= endIndex2; indexX++) {
                connectData.push([indexX, y2]);
            }
            for (let indexY = startIndex3; indexY <= endIndex3; indexY++) {
                connectData.push([index, indexY]);
            }
            return true;
        }
    }


    // 縦軸チェック
    isConnect = true;
    if (top1 <= top2 && bottom1 >= top2) {
        startPos = top2;
        if (top1 <= bottom2 && bottom1 >= bottom2) {
            endPos = bottom2;
        }
        else {
            endPos = bottom1;
        }
    }
    else if (top2 <= top1 && bottom2 >= top1) {
        startPos = top1;
        if (top2 <= bottom1 && bottom2 >= bottom1) {
            endPos = bottom1;
        }
        else {
            endPos = bottom2;
        }
    }
    else {
        isConnect = false;
    }

    if (isConnect == true) {

        const startX = x1 < x2 ? x1 : x2;
        const endX = x1 < x2 ? x2 : x1;

        let index = 0;

        // 横軸範囲導通チェック
        for (let posY = startPos; posY <= endPos; posY++) {
            isConnect = true;
            for (let posX = startX + 1; posX < endX; posX++) {
                const cellData = data[posX][posY];

                if (cellData != 0) {
                    isConnect = false;
                    break;
                }
            }
            if (isConnect == true) {
                ret = true;
                index = posY;
                break;
            }
        }

        // 導通OKならセルを記録
        if (ret) {
            connectData = [];

            const startIndex1 = y1 < index ? y1 : index;
            const endIndex1 = y1 < index ? index : y1;
            const startIndex2 = y2 < index ? y2 : index;
            const endIndex2 = y2 < index ? index : y2;


            const startIndex3 = Math.min(x1, x2) + 1;
            const endIndex3 = Math.max(x1, x2) - 1;
            for (let indexY = startIndex1; indexY <= endIndex1; indexY++) {
                connectData.push([x1, indexY]);
            }
            for (let indexY = startIndex2; indexY <= endIndex2; indexY++) {
                connectData.push([x2, indexY]);
            }
            for (let indexX = startIndex3; indexX <= endIndex3; indexX++) {
                connectData.push([indexX, index]);
            }
            return true;
        }
    }
    return false;
}
