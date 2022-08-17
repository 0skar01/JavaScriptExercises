(()=>{
    "use strict";
    var doFnc = (evt) =>{
        try{
            var arrBeatles = ['John', 'Paul', 'George', 'Ringo'];
            // arrBeatles.indexOf('Hugo') gibt -1 nicht da
            // arrBeatles.indexOf('George') gibt 2
            // arrBeatles.includes('Hugo') gibt false

            var arrLi = document.querySelectorAll('article > h1 + ul > li');
            // console.log(arrLi);
            for(let i=0; i < arrLi.length; i++){
                console.log(arrLi[i].firstChild.nodeValue);
                // firstChild / childNodes[x] / lastChild
                console.log(arrLi[i].childNodes[0])
                // Freddy war kein Beatle!
                let strName = arrLi[i].firstChild.nodeValue;
                if(!arrBeatles.includes(strName)){
                    throw {name: 'kein Beatle error', message: strName + ' ist kein Beatle!'};
                }
            }
            // using throw
            throw {name: "Aua!", message: "Absichtlich!"};
            

        }catch(err){
            console.log(err.name , err.message, err);

        }finally{ // optional
            console.log("End");
        }
    };
    document.getElementById('do').addEventListener('click', doFnc);

})();