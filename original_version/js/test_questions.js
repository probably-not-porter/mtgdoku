const elems = ["a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9"];

const delay = (ms) => new Promise(res => setTimeout(res, ms));

async function test_questions(q,a) {
    if (!q) return false;

    let loaded = 0;
    const total = 9;

    const fetches = [];

    for (let x = 0; x < 3; x++) {
        const q1 = q[0][x];
        for (let y = 0; y < 3; y++) {
            const q2 = q[1][y];
            let query = "";

            if (q1.length === 1) query += `c%3A${q1.toLowerCase()}`;
            else if (q1[0] == "c") query += `mv%3D${q1.replace("c", "")}`;
            else query += `t%3A${q1.toLowerCase()}`;

            query += "+";

            if (q2.length === 1) query += `c%3A${q2.toLowerCase()}`;
            else if (q2[0] == "c") query += `mv%3D${q2.replace("c", "")}`;
            else query += `t%3A${q2.toLowerCase()}`;

            const url = `https://api.scryfall.com/cards/search?order=cmc&q=${query}`;
            console.info(url);

            // Create fetch Promise that updates progress
            await delay(100);
            const fetchPromise = fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    if (!data || data.total_cards === undefined){
                        document.getElementById("loader").innerHTML =
                        `Checking solutions...<br><br>#${a} [${"▓".repeat(loaded)}X${"░".repeat(total-loaded-1)}]<br><br>(This can take a while)`;
                        return false
                    }
                    else{
                        document.getElementById("loader").innerHTML =
                        `Checking solutions...<br><br>#${a} [${"▓".repeat(loaded)}${"░".repeat(total-loaded)}]<br><br>(This can take a while)`;
                    }

                    // Update progress here
                    loaded++;
                    

                    return { x, y, q1, q2, data };
                })
                .catch((err) => null);

            fetches.push(fetchPromise);
        }
    }

    const results = await Promise.all(fetches);

    for (const result of results) {
        if (!result) return false; // One or more requests failed or returned invalid data

        const { x, y, q1, q2, data } = result;
        document.getElementById(elems[x + y * 3]).innerHTML = `<br>
            ${data.total_cards}<br><br>
            <button onclick='select("${q1}","${q2}",${x},${y})'>Answer</button>
        `;
    }

    return true;
}
