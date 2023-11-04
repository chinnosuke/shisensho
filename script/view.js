// ビュー処理

// グローバル変数
let modelData;
let control;
let constants;
let isInit = false;

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
        await import("./model.js").then((data) => {
            modelData = data;
            // テーブルを作成
            createTable();
            viewData();
        });
    })();
}

/**
 * テーブル作製
 * @function
 * @returns {void}
 */
function createTable() {
    if (isInit) {
        return;
    }

    const body = document.querySelector('body');
    if (!body) {
        return;
    }

    const data = modelData.getData()
    const x = data.length;
    const y = data[0].length;

    const table = document.createElement('table');
    body.append(table);

    for (let yIndex = 0; yIndex < y; yIndex++) {
        const tr = document.createElement('tr');
        table.append(tr);
        for (let xIndex = 0; xIndex < x; xIndex++) {
            const td = document.createElement('td');
            td.setAttribute('id', `cell_${xIndex}_${yIndex}`);
            // クリックイベント
            td.addEventListener('click', control.cellClick);

            tr.append(td);
        }
    }
    isInit = true;
}

/**
 * データ表示
 * @function
 * @returns {void}
 */
function viewData() {
    const data = modelData.getData()
    const x = data.length;
    const y = data[0].length;

    for (let yIndex = 0; yIndex < y; yIndex++) {
        for (let xIndex = 0; xIndex < x; xIndex++) {
            const cell = getCell(xIndex, yIndex);
            if (cell) {
                cell.textContent = constants.ICON_TYPE[data[xIndex][yIndex]];
            }
        }
    }
}

/**
 * テーブルセル取得
 * @function
 * @param {mumber} x x座標
 * @param {mumber} y y座標 
 * @returns {Element} テーブルセルエレメント
 */
function getCell(x, y) {
    let cell = document.querySelector(`#cell_${x}_${y}`);
    return cell;
}

/**
 * セル選択色設定
 * @function
 * @param {number} x座標
 * @param {number} y座標
 * @returns {void}
 */
export function setSelectCellColor(x, y) {
    const cell = getCell(x, y);
    cell.classList.add('select-cell');
}

/**
 * セル選択解除色設定
 * @function
 * @param {number} x座標
 * @param {number} y座標
 * @returns {void}
 */
export function setUnSelectCellColor(x, y) {
    const cell = getCell(x, y);
    cell.classList.remove('select-cell');
}