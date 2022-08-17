
  
  function countdown(n){
    let arr = [];
  
    if(n > 0){
      arr.push(n);
      countdown(n - 1);
      console.log(arr);
    }
  
    
  }
  countdown(10);
    

