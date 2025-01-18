async function load_board_state() {
    let id = window.location.href.split("?").pop();
    let template_board = {
        tries: 0,
        answer_data: [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ]
    };

    let current_data = localStorage.getItem(id);
    if (current_data == null) {
        console.log("No saved data, creating...");
        // Convert the object to a JSON string before storing it in localStorage
        localStorage.setItem(id, JSON.stringify(template_board));
        current_data = template_board; // Use the newly created board
    } else {
        // Parse the JSON string back into an object
        current_data = JSON.parse(current_data);
    }

    console.dir(current_data); // Should display the object properly
    return current_data; // Return the object, not the string
}


async function set_board_state(val){
    let id = window.location.href.split("?").pop();
    let current_data = localStorage.getItem(id);
    if (current_data != null){
        localStorage.setItem(id, JSON.stringify(val));
    }
    else{
        console.warn("Tried to set nonexistant data")
    }
}
async function refill_board_state(){
    let boardstate = await load_board_state();

    for (x = 0; x < 3; x++){
        for (y = 0; y < 3; y++){
            if (boardstate.answer_data[y][x] != null){
                let data = boardstate.answer_data[y][x]
                document.getElementById(`a${ parseInt(x) + ( parseInt(y)*3 ) + 1 }`).classList.add("correct");
                document.getElementById(`a${ parseInt(x) + ( parseInt(y)*3 ) + 1 }`).innerHTML = data.name;
                document.getElementById(`a${ parseInt(x) + ( parseInt(y)*3 ) + 1 }`).style.backgroundImage = `url("${data.image_uris.art_crop}")`;
            }
        }
    }

}