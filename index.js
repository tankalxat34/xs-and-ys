
const USER_SYMBOL = "X"
const ENEMY_SYMBOL = "0"
const USER_TABLE_VALUE = true
const ENEMY_TABLE_VALUE = false


var table = [
    null, null, null,
    null, null, null,
    null, null, null
]


function getIndexes(value_in_table = USER_TABLE_VALUE) {
    /* 
    Return all indexes where USER_SYMBOL or ENEMY_SYMBOL is standing.

    Win in this game is a different between this values by 1, 3 or 4
    */
    let result = new Array()
    for (let i = 0; i < 9; i++) {
        if (table[i] == value_in_table) result.push(i)
    }
    return result
}


function makeMove(cell_id, symbol, value_in_table) {
    /* 
    Make a move 
    */
    if (table[cell_id - 1] === null) {
        document.getElementById(`cell-${cell_id}`).innerText = symbol
        table[cell_id - 1] = value_in_table
    }
}

function clearTheTable() {
    /* 
    Clear the table 
    */
    for (let i = 1; i <= 9; i++) {
        document.getElementById(`cell-${i}`).innerText = new String()
        table[i - 1] = null
    }

    document.getElementById("inf-text").innerText = new String()
    document.getElementById("inf").classList = new String()
}

function getDifferenceBetweenIndexes(value_in_table = USER_TABLE_VALUE) {
    /* 
    Return difference between neighboring indexes in Array 
    */
    let tInd = getIndexes(value_in_table)
    let results = new Array()
    
    for (let i = 1; i < 9; i++) {
        let diff = tInd[i] - tInd[i - 1]
        if (diff) results.push(diff)
    }

    return results
}

function checkToWin(value_in_table = USER_TABLE_VALUE) {
    /*
    Return the player value in table that is winner in this game
    */
    let diffArray = getDifferenceBetweenIndexes(value_in_table)
    console.log(diffArray)
    if (diffArray.length === 2 && (diffArray[0] === 1 || diffArray[0] === 2 || diffArray[0] === 3 || diffArray[0] === 4)) return value_in_table
    return undefined
}

function showWinnerText() {
    if (checkToWin(USER_TABLE_VALUE) === USER_TABLE_VALUE) {
        document.getElementById("inf-text").innerText = "You winned!"
        document.getElementById("inf").classList.add("win")
        console.log("you winned!")
    }
    if (checkToWin(ENEMY_TABLE_VALUE) === ENEMY_TABLE_VALUE) {
        document.getElementById("inf-text").innerText = "You losed!"
        document.getElementById("inf").classList.add("lose")
        console.log("you losed!")
    }
}

/* ********************** */

document.getElementById("btn-clear").addEventListener("click", () => location.reload())
// document.getElementById("btn-clear").addEventListener("click", clearTheTable)

for (let i = 1; i <= 9; i++) {
    document.getElementById(`cell-${i}`).addEventListener("click", () => {
        makeMove(i, USER_SYMBOL, true)
        showWinnerText()
    })
}

for (let i = 1; i <= 9; i++) {
    document.getElementById(`cell-${i}`).addEventListener("dblclick", () => {
        makeMove(i, ENEMY_SYMBOL, false)
        showWinnerText()

        // console.log(getIndexes(ENEMY_TABLE_VALUE))
    })
}


/* Game logic */

// document.getElementById("gamefield").addEventListener("click", () => {
//     if (checkToWin() === USER_TABLE_VALUE) {
//         document.getElementById("inf-text").innerText = "You winned!"
//         document.getElementById("inf").classList.add("win")
//     } else if (checkToWin() === ENEMY_TABLE_VALUE) {
//         document.getElementById("inf-text").innerText = "You losed!"
//         document.getElementById("inf").classList.add("lose")
//     }
// })