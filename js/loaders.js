function load_random(){
    window.location = window.location.href.split("?")[0] + "?" + Date.now();
}
function load_daily(){
    let day = parseInt(new Date().toJSON().slice(0, 10).replace("-",""));
    window.location = window.location.href.split("?")[0] + "?" + day;
}
function load_from_paste(){
    let input_seed = prompt("Enter a seed", "");
    if (input_seed != "") {
        window.location = window.location.href.split("?")[0] + "?" + input_seed;
    }
    
}