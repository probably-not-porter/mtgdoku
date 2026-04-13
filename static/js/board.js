async function on_board_load(id) {
    let board = load_board(id)
    save_board(id,board)

    console.log("board loading...");
    let answer_elems = document.querySelectorAll(".grid-a");
    
    const fetchPromises = Array.from(answer_elems).map(async (elem, idx) => {
        if (board[elem.id] != null){
            elem.innerHTML = `
                <div style='width:100%; height: 100%; background-size: cover; background-image: url(${board[elem.id].image_uris.art_crop})'>
                </div>
            `;
        }else{
            await new Promise(r => setTimeout(r, idx * 150)); 
            let q1 = toJSON(elem.getAttribute('data-1'));
            let q2 = toJSON(elem.getAttribute('data-2'));
            const data = await check_possible_answers([q1, q2]);
            const count = data.total_cards;
            elem.innerHTML = `
                <br>${count ?? 0} card(s)<br><br>
                <a onclick="answer('${q1.cat}', '${q1.value}','${q2.cat}', '${q2.value}', '${elem.id}')">Answer</a>
            `;
        }
        
    });

    await Promise.all(fetchPromises);
    console.log("All elements loaded.");
}

async function check_possible_answers(params) {
    let query = params.map(p => {
        const prefix = p.cat === "color" ? "c" : (p.cat === "cmc" ? "cmc" : (p.cat === "name" ? "name" : "t"));
        return `${prefix}:${p.value.toLowerCase()}`;
    }).join(' ');
    const url = `https://api.scryfall.com/cards/search?q=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url, { headers: { 'Accept': 'application/json' } });
        if (response.status === 429) {
            console.error("Being rate limited. Retrying in 2 seconds...");
            await new Promise(r => setTimeout(r, 2000));
            return check_possible_answers(params);
        }
        if (!response.ok) return 0;
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Scryfall Error:", error);
        return 0;
    }
}
async function fetch_by_name(name) {
    const url = `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(name)}`;

    try {
        const response = await fetch(url, { headers: { 'Accept': 'application/json' } });
        if (response.status === 429) {
            console.error("Being rate limited. Retrying in 2 seconds...");
            await new Promise(r => setTimeout(r, 2000));
            return check_answers(params);
        }

        if (!response.ok) return 0;

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Scryfall Error:", error);
        return 0;
    }
}

function toJSON(input_string){
    const validJsonStr = input_string.replace(/'/g, '"');
    const obj = JSON.parse(validJsonStr);
    return obj
}



function answer(q1_cat, q1_value, q2_cat, q2_value,id){
    var search_el = document.getElementById("searchbar")

    // Store some data on the searchbar
    search_el.dataset.q1_cat = q1_cat;
    search_el.dataset.q2_cat = q2_cat;
    search_el.dataset.q1_value = q1_value;
    search_el.dataset.q2_value = q2_value;
    search_el.dataset.q_target = id;

    document.getElementById("answer-input").style.display = "block";
    document.getElementById("puzzle").style.display = "none";

    let img_elem = document.getElementById("q1q2_imgs");

    img_elem.innerHTML = "";
    if (q1_cat == "type"){      // Construct specific image 1
        img_elem.innerHTML += `
        <div class='img-container grid-item'>
        <img class='icon' src="/static/img/${q1_value}.png" />
        </div>`;
    }
    else if (q1_cat == "color" || q1_cat == "cmc"){
        img_elem.innerHTML += `<div class='img-container grid-item'>
        <img class='icon ' src="/static/img/tile.png" />
        <div class="label">
        <img style="width:50%" src="https://svgs.scryfall.io/card-symbols/${q1_value}.svg" />
        </div>
        </div>`;
    }
    else{
        img_elem.innerHTML += `<div class='img-container grid-item'>
        <img class='icon' src="/static/img/tile.png" />
        <div class="label">${q1_value}</div>
        </div>`;
    }
    if (q2_cat == "type"){      // Construct specific image 2
        img_elem.innerHTML += `
        <div class='img-container grid-item'>
        <img class='icon' src="/static/img/${q2_value}.png" />
        </div>`;
    }
    else if (q2_cat == "color" || q2_cat == "cmc"){
        img_elem.innerHTML += `<div class='img-container grid-item'>
        <img class='icon ' src="/static/img/tile.png" />
        <div class="label"><img style="width:50%" 
            src="https://svgs.scryfall.io/card-symbols/${q2_value}.svg" />
        </div>
        </div>`;
    }
    else{
        img_elem.innerHTML += `<div class='img-container grid-item'>
        <img class='icon' src="/static/img/tile.png" />
        <div class="label">${q2_value}</div>
        </div>`;
    }
    document.getElementById("question").innerHTML = `
    What cards are both <strong><u>${q1_value}</u></strong> (${q1_cat}) and <strong><u>${q2_value}</u></strong> (${q2_cat})?`
}
function exist_answer_screen(){
    document.getElementById("answer-input").style.display = "none";
    document.getElementById("puzzle").style.display = "grid";
}
async function return_to_puzzle(){
    var search_el = document.getElementById("searchbar");
    params = [
        {cat: search_el.dataset.q1_cat, value: search_el.dataset.q1_value},
        {cat: search_el.dataset.q2_cat, value: search_el.dataset.q2_value},
    ]


    data = await fetch_by_name(search_el.value)
    if (data != 0){
        // Reset for next time
        search_el.value = "";

        // Load board ID
        let id = document.getElementById(search_el.dataset.q_target).dataset.board;
        

        // Reset to board layout
        document.getElementById("answer-input").style.display = "none";
        document.getElementById("puzzle").style.display = "grid";

        for (const param of params) {
            if (param.cat == "type" || param.cat == "subtype"){
                if ( !data.type_line.toLowerCase().includes(param.value.toLowerCase()) ){
                    console.log(`${param.value} not in ${data.type_line}`);
                    let board = load_board(id);
                    board.tries += 1;
                    save_board(id,board);
                    return 0;
                }
            }
            if (param.cat == "cmc"){
                if (Number(data.cmc) != Number(param.value)){
                    console.log(`${param.value} not equal to ${data.cmc}`);
                    let board = load_board(id);
                    board.tries += 1;
                    save_board(id,board);
                    return 0;
                }
            }
            if (param.cat == "color"){
                if ( !data.color_identity.includes(param.value) ){
                    console.log(`${param.value} not in ${data.color_identity}`);
                    let board = load_board(id);
                    board.tries += 1;
                    save_board(id,board);
                    return 0;
                }
            }
        }
        let board = load_board(id);
        board[search_el.dataset.q_target] = data;
        board.tries += 1;
        save_board(id,board);
        

    }else{
        // Allow a retry for typos
        alert("That's not a MtG card...");
    }
}

async function auto(v){
    const response = await fetch(`https://api.scryfall.com/cards/autocomplete?q=${v}`);
    const data = await response.json();
    var suggestion_el = document.getElementById("suggestions");
    suggestion_el.innerHTML = "";
    for (const name of data.data) {
        suggestion_el.innerHTML += `<option value="${name}">${name}</option>`;
    }
}

