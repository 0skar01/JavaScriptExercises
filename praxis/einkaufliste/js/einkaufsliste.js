/*

Button      => FUNKTION        
------            --------          
(keydown in #item)          => enterPressed
#enter                      => enterItem
(aus enterItem aufgerufen)  => addListItem 
(Click Event der Items)     => selectItem
#delete     => deleteItem
#up         => moveUp
#down       => moveDown
#store      => speicherListe
#load       => ladeListe
#deleteall  => leereListe             

*/
(() => {
    "use strict";
    /* Funktionsdeklarationen */
    var enterPressed = (evt) => {
        // bei keyCode 13 addListItem aufrufen
        // console.log(evt);
        if (evt.keyCode === 13) {
            addListItem(evt.target.value);
        }
    };

    document.getElementById('item').addEventListener('keydown', enterPressed)

    var enterItem = (evt) => {
        let item = document.getElementById('item');
        addListItem(item.value);
    };
    document.getElementById('enter').addEventListener('click', enterItem);

    var addListItem = (strItem) => {
        console.log('addListItem aufgerufen', strItem);
        if (strItem === '') return;
        // li Knoten
        // Textknoten erzeugen und an li Knoten hängen
        // li Knoten an Liste #einkaufsliste hängen
        // document.getElementById('einkaufsliste').innerHTML += `<li>${strItem}</li>`;
        let nLi = document.createElement('li');
        let nTxt = document.createTextNode(strItem);
        nLi.appendChild(nTxt);
        document.getElementById('einkaufsliste').appendChild(nLi);
        nLi.addEventListener('click', selectItem);
        let item = document.getElementById('item');
        item.value = '';
        item.focus();
    };

    var selectItem = (evt) => {
        // Klasse 'markiert' toggeln
        // nach der Highlander Regel
        let nMarkiert = document.querySelector('.markiert');
        if (nMarkiert) {
            nMarkiert.classList.remove('markiert');
        }
        if (nMarkiert != evt.target) {
            evt.target.classList.add('markiert');
        }

        // document.querySelectorAll(li).classList.remove('markiert');
        // evt.target.classList.toggle('markiert');
    };

    var selected = () => {
        let nMarkiert = document.querySelector('.markiert');
        if (nMarkiert) {
            return nMarkiert;
        } else {
            return false;
        }
    }

    var deleteItem = (evt) => {
        const a = selected();
        if (a) {
            a.remove();
        } else {
            let check = confirm("Delete all items in list");
            if(check){
                document.getElementById('einkaufsliste').innerHTML = '';
            }
        }
    };
    document.getElementById('delete').addEventListener('click', deleteItem);

    var moveUp = (evt) => {
        const a = selected();
        const parent = a.parentElement;
        if (a && a != parent.firstElementChild) {
            parent.insertBefore(a, a.previousElementSibling);
        } else if (a && a == parent.firstElementChild) {
            console.log('The selected item is already the first in the list')
        } else {
            console.log('Select an Item to move it up')
        }
    };

    document.getElementById('up').addEventListener('click', moveUp);

    var moveDown = (evt) => {
        const a = selected();
        const parent = a.parentElement;
        console.log(a.nextElementSibling + ' next')

        if (a && a != parent.lastElementChild) {
            console.log(a.nextElementSibling.nextElementSibling + ' next next')
            parent.insertBefore(a, a.nextElementSibling.nextElementSibling);
        } else if (a && a == parent.lastElementChild) {
            console.log('The selected item is already the last in the list')
        } else {
            console.log('Select an Item to move it down')
        }
    };
    document.getElementById('down').addEventListener('click', moveDown);
    var action = (evt) => {
        if (document.querySelector('.markiert')) {
            if (evt.keyCode === 38) {
                moveUp();
            } else if (evt.keyCode === 40) {
                moveDown();
            } else if (evt.keyCode === 46) {
                deleteItem();
            }
        }
    }
    document.addEventListener('keydown', action);

    /* var deleteAll = (evt) => {
        document.getElementById('einkaufsliste').innerHTML = '';
    }
    document.getElementById('deleteall').addEventListener('click', deleteAll); */

    var speicherListe = (evt) => {
        let lis = document.getElementById('einkaufsliste').innerHTML;
        console.log(lis);
        let check = confirm('Are you sure you want to save the list');
        function add() {
            localStorage.setItem('s', lis);
            document.getElementById('einkaufsliste').innerHTML = '';
        }
        if (check) {
            if (localStorage.getItem('s') == '' || !localStorage.getItem('s')) {
                add();
            } else if (localStorage.getItem('s')) {
                let check2 = confirm("Replace the existing list?");
                if (!check2) {
                    let sto = localStorage.getItem('s');
                    console.log(sto);
                    localStorage.setItem('s', sto + lis);
                    console.log(lis);
                    document.getElementById('einkaufsliste').innerHTML = '';
                } else if (check2) {
                    add();
                }
            }
        }
    };
    document.getElementById('store').addEventListener('click', speicherListe);

    var ladeListe = (evt) => {
        let lis = localStorage.getItem('s');
        if(lis != null){
            document.getElementById('einkaufsliste').innerHTML += lis;
            let liL = document.getElementById('einkaufsliste').querySelectorAll('li');
            for (let i = 0; i < liL.length; i++) {
                document.getElementById('einkaufsliste').childNodes[i].addEventListener('click', selectItem);
            }
        }
    };
    document.getElementById('load').addEventListener('click', ladeListe);

    var leereListe = (evt) => {
        let check = confirm('Delete all saved items?');
        if (check) {
            localStorage.removeItem('s');
        }
    };
    document.getElementById('deleteall').addEventListener('click', leereListe);
    /* var test = (evt) => {
        for(let i=0; i<localStorage.length; i++){
            console.log(localStorage.key(i), localStorage.getItem(localStorage.key(i)));
        }
    } */




})();