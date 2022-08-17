(() => {

    var speichereKontakt = (evt) => {
        // console.log('speichereKontakt aufgerufen');
        let data = new FormData(objForm);

        /*
            Zeigt Eigenschaften des Prototyps FormData
            for(const EIGENSCHAFT in data) {
                console.log(`${EIGENSCHAFT}: ${data[EIGENSCHAFT]}`)
            } */

        /* for(let [key, value] of data.entries()){
            console.log(key,value);
        } */
        let objKontakt = {}; // new Object();
        data.forEach((value, key) => {
            // console.log(key, value);
            if(value != '') objKontakt[key] = value;
        });
        // console.log(objKontakt);
        objForm.reset();
        saveToStorage(objKontakt);
        evt.preventDefault();
    };

    var saveToStorage = (objKontakt) => {
        /*
            wenn Kontaktliste in Storage, dann anhängen,
            sonst Kontaktliste in Storage beginnen
            Kontaktliste ist ein Array aus Kontaktobjekten
        */
        let strKontaktliste = localStorage.getItem('Kontaktliste') || '[]';
        console.log(strKontaktliste);
        let arrKontaktliste = JSON.parse(strKontaktliste);
        arrKontaktliste.push(objKontakt);
        localStorage.setItem('Kontaktliste', JSON.stringify(arrKontaktliste));

    }

    var zeigeKontaktliste = (evt) => {

        let strKontaktliste = localStorage.getItem('Kontaktliste');
        if(! strKontaktliste) {
            document.getElementById('ausgabe').innerHTML = '<p>Keine Daten!</p>';
            return;
        }
        let arrKontaktliste = JSON.parse(strKontaktliste);

        let strAusgabe = `<table>
        <thead>    
        <tr>
            <th>Nachname</th>
            <th>Vorname</th>
            <th>Geburtsdatum</th>
            <th>Beruf</th>
            <th>E-Mail</th>
            </tr>
            </thead>
            <tbody>`;
        // Schleife
        arrKontaktliste.forEach((objKontakt, key) => {
            strAusgabe += `<tr>
            <td>${objKontakt.nachname || '-'}</td>
            <td>${objKontakt.vorname || '-'}</td>
            <td>${objKontakt.geburtsdatum || '-'}</td>
            <td>${objKontakt.beruf || '-'}</td>
            <td>${objKontakt.email || '-'}</td>
            </tr>`;
        });
        // nach der Schleife
        strAusgabe += `</tbody>
        </table>`;
        console.log(strAusgabe);
        document.getElementById('ausgabe').innerHTML = strAusgabe;
    }

    var objForm = document.querySelector('#jsondemo > form');
    objForm.addEventListener('submit', speichereKontakt);

    var btnZeigeListe = document.getElementById('anzeigen');
    btnZeigeListe.addEventListener('click', zeigeKontaktliste);

})();