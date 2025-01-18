const elems = ["a1","a2","a3","a4","a5","a6","a7","a8","a9"]

async function test_questions(q){
    if (q == null){ return false } // make sure that there are row/col selections (not null)
    for (x = 0; x < 3; x++){            // item in header ROW
        let q1 = q[0][x];               // header row item X
        for (y = 0; y < 3; y++){        // item in header COL
            let q2 = q[1][y];           // header col item Y
            let query = "";                                                     // start query for scryfall
            if (q1.length == 1){ query += `c%3A${q1.toLowerCase()}` }           // header row if COLOR
            else if (q1.length < 4){ query += `mv%3D${q1.replace("c","")}` }    // header row if CMC
            else { query += `t%3A${q1.toLowerCase()}` }                         // header row if TYPE
            query += "+";                                                       // add separator
            if (q2.length == 1){ query += `c%3A${q2.toLowerCase()}` }           // header col if COLOR
            else if (q2.length < 4){ query += `mv%3D${q2.replace("c","")}` }    // header col if CMC
            else { query += `t%3A${q2.toLowerCase()}` }                         // header col if TYPE
            
            const response = await fetch(`https://api.scryfall.com/cards/search?order=cmc&q=${query}`);
            const data = await response.json();
            //let best = calc_best(data); // TDOD: should refactor this
            if (data.total_cards == undefined){ return false} // check if any row/col pairs have NO possible answers
            else{
                document.getElementById(elems[x + (y*3)]).innerHTML = `
                    ${data.total_cards} card(s)<br>
                    <button onclick='select("${q1}","${q2}",${x},${y})'>Select</button>
                `;
            }
        }
    }
    return true // if nothing has returned false by now, the board is valid.
}

// function calc_best(data){
//     let best_price = 0;
//     let name = "";
//     if (data.data != null){
//         for (const [key, value] of Object.entries(data.data)) {
//             if (value.prices.usd > best_price){
//                 best_price = value.prices.usd;
//                 name = value.name;
//             }
            
//         }
//     }
//     console.log(name, best_price);
    
// }