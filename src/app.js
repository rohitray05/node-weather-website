const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const port = process.env.PORT || 3000
//we are using handlebars, hbs module which is built on top of handlebars for dynamic templating 
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../template/views')
const partialPath = path.join(__dirname,'../template/partials')




app.set('view engine','hbs') //it expects to have views folder in root directory i.e web-server folder
app.set('views',viewsPath); //new path by default is views but can make it customizable
//when app.use was commented it was not binding with css and image so i deleted the html files in public folder
app.use(express.static(publicDirectoryPath)); //it will use public folder and display index.html on localhost:3000
hbs.registerPartials(partialPath);



app.get('',(req,res)=>{
    res.render('index',{
    title:'Weather',
    name:'Rohit'
    }); //render directly renders the file to browser and its dynamic not static like app.use  pass object as dynamic values 
})

app.get('/about',(req,res)=>{
    res.render('about',{
    title:'About Page',
    name:'Robot'
    }); //render directly renders the file to browser and its dynamic not static like app.use  pass object as dynamic values 
})

app.get('/help',(req,res)=>{
    res.render('help',{
    title:'Help Page',
    name:'Robot',
    helpText:'This is help page'
    }); //render directly renders the file to browser and its dynamic not static like app.use  pass object as dynamic values 
})










app.get('/weather',(req,res)=>{
    if(!req.query.address){
     return res.send({
         error:'No address Parameter'
     })
    }
    
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
          return res.send({
            error:'Error Fetching Location'
        })
        }
        forecast(latitude,longitude,(error,forecastData)=>{
          if(error){
            return res.send({
                error:'Error Fetching ForeCast'
            })
          }
          
        res.send({
        forecast:forecastData,
        location,
        address:req.query.address
         });
          //console.log(location);
          //console.log(forecastData);
        })
      });
})

app.get('/help/*',(req,res)=>{
 res.render('error',{
     title:'Help Text Not Found',
     errorMessage:'Help Text Not Foud'
 })
})

/* This url will take up query string and here weare making search term primary
Return statement if matched with if terminates then and there  */
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'Request should have search term in querry string'
        })
    }
    res.send({
        product:[]
    })
    })

app.get('*',(req,res)=>{
    res.render('error',{
        title:'404 Error',
        errorMessage:'404 Error '
    })
})


app.listen(port,()=>{
    console.log('Server is up and running at port');
});





/* Usefull Info */

/* console.log(__dirname);
console.log(path.join(__dirname,'../public'));  path is core node module used for static path*/

//app.use will redirect based on the html name so e.g for about page it will be localhost:3000/about
//app.com
//app.com/help
//app.com/about

//app.get('',(req,res)=>{ //This is now removed this the path above takes it to index.html 
 //   res.send('Welcome to express!'); //localhost:3000 will print this message, can send html codes
//})

//send html
/* app.get('/help',(req,res)=>{
    res.send('<h1>Help Page</h1>');
}) */

//send json
/* app.get('/help',(req,res)=>{
    res.send({
        name:'Rohit',
        age:25,
        domain:'Frontend'
    });
}) */

//send JSON array
/* app.get('/help',(req,res)=>{
    res.send([{
        name:'Rohit',
        age:25,
        domain:'Frontend'
    },{
      name:'Rohit',
        age:25,
        domain:'Frontend'  
    }]);
})
 */


/* app.get('/help',(req,res)=>{
    res.send('Help Page');
})
//These are removed since we are setting up path above using express.js
app.get('/about',(req,res)=>{
    res.send('<h1>About Page</h1>');
}) */




/* Usefull Info */