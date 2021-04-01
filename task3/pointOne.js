//fetch from json file 
const fs = require('fs');
let file = fs.readFileSync('sensor_data.json');
let data = JSON.parse(file);

//create program
var counter = 0;
var penampung = [];

    setInterval(function(){
        for(i = counter; i < counter + 5; i++){
            var temperatureX = data.array[1].timestamp
            var humiditX = data.array[1].humidity
            var mauPush = {
                "temperature": temperatureX,
                "humidity": humiditX
            }
            penampung.push(mauPush)
            const write = JSON.stringify(penampung)
            writeJsonFile(write)
            counter++
        }
    }, 2000 * 60);

//create new json file
function writeJsonFile(write) {
    return new Promise((resolve, reject) => {
        fs.writeFileSync('fileOutput.json', write, (err) =>{
            if (err){
                console.log(err)
            }
        });
    })
}

