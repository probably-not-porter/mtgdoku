async function auto(v){
    const response = await fetch(`https://api.scryfall.com/cards/autocomplete?q=${v}`);
    const data = await response.json();
    var suggestion_el = document.getElementById("suggestions");
    suggestion_el.innerHTML = "";
    for (const name of data.data) {
        suggestion_el.innerHTML += `<option value="${name}">${name}</option>`;
    }
}