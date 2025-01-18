async function check_answer(){
    document.getElementById("searchbar").value = "";
    document.getElementById("card_selector").style.display = "none";
    TRIES = TRIES + 1;
    document.getElementById("tries").innerText = `Guesses: ${TRIES}`

    var ans = document.getElementById("searchbar").value;
    var x = document.getElementById("searchbar").dataset.x;
    var y = document.getElementById("searchbar").dataset.y;
    var q1 = document.getElementById("searchbar").dataset.q1;
    var q2 = document.getElementById("searchbar").dataset.q2;

    if (ans == ""){
        fail(x,y);
        return;
    }
    const response = await fetch(`https://api.scryfall.com/cards/named?exact="${ans}"`);
    const data = await response.json();
    
    if (data.code == "not_found"){
        fail(x,y);
        return;
    }
    if (check_criteria(data,q1) && check_criteria(data,q2)){
        success(x,y,data.name,data.image_uris.art_crop);
        return;
    }
    fail(x,y);
    
}

function check_criteria(data,q){
    console.log(q)
    console.log(data.color_identity)
    if (data.color_identity.includes(q)){
        console.log("COLOR MATCH");
        return true
    }
    console.log(data.type_line.split(" "))
    if (data.type_line.split(" ").includes(q)){
        console.log("TYPE MATCH");
        return true
    }
    console.log(`c${data.cmc}`)
    if (`c${data.cmc}` == q){
        console.log("CMC MATCH");
        return true
    }
    return false
}

function fail(x,y){
    console.log("INCORRECT!");
    console.log(`a${ parseInt(x) + ( parseInt(y)*3 ) + 1 }`);
    document.getElementById(`a${ parseInt(x) + ( parseInt(y)*3 ) + 1 }`).classList.remove("incorrect");
    document.getElementById(`a${ parseInt(x) + ( parseInt(y)*3 ) + 1 }`).offsetWidth;
    document.getElementById(`a${ parseInt(x) + ( parseInt(y)*3 ) + 1 }`).classList.add("incorrect");
}
function success(x,y,name,img){
    console.log("CORRECT!!!");
    document.getElementById(`a${ parseInt(x) + ( parseInt(y)*3 ) + 1 }`).classList.add("correct");
    document.getElementById(`a${ parseInt(x) + ( parseInt(y)*3 ) + 1 }`).innerHTML = name;
    document.getElementById(`a${ parseInt(x) + ( parseInt(y)*3 ) + 1 }`).style.backgroundImage = `url("${img}")`;
}