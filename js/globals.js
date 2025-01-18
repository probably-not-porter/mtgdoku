var TRIES = 0
document.getElementById("tries").innerText = `Guesses: ${TRIES}`

// Might not need this
CURRENT_DATA = {
    answer_row: [null,null,null],
    answer_col: [null,null,null],
    question_data: [
        [null,null,null],
        [null,null,null],
        [null,null,null]
    ]
}