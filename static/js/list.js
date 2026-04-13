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
                </a><br>`
            }
            else{    // random puzzle
                new_html +=`
                <a href="/random?id=${key}">
                <span class="list-color-${correct}">Random Puzzle #${key} (${tries})</span>
                </a><br>`
            }
        }
        

    }
    if (new_html != ""){
        console.log("replace html")
        list_el.innerHTML = new_html;
    }
    
}

function clear_storage(){
    if (window.confirm("Are you sure you want to delete your saved games? (Only affects this device)")) {
        console.log("Deleting local storage...");
        localStorage.clear();
        location.reload();
    } else {
        console.log("Nothing deleted.");
    }
}

function exportLocalStorage() {
  const data = JSON.stringify(localStorage, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.href = url;
  link.download = `mtgdoku-save-${new Date().toISOString().slice(0,10)}.json`;
  link.click();
  
  URL.revokeObjectURL(url);
}

function importLocalStorage() {
    if (window.confirm("This will replace any currently saved games, are you sure you want to continue? (Only affects this device)")) {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';

        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                localStorage.clear();

                Object.keys(data).forEach(key => {
                localStorage.setItem(key, data[key]);
                });

                console.log("Import Successful");
                location.reload(); 
            } catch (err) {
                alert("Error: Invalid JSON file.");
            }
            };
            reader.readAsText(file);
        };
        input.click();
    } else {
        console.log("Nothing deleted.");
    }

}