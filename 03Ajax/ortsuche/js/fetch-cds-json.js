(() => {
    "use strict";
    var objAusgabe = document.getElementById('ausgabe');
    fetch('data/cd-catalog.json')
        .then(response => {
            //console.log(response);
            if(!response.ok){
                throw new Error(`Fehler: ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        /* .then((data) => {
            console.log(data);
            data.forEach((objCD) =>{
                console.log(objCD.TITLE)
            });
        }) */
        .then((data) => {
            let strTable = 
                `<table border="1">
                <thead>
                    <tr>
                        <th>LfdNr</th>
                        <th>Title</th>
                        <th>Küstler</th>
                        <th>Land</th>
                        <th>Label</th>
                        <th>Preis</th>
                        <th>Jahr</th>
                    </tr>
                </thead>`;
            for(let x in data) {
                //console.log(data[x].TITLE);
                strTable += 
                    `<tr>
                        <td>${(parseInt(x)+1)}</td>
                        <td>${data[x].TITLE}</td>
                        <td>${data[x].ARTIST}</td>
                        <td>${data[x].COUNTRY}</td>
                        <td>${data[x].COMPANY}</td>
                        <td>${data[x].PRICE}</td>
                        <td>${data[x].YEAR}</td>
                    </tr>`
            }
            strTable += '</table>'
            objAusgabe.innerHTML = strTable;
        })
        .catch(err => {
            objAusgabe.innerHTML = 
                `<h2>Fehler</h2>
                <p>${err.message}</p>`;
        });



})();