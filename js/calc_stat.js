function calc_stat(boardstate) {
    let recrank = 0;
    let formats = {
        standard: true,
        future: true,
        historic: true,
        timeless: true,
        gladiator: true,
        pioneer: true,
        explorer: true,
        modern: true,
        legacy: true,
        pauper: true,
        vintage: true,
        penny: true,
        commander: true,
        oathbreaker: true,
        standardbrawl: true,
        brawl: true,
        alchemy: true,
        paupercommander: true,
        duel: true,
        oldschool: true,
        premodern: true,
        predh: true,
    };
    let correct_tries = 0;
    let edhrec_string = "";
    let formats_string = "";
    for (x = 0; x < 3; x++) {
        for (y = 0; y < 3; y++) {
            if (boardstate.answer_data[y][x] != null) {
                correct_tries += 1;
                recrank += boardstate.answer_data[y][x].edhrec_rank;
                edhrec_string += `${boardstate.answer_data[y][x].name}: ${boardstate.answer_data[y][x].edhrec_rank}, `;
                for (const [key, value] of Object.entries(
                    boardstate.answer_data[y][x].legalities,
                )) {
                    if (value != "legal") {
                        formats[key] = false;
                    }
                }
            }
        }
    }
    document.getElementById("tries").innerText = `Guesses: ${boardstate.tries}`;
    let guess_string = `${correct_tries} correct guesses
      ${boardstate.tries - correct_tries} incorrect guesses`;
    document.getElementById("tries").setAttribute("data-tooltip", guess_string);

    document.getElementById("edhrank").innerText = `EDHRec Sum: ${recrank}`;
    document
        .getElementById("edhrank")
        .setAttribute("data-tooltip", edhrec_string);

    let formatelem = ``;
    let numformats = 0;
    for (const [key, value] of Object.entries(formats)) {
        if (value == true) {
            numformats += 1;
            formats_string += `${key}, `;
        }
    }
    document.getElementById("formats").innerHTML =
        `Legal Formats: ${numformats}/${Object.keys(formats).length}`;
    document
        .getElementById("formats")
        .setAttribute("data-tooltip", formats_string);
}
