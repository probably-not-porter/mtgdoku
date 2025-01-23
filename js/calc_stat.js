function calc_stat(boardstate){
    console.log(boardstate);
    document.getElementById("tries").innerText = `Guesses: ${boardstate.tries}`;
}