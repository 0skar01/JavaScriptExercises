/* 
	Die Kontinente sind als Konstante hinterlegt, 
	so dass Sie für das erste Select-Feld keine 
	Daten vom Server abrufen müssen.
  	Folgende Kontinente haben keine Regionen:
		["Antarctica", "South America"]
 */
(()=>{
	"use strict";
	const arrKontinente = ["Europe", "Asia", "Africa", "North America", "South America", "Oceania", "Antarctica"];
	const selectKontinent = document.getElementById('kontinent');
	const selectRegion = document.getElementById('region');
	const selectLand = document.getElementById('laender');
	const selectStadt = document.getElementById('staedte');
	const selectLandesInfo = document.getElementById('landesinfo');
	const selectStadtInfo = document.getElementById('stadtinfo');
	const img = document.createElement('img');
	img.src = 'images/ui-anim_basic_16x16.gif'

	for(let i=0; i < arrKontinente.length; i++){
		selectKontinent.innerHTML += `<option>${arrKontinente[i]}</option>`
	}

	const fnKontinent = (evt)=>{
		document.getElementById('divKon').appendChild(img);
		selectStadtInfo.innerHTML='';
		selectStadt.innerHTML='';
		selectLandesInfo.innerHTML='';
		selectLand.innerHTML='';
		selectRegion.innerHTML='';
		fetch(`data/liste-json.php?liste=regionen&suche=${selectKontinent.value}`)
		.then(response =>{
			if(!response.ok) throw new Error(`${err.message}`)
			return response.json();
		})
		.then(data =>{
			let regionResult = document.createElement("select");
			regionResult.size = "10";
			regionResult.id = 'regionSelect'
			for(let i=0; i<data.Daten.length; i++){
				let option = document.createElement('option')
				regionResult.append(option)
				option.innerHTML = data.Daten[i].Region
			}
			document.getElementById('divKon').removeChild(img);
			selectRegion.append(regionResult)
		})
	}
	
	const fnRegion = (evt)=>{
		selectRegion.appendChild(img);
		selectStadtInfo.innerHTML='';
		selectStadt.innerHTML='';
		selectLandesInfo.innerHTML='';
		selectLand.innerHTML='';
		const regionSelect = document.getElementById('regionSelect');
		fetch(`data/liste-json.php?liste=laender&suche=${regionSelect.value}`)
		.then(response =>{
			if(!response.ok) throw new Error(`${err.message}`)
			return response.json();
		})
		.then(data =>{
			let landResult = document.createElement("select");
			landResult.size = "10";
			landResult.id = 'landSelect'
			for(let i=0; i<data.Daten.length; i++){
				let option = document.createElement('option')
				landResult.append(option)
				option.innerHTML = data.Daten[i].Land				
			}
			selectRegion.removeChild(img);
			selectLand.append(landResult)
		})
	}
	const fnLand = (evt)=>{
		selectLand.appendChild(img);
		selectStadtInfo.innerHTML='';
		selectStadt.innerHTML='';
		selectLandesInfo.innerHTML='';
		const landSelect = document.getElementById('landSelect')
		fetch(`data/liste-json.php?liste=staedte&suche=${landSelect.value}`)
		.then(response =>{
			if(!response.ok) throw new Error(`${err.message}`)
			return response.json();
		})
		.then(data =>{
			let stadtResult = document.createElement("select");
			stadtResult.size = "10";
			stadtResult.id = "stadtSelect"
			for(let i=0; i<data.Daten.length; i++){
				let option = document.createElement('option')
				option.value = data.Daten[i].ID
				stadtResult.append(option)
				option.innerHTML = data.Daten[i].Name
			}
			selectStadt.append(stadtResult)
		})
		fetch(`data/liste-json.php?liste=landesinfo&suche=${landSelect.value}`)
		.then(response =>{
			if(!response.ok) throw new Error(`${err.message}`)
			return response.json();
		})
		.then(data =>{
			let landInfoResult = document.createElement('div');
			landInfoResult.id = "landesInfoSelect"
			let x = data.Daten[0];
			for(let pro in x){
				let p = document.createElement('p');
				p.innerHTML = pro + " : " + x[pro];
				landInfoResult.append(p)
			}
			selectLand.removeChild(img)
			selectLandesInfo.append(landInfoResult)
		})
	}
	const fnStadt = (evt)=>{
		selectStadt.appendChild(img);
		selectStadtInfo.innerHTML='';
		const stadtSelect = document.getElementById('stadtSelect')
		fetch(`data/liste-json.php?liste=stadtinfo&suche=${stadtSelect.value}`)
		.then(response =>{
			if(!response.ok) throw new Error(`${err.message}`)
			return response.json();
		})
		.then(data =>{
			let stadtInfoResult = document.createElement('div');
			stadtInfoResult.id = 'stadtInfoSelect'
			let x = data.Daten[0];
			for(let pro in x){
				let p = document.createElement('p');
				p.innerHTML = pro + " : " + x[pro];
				stadtInfoResult.append(p)
			}
			selectStadt.removeChild(img);
			selectStadtInfo.append(stadtInfoResult)
		})
		
	}

	selectKontinent.addEventListener('click', fnKontinent)
	selectRegion.addEventListener('click', fnRegion)
	selectLand.addEventListener('click', fnLand)
	selectStadt.addEventListener('click', fnStadt)

})();