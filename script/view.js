// ビュー処理

// グローバル変数
let modelData;
let control;
let isInit = false;

/**
 * 初期化
 * @function
 * @returns {void}
 */
export function init() {
    (async () => {
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

    let body = document.querySelector('body');
    if (!body) {
        return;
    }

    let data = modelData.getData()
    let x = data.length;
    let y = data[0].length;

    let table = document.createElement('table');
    body.append(table);

    for (let yIndex = 0; yIndex < y; yIndex++) {
        let tr = document.createElement('tr');
        table.append(tr);
        for (let xIndex = 0; xIndex < x; xIndex++) {
            let td = document.createElement('td');
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
    let data = modelData.getData()
    let x = data.length;
    let y = data[0].length;

    for (let yIndex = 0; yIndex < y; yIndex++) {
        for (let xIndex = 0; xIndex < x; xIndex++) {
            let cell = getCell(xIndex, yIndex);
            if (cell) {
                cell.textContent = data[xIndex][yIndex];
            }
        }
    }
}

/**
 * テーブルセル取得
 * @function
 * @param {mumber} x x座標
 * @param {mumber} y y座標 
 * @returns {HTMMLElement} テーブルセルエレメント
 */
function getCell(x, y) {
    let cell = document.querySelector(`#cell_${x}_${y}`);
    return cell;
}