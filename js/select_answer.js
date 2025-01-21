
function select(q1, q2, x, y){
    document.getElementById("card_selector").style.display = "block";
    document.getElementById("searchbar").dataset.x = x;
    document.getElementById("searchbar").dataset.y = y;
    document.getElementById("searchbar").dataset.q1 = q1;
    document.getElementById("searchbar").dataset.q2 = q2;

    let hint = "(";
    if (q1.length == 1){ hint += `${parseColor(q1)}` }                  // header row if COLOR
    else if (q1.length < 4){ hint += `${q1.replace("c","")}cmc` }      // header row if CMC
    else { hint += `${q1.toLowerCase()}` }                              // header row if TYPE
    document.getElementById("card_selector_img_1").src = `img/${q1}.png`;
    if (q1 != q2){
        document.getElementById("card_selector_img_2").src = `img/${q2}.png`;
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

