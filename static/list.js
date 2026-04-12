function load_all_boards(){
    let list_el = this.document.getElementById("list");
    if (Object.entries(this.localStorage).length == 0){
        return 0;
    }

    let new_html = "";
    for (const [key, value] of Object.entries(this.localStorage)){
        let board = JSON.parse(value)
        let correct = 0;
        for (x = 1; x < 10; x++){
            if (board[`a${x}`] != null){
                correct += 1;
            }
        }
        let tries = board.tries + " guesses / " + correct + " correct"
        if (board.tries > 0 || correct > 0){
            if (key.length == 8){   // daily puzzle
                let day = key.slice(0, 4) + "/" + key.slice(4,6) + "/" + key.slice(6);
                new_html +=`
                <a href="/random?id=${key}">
                <span class="list-color-${correct}">Daily Puzzle ${day} (${tries})</span>
                </a>`
            }
            else{    // random puzzle
                new_html +=`
                <a href="/random?id=${key}">
                <span class="list-color-${correct}">Random Puzzle #${key} (${tries})</span>
                </a>`
            }
        }
        

    }
    if (new_html != ""){
        list_el.style.display = "block";
        list_el.innerHTML = new_html;
    }
    
}