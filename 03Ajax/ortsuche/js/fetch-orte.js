(() => {
    "use strict";
    /*
        Vorbereitung:
        Integriere die Dateien und Ordner aus "ortsuche.zip"
        in Deinen Praxis-Ordner

        Öffne "nrw.sql" aus dem Ordner Datenbank in Notepad++
        Starte den MariaDB Server und öffne phpMyAdmin
        Öffne das SQL Fenster und kopieren den Inhalt von "nrw.sql" hinein.
        Erstelle die Datenbank durch Ausführen des Scripts 

    */
    // Konstanten und Variable auf höchster Ebene des Skripts
    const objINPUT = document.getElementById('ort');
    const objLIST = document.getElementById('orte');
    const objAUSGABE = document.getElementById('ausgabe');
    var arrOrte = [];

    const fnSucheOrt = (strOrt) => {
        /*
            Lade Ortsnamen aus data/orte-array.php
            mit Übergabe von strOrt als Parameter ort
            Übergebe data an fnUpdateListe
        */
        fetch('data/orte-array.php?ort=' + strOrt)
            .then(response => {
                if (!response.ok) throw new Error(`Fehler: ${response.statusText}`);
                return response.json();
            })
            .then(data => {
                fnUpdateListe(data);
            })
            .catch(err => {
                objAUSGABE.innerHTML = `
                <h2>Big problem!</h2>
                <p>${err.message}</p>`;
            })
    };

    const fnLadeAdressen = (strOrt) => {
        /*
            Lade Adressen aus data/orte-json-detail.php
            mit Übergabe von strOrt als Parameter ort
            Übergebe data an fnZeigeAdressen
        */
        fetch('data/orte-json-detail.php?ort=' + strOrt)
            .then(response=>{
                if(!response.ok) throw new Error(`Fehler: ${response.statusText}`);
                return response.json();
            })
            .then(data=>{
                fnZeigeAdressen(data);
            })
            .catch(err=>{
                objAUSGABE.innerHTML = 
                    `<h2>Big problem!</h2>
                    <p>${err.message}</p>`;
            })

    };

    const fnZeigeAdressen = (data) => {
        /*
            data.orte kann mehrere Adressen enthalten 
            Gib aus in objAUSGABE mit Template String Literal
            aus Datei tabellenmuster-template-literal.js
        */
       console.log(data);
    };

    const fnUpdateListe = (data) => {
        /*
            data enthält ein Array aus Ortsnamen
            speichere den Inhalt von data in arrOrte
            Ersetze den Inhalt von objLIST
            durch <option> Elemente mit diesen Ortsnamen
            Verwende DOM Methoden document.createElement(), etc

        */
        arrOrte = data;
        objLIST.textContent = '';
        data.forEach(el => {
            let objOPTION = document.createElement('option');
            objOPTION.appendChild(document.createTextNode(el));
            objLIST.appendChild(objOPTION);
        });
    };

    const fnInput = (evt) => {
        // evt.type kann sein: select || keydown || input
        // erstelle lokale Variable ort mit Inhalt des Eingabefelds
        //console.log(evt);
        let ort = evt.target.value;
        // Kontrollstruktur mit if..else if zur Abarbeitung der Ereignisse
        /*
            select
                fnLadeAdressen mit Übergabe des Ortsnamens aufrufen
                Hinweis zur Aktion in objAusgabe

             keydown, ausschließlich wenn ENTER oder TAB gedrückt wurde (keyCode)
                ist der Ort in arrOrte enthalten, dann fnLadeAdressen aufrufen
                sonst Hinweis, dass der Ort nicht gefunden wurde (zu früh ENTER gedrückt)  
                und Eingabefeld neu focussieren

             input 
                und evt.data ist nicht leer und ort länger als 2 Zeichen und ort nicht enthalten in arrOrte
                Hinweis:  'Aktualisiere Ortsliste...'
                und Aufruf von fnSucheOrt

             SONST objAUSGABE leeren    
        */
        if (evt.type == 'keydown' && (evt.keyCode == 13 || evt.keyCode == 9)) {
            arrOrte.forEach(el => {
                /* if(el.toLowerCase() == evt.target.value.toLowerCase()){
                    fnLadeAdressen(el)
                } */
                if (evt.target.value.match(new RegExp(el, 'i'))) {
                    fnLadeAdressen(evt.target.value);
                    return;
                }
            })
        } else if (evt.type == 'input' && evt.data && evt.target.value.length > 1) {
            objAUSGABE.innerHTML = 'Lade Ortsnamen...';
            let boolEnthalten = false;
            arrOrte.forEach(el => {
                if (el.toLowerCase().includes(evt.target.value.toLowerCase())) boolEnthalten = true;
            })
            if (!boolEnthalten) fnSucheOrt(evt.target.value);
        }
    };

    // leere das Eingabefeld

    // focussiere das Eingabefeld

    // Schreibe Aufforderung in objAusgabe 'Geben Sie einen Ortsnamen ein.'

    // EventListener anlegen:
    // Bei den Ereignissen select, keydown und input im EIngabefeld objINPUT
    // wird jeweils die Funktion fnInput aufgerufen

    // objINPUT.addEventListener('select', fnInput);
    objINPUT.addEventListener('keydown', fnInput);
    objINPUT.addEventListener('input', fnInput);
    objINPUT.focus();

})();