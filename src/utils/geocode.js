const request = require('request');

const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoicms0Nzh0IiwiYSI6ImNrN3UyeGh2ZTAzbG0zZm85bTUxaXZwMXYifQ.K8OGdbxvnrFVEcFvmPEUZw&limit=1'
    request({url,json:true},(err,{body})=>{
      if(err){
        callback('Unable to connect to location services',undefined);
      }else if(!body.features.length || body.features.length === 0){
        callback('Bhosadike Enter appropriate Location , Recheck location Entered',undefined);
      }else{
        callback(undefined,{
          latitude: body.features[0].center[1],
          longitude: body.features[0].center[0],
          location: body.features[0].place_name
  
        })
      }
    })
  }
  
  

module.exports = geocode
