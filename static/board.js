console.log("board loading...")
async function on_board_load(){

    let answer_elems = document.querySelectorAll(".grid-a")
    for (let idx = 0; idx < answer_elems.length; idx++){
        let elem = answer_elems[idx];
        let answers = await check_answers([toJSON(elem.getAttribute('data-1')),toJSON(elem.getAttribute('data-2'))])
        elem.innerHTML = `<br>
            ${answers} card(s)<br><br>
            <a onclick='select()'>Answer</a>
        `;
    }
}

function toJSON(input_string){
    const validJsonStr = input_string.replace(/'/g, '"');
    const obj = JSON.parse(validJsonStr);
    return obj
}

async function check_answers(params){
    var query = '';
    for (var idx = 0; idx < params.length; idx++){
        let param = params[idx];
        if (param.cat == "color"){
            query += `c:${param.value.toLowerCase()} `;
        }
        else if (param.cat == "type" || param.cat == "subtype"){
            query += `t:${param.value.toLowerCase()} `;
        }
        else if (param.cat == "cmc"){
            query += `cmc:${param.value.toLowerCase()} `;
        }
    }
    const url = `https://api.scryfall.com/cards/search?q=${encodeURIComponent(query)}`;
    try {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json'
            }
        });
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.total_cards;

    } catch (error) {
        console.error("Could not fetch data from Scryfall:", error);
    }
}