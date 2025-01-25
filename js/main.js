async function load_board(){
    var question_key = null;
    let seed = parseInt(window.location.href.split("?").pop());

    if (isNumeric(seed) == false){
        alert("Not a valid seed!");
        window.location = window.location.href.split('?')[0];
        return null;
        
    }
    while (await test_questions(question_key) == false){
        question_key = await create_questions(seed);
        seed += 1;
    }
    document.getElementById("puzzle").style.display = 'grid';
    document.getElementById("loader").style.display = "none";
}

function isNumeric(value) {
    return /^-?\d+$/.test(value);
}

window.addEventListener('load', async function() {
    if (window.location.href.split("?").length != 1){
        let boardstate = await load_board_state();
        console.log(boardstate)
        document.getElementById("tries").innerText = `Guesses: ${boardstate.tries}`
        document.getElementById("loader").style.display = "block";
        await load_board();
        await refill_board_state();
    }else{
        // home
        this.document.getElementById("list").style.display = "block";
        this.document.getElementById("list").innerHTML = "";
        for (const [key, value] of Object.entries(this.localStorage)){
            if (isJsonString(value)){
                let data = JSON.parse(value);
                let complete = 0;
                for (x = 0; x < 3; x++) {
                    for (y = 0;y < 3; y++){
                        if (data.answer_data[y][x] != null){
                            complete += 1;
                        }
                    }
                }
                if (complete > 0){
                    this.document.getElementById("list").innerHTML += `<span onclick='load_from_seed(${key})' class='list-color-${complete}'>Puzzle #${key} - ${complete}/9</span><br>`;
                }
            }
        }
    }
})

function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}