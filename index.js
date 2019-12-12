const PLAYER_X = 'X';
const PLAYER_O = 'O';

const grid = [];
const GRID_LENGTH = 3;
let turn = PLAYER_X;

function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 7) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    let newValue = getValue();
    grid[colIdx][rowIdx] = newValue;
    renderMainGrid();
    addClickHandlers();
    checkResult();
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

function getValue() {
    let val;
    if (turn === PLAYER_X) {
        val = 1;
        turn = PLAYER_O;
    } else {
        val = 7;
        turn = PLAYER_X;
    }
    return val;
}

function checkResult() {
    let winner;
    winner = checkRowSum();
    winner = checkColSum();
    winner = checkCrossSum();

    if (winner) {
        switch (winner) {
            case PLAYER_X:
                alert('Cross WIN!!');
                break;
            case PLAYER_O:
                alert('Circle WIN!!');
                break;
        }
    }
}

function checkCrossSum() {
    if(grid[0][0] + grid[1][1] + grid[2][2] === 3)
        return PLAYER_X;
    else if(grid[0][0] + grid[1][1] + grid[2][2] === 21)
        return PLAYER_O;

    if(grid[2][0] + grid[1][1] + grid[0][2] === 3)
        return PLAYER_X;
    else if(grid[2][0] + grid[1][1] + grid[0][2] === 21)
        return PLAYER_O;
}

function checkRowSum() {
    for(var i = 0; i < GRID_LENGTH; i++){
        var rowSum = 0;
        for(var j = 0; j < GRID_LENGTH; j++){
            rowSum += grid[i][j];
        }
        if(rowSum === 3)
            return PLAYER_X;
        else if(rowSum === 21)
            return PLAYER_O;
    }
}

function checkColSum() {
    for(var i = 0; i < GRID_LENGTH; i++){
        var colSum = 0;
        for(var j = 0; j < GRID_LENGTH; j++){
            colSum += grid[j][i];
        }
        if(colSum === 3)
            return PLAYER_X;
        else if(colSum === 21)
            return PLAYER_O;
    }
}

initializeGrid();
renderMainGrid();
addClickHandlers();
