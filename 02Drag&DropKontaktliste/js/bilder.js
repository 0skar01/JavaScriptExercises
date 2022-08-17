//export default objTarget;
(function () {
    "use strict";
    //const intLimit = 200; // Bilder bis 200 KB akzeptieren
    const objTarget = document.getElementById('bildablage');
    const imgTarget = document.getElementById('imageText');
    
    const handleDrop = (evt) => {
        console.log('handleDrop')
        evt.preventDefault();
        
        const objFile = evt.dataTransfer.files[0];
        console.log(objFile)
        if (objFile.type === 'image/jpeg' || objFile.type === 'image/gif' || objFile.type === 'image/png' || objFile.type === 'image/svg+xml') {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(objFile);
            const savePhoto = (evt) => {
                objTarget.style.backgroundImage = `url('${evt.target.result}')`;
                imgTarget.value = evt.target.result;
            };
            fileReader.addEventListener('load', savePhoto);
            
        };
    };
    
    objTarget.addEventListener('drop', handleDrop);
    const doNotDrop = (evt) => {
        evt.preventDefault();
    }
    document.documentElement.addEventListener('drop', doNotDrop);
    document.documentElement.addEventListener('dragover', doNotDrop);
    
})();