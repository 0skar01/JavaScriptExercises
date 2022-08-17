// Only change code below this line
/* class Thermostat{
    constructor(temperature){
      this.temperature = temperature;
    }
    get thermos(){
        
        return ((5/9) * (this.temperature - 32))
    }
    set thermos(temp){
      this.temperature = ((temp * 9.0) / 5.0 + 32);
    }
  } */
  class Thermostat {
    constructor(fahrenheit) {
      this.fahrenheit = fahrenheit;
    }
    
    get temperature() {
      return (5 / 9) * (this.fahrenheit - 32);
    }
    
    set temperature(celsius) {
      this.fahrenheit = (celsius * 9.0) / 5 + 32;
    }
  }
  // Only change code above this line
  
  const thermos = new Thermostat(76); // Setting in Fahrenheit scale
  console.log(thermos);
  let temp = thermos.temperature; // 24.44 in Celsius
  console.log(temp);
  console.log(thermos);
  thermos.temperature = 26;
  console.log(thermos);
  temp = thermos.temperature; // 26 in Celsius
  console.log(thermos);
  console.log(temp);