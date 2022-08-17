(()=>{
    "use strict";
    var doFnc = (evt) =>{
        try{
            // Listenelemente mit "Nicht-Beatles" bekommen die Css-Klasse "kein-Beatle"
            // <li> ist parentNode des Textknotens

            var arrBeatles = ['John', 'Paul', 'George', 'Ringo'];
            

            var arrLi = document.querySelectorAll('article > h1 + ul > li');
            // console.log(arrLi);
            for(let i=0; i < arrLi.length; i++){
               
                // Freddy war kein Beatle!
                let strName = arrLi[i].firstChild.nodeValue;
                if(!arrBeatles.includes(strName)){
                   // ... classList.add('kein-Beatle)
                   // ... classList.toggle('kein-Beatle', true)
                   arrLi[i].classList.add('kein-Beatle');
                }
            }
            
            
            

        }catch(err){
            console.log(err.name , err.message, err);

        }finally{ // optional
            console.log("End");
        }
    };
    document.getElementById('do').addEventListener('click', doFnc);

})();