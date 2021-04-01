//create min, max, median and avg
function minimum (data) {
	return Math.min(data)
}
function maximum (vol) {
	return Math.max(vol)
}
function median(values) {
	values.sort( function(a,b) {return a - b;} );
	var half = Math.floor(values.length/2);
	if(values.length % 2)
		return values[half];
	else
		return (values[half-1] + values[half]) / 2.0;
}
function average(array) {
    return array.reduce((a, b) => a + b) / array.length;
}

//fetch from json file
const fs = require('fs');
let file = fs.readFileSync('sensor_data.json');
let vol = JSON.parse(file);

//convert timestamp to humandate
vol.array.forEach(function(req){
	var convertTimesTamp = +req.timestamp;
	req.convertTimesTamp = (new Date(parseInt(convertTimesTamp))).toLocaleString();
})

//list by date
var resDate = vol.array.reduce(function (item, index) {
	item[index.convertTimesTamp] = item[index.convertTimesTamp] || [];
	item[index.convertTimesTamp].push(index);
	return item;
}, Object.create(null)); 

//list by roomArea
let timeToDates = Object.keys(resDate).length;
var penampung = [];
for (let i = 0; i < timeToDates; i++){
    var date = ''
    var temperatureArray = resDate[Object.keys(resDate)[i]].reduce(function (item, index) {
        date = index.convertTimesTamp
        item[index.roomArea] = item[index.roomArea] || []
        item[index.roomArea].push(index)
        return item
        }, {})

    var pushToDate = {
        date: date,
        data: temperatureArray
    }
    penampung.push(pushToDate)
}

//create a result
var penampung2 = [];
penampung.forEach(function(item){
	item.dateAction = {}
    Object.keys(item.data).forEach(function(index) {
		var tempPlace = []
		var humidPlace = []
		item.data[index].forEach(function(data){
			tempPlace.push(data.temperature)
			humidPlace.push(data.humidity)
		})
		var avgTemp = average(tempPlace)
		var avgHumid = average(humidPlace)
		var medianTemp = median(tempPlace)
		var medianHumidity = median(humidPlace)
		var minTemp = minimum(tempPlace)
		var minHumid = minimum(humidPlace)
		var maxTemp = maximum(tempPlace)
		var maxHumid = maximum(humidPlace)
		
		item.dateAction[index]= {
			minimumTemperature: minTemp,
			minimumHumidity: minHumid,
			maximumTemperature: maxTemp,
			maximumHumidity: maxHumid,
			medianTemperature: medianTemp,
			medianHumidity: medianHumidity,
			avgTemperature: avgTemp,
			avgHumidity: avgHumid
		}

		let runArray = {
			date: item.date,
			data: item.dateAction
		}

		penampung2.push(runArray)
    });
})
console.log(penampung2)


//create json file
const values = JSON.stringify(penampung2)
fs.writeFile('fileOutput.json', values, (error) => {
    if (error) {
        console.log(error)
    }
})