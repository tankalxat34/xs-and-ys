
for (let i = 1; i <= 9; i++) {
    document.getElementById(`cell-${i}`).addEventListener("click", () => {
        document.getElementById(`cell-${i}`).innerText = "X"
    })
}

