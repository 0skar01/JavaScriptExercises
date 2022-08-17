const ortInput = document.getElementById("ort");
const ortList = document.getElementById("orte");
const ausgabe = document.getElementById("ausgabe");
ortInput.focus();
const search = {
    "searchString": "",
    "resultList": []
};
const input = (evt) => {
    const streingabe = evt.target.value
    if(streingabe.length<3) return ortList.innerHTML= "" ;

    console.log(ortList.innerHTML= "")

    if(!search.searchString || !streingabe.includes(search.searchString)){
        console.log("fetch")
        fetch('data/orte-array.php?ort=' + streingabe)
            .then(response => {
                if (!response.ok) throw new Error(`scheiße was hast du gemacht ${response}`);
                return response.json();
            })
            .then(data => {
                ortList.innerHTML = '';
                for (let i = 0; i < data.length; i++) {
                    ortList.innerHTML += `<option>${data[i]}</option>`;
                }
                search.searchString = streingabe;
                search.resultList = data;
            })
    }else{
        console.log("else")
        ortList.innerHTML = '';
        for(let i=0; i<search.resultList.length; i++){
            if(search.resultList[i].toLowerCase().includes(streingabe.toLowerCase())){
                ortList.innerHTML += `<option>${search.resultList[i]}</option>`;
            }
        }
    }
}

const suchen = (evt) => {
    const streingabe = evt.target.value
    if (evt.keyCode === 13) {
        evt.target.value = '';
        search.searchString = '';
        fetch('data/orte-json-detail.php?ort=' + streingabe)
            .then(response => {
                if (!response.ok) throw new Error(`scheiße was hast du gemacht ${response}`);
                return response.json();
            })
            .then(data => {
                ausgabe.innerHTML = '';
                let x = data.orte;
                console.log(x)
                if(x.length == 0) throw new Error(`diese scheiß gibt es nicht`);
                for (let i = 0; i < x.length; i++) {
                    ausgabe.innerHTML +=
                        `<table class="ortsdetail">
                    <tbody>
                        <tr>
                            <th colspan="2">
                                <strong>${x[i].ortsname}</strong>, 
                                Bezirk: ${x[i].bezirk}, 
                                Kreis: ${x[i].kreis || '—'} 
                            </th>  
                        </tr>
                        <tr>
                            <th colspan="2">
                            ${x[i].titel} ${x[i].vorname} ${x[i].name}
                            </th>
                        </tr>
                        <tr>
                            <td>
                                ${x[i].strasse}<br/>  
                                ${x[i].postleitzahl} ${x[i].ortsname}<br/>  
                                <a href="//${x[i].internet}">
                                ${x[i].internet}</a>  
                            </td>
                            <td>
                                Telefon: ${x[i].telefon}<br/>  
                                Fax: ${x[i].fax}<br/>  
                                E-Mail: <a href="mailto:${x[i].email}">
                                ${x[i].email}</a>  
                            </td>
                        </tr> 
                    </tbody>
                </table>`

                };
            })
            .catch(err=>{
                ausgabe.innerHTML = "gibt es nicht"
            })

    }
}

ortInput.addEventListener("input", input);
ortInput.addEventListener("keydown", suchen)
