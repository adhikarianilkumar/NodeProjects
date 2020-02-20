var request = require('request');
var express = require('express');
var app = express();
var port = process.env.PORT || 9600;

// var weatherApiUrl = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=London&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29';


var cityParam = 'Dallas,Tx'
var appIdParam = '061f24cf3cde2f60644a8240302983f2';
var weatherApiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityParam},us&units=imperial&appid=${appIdParam}`;

app.get('/weather', function(req, res){
    request(weatherApiUrl, function(err, data){
        if(err) throw err;
        res.send(data.body)
    });
});

app.listen(port, function(err){
    if(err) throw err;
    console.log(`Server is running on oprt ${port}`);
})