const request = require('request');

const forecast = (latitude,longitude,callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=96719aa75662d91f2346ea448b535a39&query=${latitude},${longitude}`;
    request({url,json:true},(error,{body})=>{
        if(error){
          callback('Unable to connect to location services',undefined)
        }else if(body.error){
          callback('Unable to find location',undefined);
        }else{
         //const data  = JSON.parse(response.body)
         callback(undefined,`It is Currently ${body.current.temperature} degree out there,but it feels like ${body.current.feelslike}. There is ${body.current.precip} % chance of rain 
         and ${body.current.weather_descriptions}!`);
        }
         
     })
   
  }

module.exports = forecast;