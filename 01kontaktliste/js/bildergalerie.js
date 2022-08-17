/* 
  Drag & Drop Demo mit FileReader
 */
(function () {
  "use strict";
  var intLimit = 200; // Bilder bis 200 KB akzeptieren
  // wiederholt verwendete DOM Objekte
  var objTarget = document.getElementById('bildablage');
  var objGalerie = document.getElementById('galerie');
  var objCaption = document.querySelector('#bildablage + figcaption');
  // Beim Ablegen im Ziel ausgeführte Funktion
  var handleDrop = function (evt) {
    // evt => Drop Event
    objCaption.textContent = "";
    objTarget.style.backgroundImage = 'none';
    try {
      // Typ der abgelegten Datei erkennen
      var objFile = evt.dataTransfer.files[0];
      switch (objFile.type) {
        case 'image/jpeg':
        case 'image/gif':
        case 'image/png':
        case 'image/svg+xml':
          // FileReader Objekt zum Auslesen der Daten erzeugen
          var objFileReader = new FileReader();
          // EventHandler für FileReader Load Event deklarieren
          var processFile = function (evt) {
            // evt => FileReader Event
            // Akzeptierte Dateigröße beschränken
            if (evt.total > intLimit * 1024) {
              objCaption.textContent =
                'Nur Bilder bis ' + intLimit + ' KB akzeptiert.';
            } else {
              // Dateityp und Dateigröße anzeigen
              objCaption.textContent =
                objFile.type + ', ' + Math.round(evt.total / 1024) + ' KB';
              // Ablage Hintergrundbild ändern  
              objTarget.style.backgroundImage =
                'url(' + evt.target.result + ')';
              // Click-Handler für Bildergalerie
              var showPicture = function (evt) {
                objTarget.style.backgroundImage = 'url(' + this.src + ')';
                objCaption.textContent = this.title;
                //console.log(evt.target)
              };
              // Image für Galerie erstellen und platzieren
              var objImg = document.createElement('img');
              objImg.setAttribute('width', '85');
              objImg.setAttribute('alt', objCaption.textContent);
              objImg.setAttribute('title', objCaption.textContent);
              objImg.src = evt.target.result;
              objImg.addEventListener('click', showPicture);
              objGalerie.appendChild(objImg);
            }
          };
          // EventListener an FileReader Objekt zuweisen
          objFileReader.addEventListener('load', processFile);
          // Für alle Fälle Fehlerbehandlung für Ladefehler
          var handleError = function (err) {
            objCaption.textContent = 'Bilddatei kann nicht geladen werden';
          };
          objFileReader.addEventListener('error', handleError);
          // Jetzt erst komt die Anweisung zum Einlesen der Bilddaten
          objFileReader.readAsDataURL(objFile);
          break;
        default:
          objCaption.textContent = objFile.type + ' nicht unterstützt';
      }
    } catch (err) {
      objCaption.textContent = 'Fehler: ' + err.name + ', ' + err.message;
    }
    // Default Aktion für Drop muss unterbunden werden.
    // Sonst zeigt der Browser das Bild anstelle der Webseite an
    evt.preventDefault();
  };
  // Jetzt bekommt die Ablage den Drop Handler zugewiesen
  objTarget.addEventListener('drop', handleDrop);
  // Damit keine Panne passiert, wenn das Bild "daneben" abgelegt wird
  // darf die Seite insgesamt keine Drop Ereignisse zulassen
  var doNotDrop = function (evt) {
    evt.preventDefault();
  }
  document.documentElement.addEventListener('dragover', doNotDrop);
  document.documentElement.addEventListener('drop', doNotDrop);
})();