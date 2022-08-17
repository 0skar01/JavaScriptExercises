(()=>{
    "use strict";
    var doFnc = (evt) =>{
        try{
            // Listenelemente mit "Nicht-Beatles" werden mit removeChild gelöscht
           

            var arrBeatles = ['John', 'Paul', 'George', 'Ringo'];
            

            var arrLi = document.querySelectorAll('article > h1 + ul > li');
            // console.log(arrLi);
            for(let i=0; i < arrLi.length; i++){
               
                // Freddy war kein Beatle!
                let strName = arrLi[i].firstChild.nodeValue;
                if(!arrBeatles.includes(strName)){
                   
                   arrLi[i].parentNode.removeChild(arrLi[i]);
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