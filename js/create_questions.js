// ============ SETTINGS AND TWEAKS =============== //

// Potential Labels
const colors = ["W", "U", "B", "R", "G"];
const cmc = ['c0', 'c1', 'c2', 'c3', 'c4', 'c0', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10'];
const power = ['p0', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10'];
const toughness = ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7', 't8', 't9', 't10'];
const types = ["Land", "Creature", "Artifact", "Enchantment", "Planeswalker", "Instant", "Sorcery"];

// potential combinations for requirements on the header row/col
let type1 = colors.concat(colors,types,types);
let type2 = colors.concat(colors,cmc);
let question_bank = {
    c0: {
        img: "img/c0.png",
        tooltip: "Any card with a CMC of 0"
    },
    c1: {
        img: "img/c1.png",
        tooltip: "Any card with a CMC of 1"
    },
    c2: {
        img: "img/c2.png",
        tooltip: "Any card with a CMC of 2"
    },
    c3: {
        img: "img/c3.png",
        tooltip: "Any card with a CMC of 3"
    },
    c4: {
        img: "img/c4.png",
        tooltip: "Any card with a CMC of 4"
    },
    c5: {
        img: "img/c5.png",
        tooltip: "Any card with a CMC of 5"
    },
    c6: {
        img: "img/c6.png",
        tooltip: "Any card with a CMC of 6"
    },
    c7: {
        img: "img/c7.png",
        tooltip: "Any card with a CMC of 7"
    },
    c8: {
        img: "img/c8.png",
        tooltip: "Any card with a CMC of 8"
    },
    c9: {
        img: "img/c9.png",
        tooltip: "Any card with a CMC of 9"
    },
    c10: {
        img: "img/c10.png",
        tooltip: "Any card with a CMC of 10"
    },
    Creature: {
        img: "img/Creature.png",
        tooltip: "Any card that includes the Creature type"
    },
    Artifact: {
        img: "img/Artifact.png",
        tooltip: "Any card that includes the Artifact type"
    },
    Land: {
        img: "img/Land.png",
        tooltip: "Any card that includes the Land type"
    },
    Instant: {
        img: "img/Instant.png",
        tooltip: "Any card that includes the Instant type"
    },
    Sorcery: {
        img: "img/Sorcery.png",
        tooltip: "Any card that includes the Sorcery type"
    },
    Enchantment: {
        img: "img/Enchantment.png",
        tooltip: "Any card that includes the Enchantment type"
    },
    Planeswalker: {
        img: "img/Planeswalker.png",
        tooltip: "Any card that includes the Planeswalker type"
    },
    W: {
        img: "img/W.png",
        tooltip: "Any card that has a color identity including White"
    },
    U: {
        img: "img/U.png",
        tooltip: "Any card that has a color identity including Blue"
    },
    B: {
        img: "img/B.png",
        tooltip: "Any card that has a color identity including Black"
    },
    R: {
        img: "img/R.png",
        tooltip: "Any card that has a color identity including Red"
    },
    G: {
        img: "img/G.png",
        tooltip: "Any card that has a color identity including Green"
    }
}

// ================================================ //
function normalize_seed(seed) {
    return seed % 1_000_000_000_000; // Keep the seed within a 12-digit range
}

function create_questions(seed){
    seed = normalize_seed(seed);
    // Create first filter row
    let item1 = type1[Math.floor(pseudo_random(seed)*type1.length)];
    let item2 = type1[Math.floor(pseudo_random(seed+1)*type1.length)];
    let item3 = type1[Math.floor(pseudo_random(seed+2)*type1.length)];

    while (item1 == item2 || item2 == item3 || item3 == item1){
        console.log("generate row...", item1, item2, item3, seed);
        item1 = type1[Math.floor(pseudo_random(seed)*type1.length)];
        item2 = type1[Math.floor(pseudo_random(seed+1)*type1.length)];
        item3 = type1[Math.floor(pseudo_random(seed+2)*type1.length)];
        seed += 1;
    }
    
    document.getElementById("p1").innerHTML = `<img class='icon' title="${question_bank[item1]["tooltip"]}" alt="${question_bank[item1]["tooltip"]}" src="${question_bank[item1]["img"]}"/>`;
    document.getElementById("p2").innerHTML = `<img class='icon' title="${question_bank[item2]["tooltip"]}" alt="${question_bank[item2]["tooltip"]}" src="${question_bank[item2]["img"]}"/>`;
    document.getElementById("p3").innerHTML = `<img class='icon' title="${question_bank[item3]["tooltip"]}" alt="${question_bank[item3]["tooltip"]}" src="${question_bank[item3]["img"]}"/>`;
    
    // create second filter row
    let item4 = type2[Math.floor(pseudo_random(seed+2)*type2.length)];
    let item5 = type2[Math.floor(pseudo_random(seed+3)*type2.length)];
    let item6 = type2[Math.floor(pseudo_random(seed+4)*type2.length)];

    while (item4 == item5 || item5 == item6 ||item6 == item4){
        console.log("generate col...", item4, item5, item6, seed);
        item4 = type2[Math.floor(pseudo_random(seed+2)*type2.length)];
        item5 = type2[Math.floor(pseudo_random(seed+3)*type2.length)];
        item6 = type2[Math.floor(pseudo_random(seed+4)*type2.length)];
        seed += 1;
    }
    document.getElementById("p4").innerHTML = `<img class='icon' title="${question_bank[item4]["tooltip"]}" alt="${question_bank[item4]["tooltip"]}" src="${question_bank[item4]["img"]}"/>`;
    document.getElementById("p5").innerHTML = `<img class='icon' title="${question_bank[item5]["tooltip"]}" alt="${question_bank[item5]["tooltip"]}" src="${question_bank[item5]["img"]}"/>`;
    document.getElementById("p6").innerHTML = `<img class='icon' title="${question_bank[item6]["tooltip"]}" alt="${question_bank[item6]["tooltip"]}" src="${question_bank[item6]["img"]}"/>`;

    return [
        [item1, item2, item3],
        [item4, item5, item6]
    ]
}

function pseudo_random(s) { // The same S always yields the same board
    var x = Math.sin(s++) * 10000;
    return x - Math.floor(x);
}