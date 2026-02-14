// ============ SETTINGS AND TWEAKS =============== //

// Potential Labels
const colors = ["W", "U", "B", "R", "G"];
const cmc = ['c0', 'c1', 'c2', 'c3', 'c4', 'c0', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10'];
const power = ['p0', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10'];
const toughness = ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7', 't8', 't9', 't10'];
const types = ["Land", "Creature", "Artifact", "Enchantment", "Planeswalker", "Instant", "Sorcery"];
const subtypes = [
    "Adventure", "Arcane", "Chorus", "Lesson", "Omen", "Trap",      // Spell Types
    "Aura", "Background", "Cartouche", "Case", "Class", "Curse", "Room", "Saga", "Shrine",      // Enchantment Types
    "Advisor", "Aetherborn", "Alien", "Ally", "Angel", "Antelope", "Ape", "Archer", "Archon",           // CREATURE TYPES
    "Armadillo", "Army", "Artificer", "Assassin", "Assembly-Worker", "Astartes", "Atog", "Aurochs", 
    "Avatar", "Azra", "Badger", "Balloon", "Barbarian", "Bard", "Basilisk", "Bat", "Bear", "Beast", 
    "Beaver", "Beeble", "Beholder", "Berserker", "Bird", "Blinkmoth", "Boar", "Bringer", 
    "Brushwagg", "Camarid", "Camel", "Capybara", "Caribou", "Carrier", "Cat", "Centaur", "Child", 
    "Chimera", "Citizen", "Cleric", "Clown", "Cockatrice", "Construct", "Coward", "Coyote", "Crab", 
    "Crocodile", "C’tan", "Custodes", "Cyberman", "Cyclops", "Dalek", "Dauthi", "Demigod", "Demon", 
    "Deserter", "Detective", "Devil", "Dinosaur", "Djinn", "Doctor", "Dog", "Dragon", "Drake", 
    "Dreadnought", "Drone", "Druid", "Dryad", "Dwarf", "Efreet", "Egg", "Elder", "Eldrazi", 
    "Elemental", "Elephant", "Elf", "Elk", "Employee", "Eye", "Faerie", "Ferret", "Fish", 
    "Flagbearer", "Fox", "Fractal", "Frog", "Fungus", "Gamer", "Gargoyle", "Germ", "Giant", "Gith", 
    "Glimmer", "Gnoll", "Gnome", "Goat", "Goblin", "God", "Golem", "Gorgon", "Graveborn", "Gremlin", 
    "Griffin", "Guest", "Hag", "Halfling", "Hamster", "Harpy", "Hellion", "Hippo", "Hippogriff", 
    "Homarid", "Homunculus", "Horror", "Horse", "Human", "Hydra", "Hyena", "Illusion", "Imp", 
    "Incarnation", "Inkling", "Inquisitor", "Insect", "Jackal", "Jellyfish", "Juggernaut", "Kavu", 
    "Kirin", "Kithkin", "Knight", "Kobold", "Kor", "Kraken", "Llama", "Lamia", "Lammasu", "Leech", 
    "Leviathan", "Lhurgoyf", "Licid", "Lizard", "Manticore", "Masticore", "Mercenary", "Merfolk", 
    "Metathran", "Minion", "Minotaur", "Mite", "Mole", "Monger", "Mongoose", "Monk", "Monkey", 
    "Moonfolk", "Mount", "Mouse", "Mutant", "Myr", "Mystic", "Nautilus", "Necron", "Nephilim", 
    "Nightmare", "Nightstalker", "Ninja", "Noble", "Noggle", "Nomad", "Nymph", "Octopus", "Ogre", 
    "Ooze", "Orb", "Orc", "Orgg", "Otter", "Ouphe", "Ox", "Oyster", "Pangolin", "Peasant", "Pegasus", 
    "Pentavite", "Performer", "Pest", "Phelddagrif", "Phoenix", "Phyrexian", "Pilot", "Pincher", 
    "Pirate", "Plant", "Porcupine", "Possum", "Praetor", "Primarch", "Prism", "Processor", "Rabbit", 
    "Raccoon", "Ranger", "Rat", "Rebel", "Reflection", "Rhino", "Rigger", "Robot", "Rogue", "Sable", 
    "Salamander", "Samurai", "Sand", "Saproling", "Satyr", "Scarecrow", "Scientist", "Scion", "Scorpion", 
    "Scout", "Sculpture", "Serf", "Serpent", "Servo", "Shade", "Shaman", "Shapeshifter", "Shark", 
    "Sheep", "Siren", "Skeleton", "Skunk", "Slith", "Sliver", "Sloth", "Slug", "Snail", "Snake", 
    "Soldier", "Soltari", "Spawn", "Specter", "Spellshaper", "Sphinx", "Spider", "Spike", "Spirit", 
    "Splinter", "Sponge", "Squid", "Squirrel", "Starfish", "Surrakar", "Survivor", "Synth", "Tentacle", 
    "Tetravite", "Thalakos", "Thopter", "Thrull", "Tiefling", "Toy", "Treefolk", "Trilobite", 
    "Triskelavite", "Troll", "Turtle", "Tyranid", "Unicorn", "Vampire", "Varmint", "Vedalken", "Volver", 
    "Wall", "Walrus", "Warlock", "Warrior", "Weasel", "Weird", "Werewolf", "Whale", "Wizard", "Wolf", 
    "Wolverine", "Wombat", "Worm", "Wraith", "Wurm", "Yeti", "Zombie", "Zubera"
]

// potential combinations for requirements on the header row/col
let type1 = colors.concat(colors,colors,colors,colors,colors,types,types,types,types,types,types);
let type2 = colors.concat(colors,colors,colors,colors,colors,cmc,cmc,cmc,cmc,cmc,cmc,subtypes);
let question_bank = {}

for (x=0; x<cmc.length; x++){
    question_bank[cmc[x]] = {
        img: `img/${cmc[x]}.png`,
        label: "",
        tooltip: `Any card that has the CMC ${cmc[x]}`
    }
}
for (x=0; x<types.length; x++){
    question_bank[types[x]] = {
        img: `img/${types[x]}.png`,
        label: "",
        tooltip: `Any card with has the supertype ${types[x]}`
    }
}
for (x=0; x<subtypes.length; x++){
    question_bank[subtypes[x]] = {
        img: `img/blank.png`,
        label: `${subtypes[x]}`,
        tooltip: `Any card that has the subtype ${subtypes[x]}`
    }
}
for (x=0; x<colors.length; x++){
    question_bank[colors[x]] = {
        img: `img/${colors[x]}.png`,
        label: "",
        tooltip: `Any card that has a color identity including ${colors[x]}`
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
    
    document.getElementById("p1").innerHTML = `
        <div class='img-container'>
            <img class='icon' title="${question_bank[item1]["tooltip"]}" 
            alt="${question_bank[item1]["tooltip"]}" 
            src="${question_bank[item1]["img"]}" />
            <div class='label'>${question_bank[item1]["label"]}<div>
        </div>`;
    document.getElementById("p2").innerHTML = `
        <div class='img-container'>
            <img class='icon' title="${question_bank[item2]["tooltip"]}" 
            alt="${question_bank[item2]["tooltip"]}" 
            src="${question_bank[item2]["img"]}" />
            <div class='label'>${question_bank[item2]["label"]}<div>
        </div>`;
    document.getElementById("p3").innerHTML = `
        <div class='img-container'>
            <img class='icon' title="${question_bank[item3]["tooltip"]}" 
            alt="${question_bank[item3]["tooltip"]}" 
            src="${question_bank[item3]["img"]}" />
            <div class='label'>${question_bank[item3]["label"]}<div>
        </div>`;

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
    document.getElementById("p4").innerHTML = `
        <div class='img-container'>
            <img class='icon' title="${question_bank[item4]["tooltip"]}" 
            alt="${question_bank[item4]["tooltip"]}" 
            src="${question_bank[item4]["img"]}" />
            <div class='label'>${question_bank[item4]["label"]}<div>
        </div>`;
    document.getElementById("p5").innerHTML = `
        <div class='img-container'>
            <img class='icon' title="${question_bank[item5]["tooltip"]}" 
            alt="${question_bank[item5]["tooltip"]}" 
            src="${question_bank[item5]["img"]}" />
            <div class='label'>${question_bank[item5]["label"]}<div>
        </div>`;
    document.getElementById("p6").innerHTML = `
        <div class='img-container'>
            <img class='icon' title="${question_bank[item6]["tooltip"]}" 
            alt="${question_bank[item6]["tooltip"]}" 
            src="${question_bank[item6]["img"]}" />
            <div class='label'>${question_bank[item6]["label"]}<div>
        </div>`;
    return [
        [item1, item2, item3],
        [item4, item5, item6]
    ]
}

function pseudo_random(s) { // The same S always yields the same board
    var x = Math.sin(s++) * 10000;
    return x - Math.floor(x);
}