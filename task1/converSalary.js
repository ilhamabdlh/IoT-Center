//fetch data from json file
var container = {};
var fs = require('fs');
fs.readFile('salary_data.json', (error, obj) => {
	if (error) console.log(error);
    values = JSON.parse(obj);
    
    //convert idr to usd from json file
	function convertCurr(cb){
		let salUSD = [];
		for (let i =0; i< values.array.length;i++) {
			let salary = values.array[i].salaryInIDR;
			salUSD[i] = {
				id: values.array[i].id,
				salaryInUSD: 0
			}
			convertCurrency(salary, 'IDR', 'USD', function(err, amount) {
				salUSD[i].salaryInUSD = amount;

				if(i == values.array.length - 1){
					cb(salUSD)
				}
			});
		}

    }
    
    //fetch data from dummy api
	convertCurr(
		function(salUSD){
		fetch('http://jsonplaceholder.typicode.com/users')
		.then(function(response) {
			return response.json();	
		}) //push data to container
		.then(function(limit){
			for (let i = 0; i < limit.length ; i++){
				limit[i]['salaryInIDR'] = values.array[i].salaryInIDR
				limit[i]['salaryInUSD'] = salUSD[i].salaryInUSD
			}
			console.log(limit)
			
			// push data to new json file
			const write = JSON.stringify(limit);
			fs.writeFile('fileOutput.json', write, (error) => {
				if (error) {
					console.log(error);
				}
				console.log("successful, json has been saved!");
			});
		})
	}
	)
})

//syntax doc from free.currconv
var https = require('https');
var fetch = require('node-fetch');
var salaries = {};
function convertCurrency(amount, fromCurrency, toCurrency, cb) {
	var apiKey = '462a1ad9604d1059f979';
	
	fromCurrency = encodeURIComponent(fromCurrency);
	toCurrency = encodeURIComponent(toCurrency);
	var query = fromCurrency + '_' + toCurrency;
	
	var url = 'https://free.currconv.com/api/v7/convert?q='
				+ query + '&compact=ultra&apiKey=' + apiKey;
	
	https.get(url, function(res){
		var body = '';
	
		res.on('data', function(chunk){
			body += chunk;
		});
	
		res.on('end', function(){
			try {
				var jsonObj = JSON.parse(body);
	
				var val = jsonObj[query];
				if (val) {
				var total = val * amount;
				cb(null, Math.round(total * 100) / 100);
				} else {
				var err = new Error("Value not found for " + query);
				console.log(err);
				cb(err);
				}
			} catch(e) {
				console.log("Parse error: ", e);
				cb(e);
			}
		});
	}).on('error', function(e){
			console.log("Got an error: ", e);
			cb(e);
	});
	}
