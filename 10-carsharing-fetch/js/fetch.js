(()=>{
    "use strict";
    fetch('data/standorte.xml')
    .then((response)=>{
        if(!response.ok){
            throw new Error(`Fehler: ${response.status}: ${response.statusText}`);
        }
        return response.text();
    })
    .then(xmlStr => new DOMParser().parseFromString(xmlStr, 'application/xml'))
    .then(docXML => {
        fetch('data/standorte.xsl')
        .then(response=>{
            if(!response.ok){
                throw new Error(`Fehler: ${response.status}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(xslStr => new DOMParser().parseFromString(xslStr, 'application/xml'))
        .then(docXSL => {
            var processor = new XSLTProcessor();
            processor.importStylesheet(docXSL);
            var ownerDocument = document.implementation.createDocument(null, 'yay');
            var newFragment = processor.transformToFragment(docXML, ownerDocument);
            document.getElementById('orte').replaceWith(newFragment);
            // Interaktionen des Formulars herstellen
            const fncFilterXML = (evt) => {
                // neu Filtern und ausgeben
                var strCity = document.forms[0].city.value;
                var strStichwort = document.forms[0].stichwort.value;
                processor.setParameter(null, 'city', strCity)
                processor.setParameter(null, 'stichwort', strStichwort)
                newFragment = processor.transformToFragment(docXML, ownerDocument);
                document.getElementById('orte').replaceWith(newFragment);
                fncBindBtn();
            };
            const fnZeigAutos = (evt) =>{
                evt.preventDefault();
                document.querySelector(`.${evt.target.dataset.id}`)
                fetch(`data/fahrzeuge-json.php?station=${evt.target.dataset.id}`)
                .then(response=>{
                    if(!response.ok){
                        throw new Error(`Fehler: ${response.status}: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data =>{
                    const list = ['Klasse', 'Modell', 'Kennzeichen', 'Aktion']
                    const table = document.createElement('table');
                    table.setAttribute('border', '1');
                    const thead = document.createElement('thead');
                    const trth = document.createElement('tr');
                    
                    const tbody = document.createElement('tbody');
                    list.forEach(el=>{
                        const th = document.createElement('th')
                        th.appendChild(document.createTextNode(el))
                        trth.appendChild(th)
                    })
                    thead.appendChild(trth);
                    table.appendChild(thead);
                    data.vehiclesAtStation.forEach(obj=>{
                        const trtd = document.createElement('tr');
                        const tdKlasse = document.createElement('td');
                        tdKlasse.appendChild(document.createTextNode(obj.vehicle['vClassName']));
                        const tdModell = document.createElement('td');
                        tdModell.appendChild(document.createTextNode(obj.vehicle['vModelName']));
                        const tdKennzeichen = document.createElement('td');
                        tdKennzeichen.appendChild(document.createTextNode(obj.vehicle['licensePlate']));
                        const button = document.createElement('button');
                        button.appendChild(document.createTextNode('buchen'));
                        button.addEventListener('click', ()=>{
                            console.log(obj.vehicle['vId'])
                        })
                        trtd.appendChild(tdKlasse);
                        trtd.appendChild(tdModell);
                        trtd.appendChild(tdKennzeichen);
                        trtd.appendChild(button);
                        tbody.appendChild(trtd);
                    })
                    table.appendChild(tbody);
                    document.querySelector(`.${evt.target.dataset.id}`).replaceWith(table)
                    
                })
            }
            const fncBindBtn = () => {
                document.querySelector('form').addEventListener('submit', (evt)=>{
                    evt.preventDefault();
                    fncFilterXML();
                });
                document.querySelectorAll('input[name="city"]').forEach((radio)=>{
                    radio.addEventListener('change', fncFilterXML);
                })
                document.querySelectorAll(".link").forEach((link)=>{
                    link.addEventListener('click', fnZeigAutos);
                })
            };
            fncBindBtn();
        })
        
        
        .catch(err => {
            document.getElementById('orte').innerHTML = `<h2>Fehler</h2> <p>${err.message}</p>`;
        });    
    })
    .catch(err => {
        document.getElementById('orte').innerHTML = `<h2>Fehler</h2> <p>${err.message}</p>`;
    });

})();