
const USER_SYMBOL = "X"
const ENEMY_SYMBOL = "0"
const USER_TABLE_VALUE = 1
const ENEMY_TABLE_VALUE = 2


var table = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]


function getIndexes(value_in_table = USER_TABLE_VALUE) {
    /* 
    Return all indexes where USER_SYMBOL or ENEMY_SYMBOL is standing.

    */
    let result = new Array()
    for (let i = 0; i < 9; i++) {
        if (table[i] == value_in_table) result.push(i)
    }
    return result
}

function showWinner(value_in_table = USER_TABLE_VALUE) {
    if (value_in_table === USER_TABLE_VALUE) {
        document.getElementById("inf-text").innerText = "You winned!"
        document.getElementById("inf").classList.add("win")
    } else {
        document.getElementById("inf-text").innerText = "You losed!"
        document.getElementById("inf").classList.add("lose")
    }        
}


function makeMove(row, column, symbol) {
    /* 
    Make a move 
    */
    if (symbol == USER_SYMBOL) {
        value_in_table = USER_TABLE_VALUE
    } else if (symbol == ENEMY_SYMBOL) {
        value_in_table = ENEMY_TABLE_VALUE
    }

    if (table[row][column] === null && table[row][column] !== USER_TABLE_VALUE && table[row][column] !== ENEMY_TABLE_VALUE) {
        document.getElementById(`cell-${row}-${column}`).innerText = symbol
        table[row][column] = value_in_table
        checkToWin(value_in_table)
    }
}

function TransMatrix(A)
{
    var m = A.length, n = A[0].length, AT = [];
    for (var i = 0; i < n; i++)
     { 
        AT[ i ] = [];
        for (var j = 0; j < m; j++) AT[i][j] = A[j][i];
     }
    return AT;
}

function checkToWin(value_in_table = USER_TABLE_VALUE) {
    /*
    Return the player value in table that is winner in this game
    */
    if ((table[0][0] === table[1][1] && table[1][1] === table[2][2] && table[0][0] === value_in_table) || 
        (table[0][2] === table[1][1] && table[1][1] === table[2][0] && table[0][2] === value_in_table)) {
        showWinner(value_in_table)      
    } else if ((new Set(table[0]).size === 1) && table[0][0] === value_in_table) {
        showWinner(value_in_table)
    } else if ((new Set(table[1]).size === 1) && table[1][0] === value_in_table) {
        showWinner(value_in_table)
    } else if ((new Set(table[2]).size === 1) && table[2][0] === value_in_table) {
        showWinner(value_in_table)

    } else if ((new Set(TransMatrix(table)[0]).size === 1) && TransMatrix(table)[0][0] === value_in_table) {
        showWinner(value_in_table)
    } else if ((new Set(TransMatrix(table)[1]).size === 1) && TransMatrix(table)[1][0] === value_in_table) {
        showWinner(value_in_table)
    } else if ((new Set(TransMatrix(table)[2]).size === 1) && TransMatrix(table)[2][0] === value_in_table) {
        showWinner(value_in_table)
    } 
}

/* ********************** */

document.getElementById("btn-clear").addEventListener("click", () => location.reload())
// document.getElementById("btn-clear").addEventListener("click", clearTheTable)

for (let row = 0; row < 3; row++) {
    for (let column = 0; column < 3; column++) {
        document.getElementById(`cell-${row}-${column}`).addEventListener("click", () => {
            makeMove(row, column, USER_SYMBOL)
        })
    }
}

for (let row = 0; row < 3; row++) {
    for (let column = 0; column < 3; column++) {
        document.getElementById(`cell-${row}-${column}`).addEventListener("contextmenu", () => {
            makeMove(row, column, ENEMY_SYMBOL)
        })
    }
}

document.getElementById("gamefield").addEventListener("click", checkToWin)
/* Game logic */
