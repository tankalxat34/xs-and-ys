/*
Game "Crosses and Zeros"

(c) tankalxat34
MIT License
*/

const QUERY = new URLSearchParams(new URL(location.href).search)

if (new Number(QUERY.get("language")).valueOf() === 0) {
    var lang = {
        title:          "Крестики нолики",
        description:    "Популярная игра \"Крестики нолики\" для двух человек. Находится в разработке. По умолчанию первый ход делает Х.",
        nextSymbol:     "Следующий символ - ",
        clearTable:     "Очистить таблицу",
        playAgain:      "Играть заново!",
        winnedSymbol:   " победил!"
    }
} else {
    var lang = {
        title:          "X's and Z's game",
        description:    "This is a math model of popular game \"Zeros and Crosses\". By default your symbol is \"X\"",
        nextSymbol:     "Next symbol is ",
        clearTable:     "Clear table",
        playAgain:      "Play again!",
        winnedSymbol:   " is winned!"
    }
}

for (let i = 0; i < document.body.childNodes.length; i++) {
    if (document.body.childNodes[i].id && document.body.childNodes[i].id.includes("lang-")) {
        document.body.childNodes[i].innerText = lang[document.body.childNodes[i].id.replace("lang-", "")]
    }
}


const USER_SYMBOL = "X"
const ENEMY_SYMBOL = "0"
const USER_TABLE_VALUE = 1
const ENEMY_TABLE_VALUE = 2

var counterMoves = 0

var table = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]


function showWinner(value_in_table = USER_TABLE_VALUE) {
    if (value_in_table === USER_TABLE_VALUE) {
        document.getElementById("inf-text").innerHTML = "<b>X</b>" + lang.winnedSymbol
        document.getElementById("inf").classList.add("win")
    } else if (value_in_table === ENEMY_TABLE_VALUE) {
        document.getElementById("inf-text").innerHTML = "<b>0</b>" + lang.winnedSymbol
        document.getElementById("inf").classList.add("win")
    }
    document.getElementById("lang-clearTable").innerText = lang.playAgain
}


function makeMove(row, column, symbol = null) {
    /* 
    Make a move 
    */
    if (symbol == USER_SYMBOL) {
        value_in_table = USER_TABLE_VALUE
    } else if (symbol == ENEMY_SYMBOL) {
        value_in_table = ENEMY_TABLE_VALUE
    } else if (symbol === null) {
        if (counterMoves % 2 === 0) {
            value_in_table = USER_TABLE_VALUE
            symbol = USER_SYMBOL
        } else {
            value_in_table = ENEMY_TABLE_VALUE
            symbol = ENEMY_SYMBOL
        }
    }

    if (table[row][column] === null && table[row][column] !== USER_TABLE_VALUE && table[row][column] !== ENEMY_TABLE_VALUE) {
        document.getElementById(`cell-${row}-${column}`).innerText = symbol
        table[row][column] = value_in_table
        checkToWin(value_in_table)
        counterMoves++
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

function changeLabelNextSymbol() {
    /*
    Auto changing symbol on label "next symbol is"
    */
    if (counterMoves % 2 === 0) {
        document.getElementById("next-symbol").innerText = USER_SYMBOL
    } else {
        document.getElementById("next-symbol").innerText = ENEMY_SYMBOL
    }
}

function clearField() {
    /*
    Clear gamefield
    */
    table = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]

    for (let row = 0; row < 3; row++) {
        for (let column = 0; column < 3; column++) {
            document.getElementById(`cell-${row}-${column}`).innerText = new String()
        }
    }

    counterMoves = 0
    changeLabelNextSymbol()

    document.getElementById("inf-text").innerHTML = new String()
    document.getElementById("inf").classList = new String()
    document.getElementById("lang-clearTable").innerText = lang.clearTable
    document.getElementById("lang-nextSymbol").innerText = lang.nextSymbol
    
    document.getElementById("next-symbol").innerText = "X"
}

/* ********************** */

document.oncontextmenu = () => {return false}
// document.getElementById("btn-clear").addEventListener("click", () => location.reload())
document.getElementById("lang-clearTable").addEventListener("click", clearField)

for (let row = 0; row < 3; row++) {
    for (let column = 0; column < 3; column++) {
        document.getElementById(`cell-${row}-${column}`).addEventListener("click", () => {
            makeMove(row, column)
        })
    }
}

/* Game logic */

document.getElementById("gamefield").addEventListener("click", () => {
    /* Analyze to make automaticly move on field */

    // auto changing symbol on label "next symbol is"
    changeLabelNextSymbol()

    // choice cell to make move
    
})

clearField()