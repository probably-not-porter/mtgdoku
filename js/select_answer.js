let selector_1 = null;
let selector_2 = null;

function select(q1, q2){
    let hint = "(";
    if (q1.length == 1){ hint += `${parseColor(q1)}` }                  // header row if COLOR
    else if (q1.length < 4){ hint += `${q1.replace("c","")}cmc` }      // header row if CMC
    else { hint += `${q1.toLowerCase()}` }                              // header row if TYPE
    document.getElementById("card_selector_img_1").src = `icons/${q1}.svg`;
    if (q1 != q2){
        document.getElementById("card_selector_img_2").src = `icons/${q2}.svg`;
        document.getElementById("card_selector_img_2").style.display = "inline-block";
        document.getElementById("card_selector_plus").style.display = "inline-block";
        hint += " and ";
        if (q2.length == 1){ hint += `${parseColor(q2)}` }                  // header row if COLOR
        else if (q2.length < 4){ hint += `${q2.replace("c","")} CMC` }      // header row if CMC
        else { hint += `${q2.toLowerCase()}` }                              // header row if TYPE
    }else{
        document.getElementById("card_selector_img_2").style.display = "none";
        document.getElementById("card_selector_plus").style.display = "none";
    }
    document.getElementById("card_selector_hint").innerText = hint + ")";
}

function parseColor(n){
    if (n.toLowerCase() == "w") { return "White"}
    if (n.toLowerCase() == "u") { return "Blue"}
    if (n.toLowerCase() == "b") { return "Black"}
    if (n.toLowerCase() == "r") { return "Red"}
    if (n.toLowerCase() == "g") { return "Green"}
}

function searchcard(v){
    console.log(v);
}