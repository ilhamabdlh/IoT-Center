//fetch data from json file
const fs = require('fs');
let file = fs.readFileSync('sensor_data.json');
let data = JSON.parse(file);

//create program
  var counter = 0;
  setInterval(function(){
      for(i= counter; i< counter + 3; i += 3){
          var temp1 = data.array[i].temperature
          var temp2 = data.array[i + 1].temperature
          var temp3 = data.array[i + 2].temperature
          var mintemp = minimum(temp1, temp2, temp3);
          var maxtemp = maximum(temp1, temp2, temp3);
          var averg = average(temp1, temp2, temp3);
          var medi = median(temp1, temp2, temp3);

          var humid1 = data.array[i].humidity
          var humid2 = data.array[i + 1].humidity
          var humid3 = data.array[i + 2].humidity
          var minhumid = minimum(humid1, humid2, humid3);
          var maxhumid = maximum(humid1, humid2, humid3);
          var averghumid = average(humid1, humid2, humid3);
          var medihumid = median(humid1, humid2, humid3);
          counter++
      }
      var objPush = {
          "min": mintemp + minhumid,
          "max": maxtemp + maxhumid,
          "median": medi + medihumid,
          "avg": averg + averghumid
      }
      console.log(objPush)
  }, 15000 * 60);

  //create min, max, avg and median
  function minimum(data1, data2 , data3) {
      return Math.min(data1, data2, data3)
  }

  function maximum(data1, data2, data3) {
      return Math.max(data1, data2, data3)
  }
  
  function average(data1, data2, data3) {
      const aveg = (data1 + data2 + data3) / 3
      return aveg;
  }
  
  function median(data1, data2, data3) {
      const getMed = [data1, data2, data3];
      const med = getMed.sort()
      return med[1]
  }