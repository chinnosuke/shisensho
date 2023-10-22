// モデルデータ処理

// グローバル変数
let data;
let xSize;
let ySize;

/**
 * 初期化
 * @function
 * @param {number} x ｘサイズ
 * @param {number} y yサイズ
 * @returns {void}
 */
export function init(x, y) {
    xSize = x;
    ySize = y;
    data = new Array(ySize);
    for (let index = 0; index < ySize; index++) {
        data[index] = new Array(xSize);
    }

    modelCreate();
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