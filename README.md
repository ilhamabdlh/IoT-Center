# fully finish

## Ratio of Temperature and Humidity Task 3 point 1
![ratio-of-temperature-and](https://user-images.githubusercontent.com/72017753/113230929-48597680-92c4-11eb-86b8-4db4390a4236.jpeg)

##Salary Conversion (1 program file)
o Fetch data from http://jsonplaceholder.typicode.com/users
o Join the fetched data with salary data from JSON file by using id
o Add one field to represent salary in USD (salary in JSON file is in IDR) using currency converter (such as https://free.currencyconverterapi.com). Try to be efficient with the resource by not doing a getrequest to endpoint after every conversion
o Output from the endpoint should be: id, name, username, email, address, phone, salary in IDR and salary in USD

##Sensor Aggregation (1 program file)
o Aggregate sensor data from JSON file on roomArea and by day
o Output the endpoint should be: min, max, median, and avg from sensors value (temperature, humidity)

##Sensor Streaming (2 program file)
o Make one program that streams sensor data (Temperature and Humidity) in at least 5 different rooms with push rate is 2 minutes. This streaming data should be logged in one log file (in .txt, .csv, or .json format) . The program should be continuously running until the user stops it the process
o Make one program that read log file from point 1 and display min, max, median, and avg from sensors value (Temperature and Humidity) every 15 minutes streamed for each room and average sensors value from all rooms. The program should be continuously running until the user stops the process
o Data visualization is point plus