function save_board(id,board){
    if (board != null){
        localStorage.setItem(id, JSON.stringify(board));
    }
    else{
        console.warn("Tried to set nonexistant data");
    }
    update_stats(board)
}
function load_board(id){
    var board = JSON.parse(localStorage.getItem(id));
    if (board == null){
        console.log("Creating new save state.");
        let state = {
            a1: null,
            a2: null,
            a3: null,
            a4: null,
            a5: null,
            a6: null,
            a7: null,
            a8: null,
            a9: null,
            tries: 0,
        }
        localStorage.setItem(id, JSON.stringify(state));
        board = state;
    }
    else{
        console.log("Loading existing save state.");
    }
    return board;
}
function toggle_stats(){
    let full_el = document.getElementById("stats_full");
    let short_el = document.getElementById("stats_short");
    let stat_button = document.getElementById("stat_button");

    if (full_el.style.display == "flex"){
        full_el.style.display = "none";
        short_el.style.display = "inline-block";
        stat_button.innerHTML = "[MORE STATS]";
    }
    else{
        full_el.style.display = "flex";
        short_el.style.display = "none";
        stat_button.innerHTML = "[LESS STATS]";
    }
}
function update_stats(board){
    console.log("Update stats");
    let total_edhrec_score = 0;
    let format_html = "";
    let edhrec_html = "";
    formats = {
        alchemy: 0, brawl: 0, commander: 0,
        duel: 0,future: 0,gladiator: 0,
        historic: 0,legacy: 0,modern: 0,
        oathbreaker: 0,oldschool: 0,pauper: 0,
        paupercommander: 0,penny: 0,pioneer: 0,
        predh: 0,premodern: 0,standard: 0,
        standardbrawl: 0, timeless: 0, vintage: 0
    }
    let correct = 0;
    for (x = 1; x < 10; x++){
        if (board[`a${x}`] != null){
            console.log(board[`a${x}`])
            correct += 1;
            let card_score = board[`a${x}`].edhrec_rank;
            let card_name = board[`a${x}`].name;
            total_edhrec_score += card_score;
            edhrec_html += `<tr>
                <td>${card_name}</td>
                <td>${card_score}</td>
            </tr>`

            for (item in board[`a${x}`].legalities){
                if (board[`a${x}`].legalities[item] == "legal"){
                    formats[item] += 1
                }
            }
        }
    }
    edhrec_html += `
    <tr>
        <td><strong class='color-good'>TOTAL</strong></td>
        <td>${total_edhrec_score}</td>
    </tr>
    <tr>
        <td><strong class='color-good'>AVERAGE</strong></td>
        <td>${(total_edhrec_score / correct).toFixed(2)}</td>
    </tr>`;

    let legal_formats = 0;
    let total_formats = 0;
    for (item in formats){
        if (formats[item] == correct){
            legal_formats += 1;
            format_html += `<p class='format color-good'>${item}</p>`;
        }else{
            format_html += `<p class='format color-bad'>${item}</p>`;
        }
        total_formats += 1;
    }

    document.getElementById("stats_short").innerHTML = ` 
    Tries: (${board.tries}/<span class='color-good'>${correct}</span>/<span class='color-bad'>${board.tries - correct}</span>)
    Format: ${legal_formats}/${total_formats}, 
    EDHRec: ${total_edhrec_score}
    `;

    document.getElementById("stats_full").innerHTML = `
    <div class='stat_block'>
        <u><strong>Guesses</strong></u><br>
        <ul>
            <li>${board.tries} total cards guessed.</li>
            <li class='color-good'>${correct} correct guesses.</li>
            <li class='color-bad'>${board.tries - correct} incorrect guesses.</li>
            <li>${(correct / board.tries * 100).toFixed(2)}% accuracy rate.</li>
        </ul>
    </div>
    <div class='stat_block'>
        <u><strong>Formats</strong></u><br>
        <br>
        ${format_html}
    </div>
    <div class='stat_block'>
        <u><strong>EDHRec Scores</strong></u><br>
        <br>
         <table>
            ${edhrec_html}
        </table> 
        
    </div>
    `;
}

