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
    document.getElementById("p1").innerHTML = `<img class='icon' src="img/${item1}.png"/>`;
    document.getElementById("p2").innerHTML = `<img class='icon' src="img/${item2}.png"/>`;
    document.getElementById("p3").innerHTML = `<img class='icon' src="img/${item3}.png"/>`;
    
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
    document.getElementById("p4").innerHTML = `<img class='icon' src="img/${item4}.png"/>`;
    document.getElementById("p5").innerHTML = `<img class='icon' src="img/${item5}.png"/>`;
    document.getElementById("p6").innerHTML = `<img class='icon' src="img/${item6}.png"/>`;

    return [
        [item1, item2, item3],
        [item4, item5, item6]
    ]
}

function pseudo_random(s) { // The same S always yields the same board
    var x = Math.sin(s++) * 10000;
    return x - Math.floor(x);
}