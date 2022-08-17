(() => {
    "use strict";
    var objAusgabe = document.getElementById('ausgabe');
    fetch('data/cd-catalog.xml')
        .then(response => {
            //console.log(response);
            if(!response.ok){
                throw new Error(`Fehler: ${response.status}: ${response.statusText}`);
            }
            return response.text();
        })
        /* .then((data) => {
            console.log(data);
            data.forEach((objCD) =>{
                console.log(objCD.TITLE)
            });
        }) */
        .then((data) => {
            try{
                data = fnXmlToJson(data);
                if(Object.keys(data).length==0) throw new Error('Fehler:');
            }catch (err){
                throw new Error(`Fehler : ${err.message}`);
            }
            // console.log(Object.keys(data[0]).length)
            /* if(Object.keys(data[0]).length === 0){
                throw new Error(`Fehler: ${err.message}`);
            } */
            //console.log(data);
           
            // console.log(objXML);
            
            //console.log(arrJSON)
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

        const fnXmlToJson = (strXML) =>{
            let objParser = new DOMParser();
            var objXML = objParser.parseFromString(strXML, 'text/xml');
            if(objXML.documentElement.nodeName.toLowerCase()=='parsererror'){
                throw new Error('konnte nicht geladen werden');
            }
            console.log(objXML.documentElement, 'xml')
            let arrRS = objXML.documentElement.childNodes;
            //console.log(arrRS);
            let arrJSON = []; // new Array
            arrRS.forEach((rs)=>{
                //console.log(rs,"rs", rs.nodeType,"type", rs.nodeName, "name")
                if(rs.nodeType == 1){
                    //console.log(rs.nodeName);
                    let objRS = {}; // new Object()
                    rs.childNodes.forEach((feld)=>{
                        if(feld.nodeType == 1){
                            objRS[feld.nodeName] = feld.hasChildNodes() && feld.firstChild.nodeType == 3 ? feld.firstChild.nodeValue : '-';
                        }
                    })
                    arrJSON.push(objRS);
                }
            })
            return arrJSON;
        }



})();