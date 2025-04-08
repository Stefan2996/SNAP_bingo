let savedGrid = JSON.parse(localStorage.getItem('bingoGrid'));
let bingoGrid = [["", "", "", "", ""],
                   ["", "", "", "", ""],
                   ["", "", "", "", ""],
                   ["", "", "", "", ""],
                   ["", "", "", "", ""]];

if (savedGrid && savedGrid.length === 5 && savedGrid[0].length === 5) {
    bingoGrid = savedGrid;
}

const gridTable = document.getElementById("bingo-grid").getElementsByTagName('tbody')[0];
const rowInput = document.getElementById("row");
const colInput = document.getElementById("col");
const valueInput = document.getElementById("value");
const editButton = document.getElementById("edit-button");
const resultDiv = document.getElementById("result");
const saveButton = document.getElementById("save-button");
const clearButton = document.getElementById("clear-button");

function displayGrid() {
    gridTable.innerHTML = "";
    for (let i = 0; i < bingoGrid.length; i++) {
        let row = gridTable.insertRow();
        for (let j = 0; j < bingoGrid[i].length; j++) {
            let cell = row.insertCell();
            cell.textContent = bingoGrid[i][j];
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.onclick = handleCellClick;
            if (bingoGrid[i][j] === 'X') {
                cell.classList.add('selected');
            }
        }
    }
}

function handleCellClick(event) {
    const cell = event.target;
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);

    if (cell.classList.contains('selected')) {
        cell.classList.remove('selected');
        bingoGrid[row][col] = '';
    } else {
        cell.classList.add('selected');
        bingoGrid[row][col] = 'X';
    }

    localStorage.setItem('bingoGrid', JSON.stringify(bingoGrid));
}

function editSlot() {
    const row = parseInt(rowInput.value) - 1; // Уменьшаем на 1
    const col = parseInt(colInput.value) - 1; // Уменьшаем на 1
    const value = valueInput.value;

    if (row >= 0 && row < 5 && col >= 0 && col < 5) {
        bingoGrid[row][col] = value;
        displayGrid();
        localStorage.setItem('bingoGrid', JSON.stringify(bingoGrid));
    } else {
        alert("Недопустимые координаты.");
    }
}

function clearGrid() {
    bingoGrid = [["", "", "", "", ""],
                   ["", "", "", "", ""],
                   ["", "", "", "", ""],
                   ["", "", "", "", ""],
                   ["", "", "", "", ""]];
    displayGrid();
    localStorage.setItem('bingoGrid', JSON.stringify(bingoGrid));
}

function saveResult() {
    html2canvas(document.getElementById("bingo-grid")).then(canvas => {
        const image = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.href = image;
        link.download = 'bingo_result.png';
        link.click();
    });
}

displayGrid();
editButton.addEventListener("click", editSlot);
saveButton.addEventListener("click", saveResult);
clearButton.addEventListener("click", clearGrid);