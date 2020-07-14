const request = require('request');

const forecast = (latitude,longitude,callback)=>{
    const url = `https://api.darksky.net/forecast/e01ce6a8c6e6e4cc3c0ec1a68c9a948f/${latitude},${longitude}?units=si`;
    request({url,json:true},(error,{body})=>{
        if(error){
          callback('Unable to connect to location services',undefined)
        }else if(body.error){
         console.log('Unable to find location',undefined);
        }else{
         //const data  = JSON.parse(response.body)
         callback(undefined,`It is Currently ${body.currently.temperature} degree out. There is ${body.currently.precipProbability} % chance of rain `);
        }
         
     })
   
  }

module.exports = forecast;