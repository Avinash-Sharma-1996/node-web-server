const express =require('express');
const hbs = require('hbs');
const fs = require('fs');
var app=express();

hbs.registerPartials(__dirname+'/partials');
app.set('view engine','hbs');

//next tell when  to end the middleware so if you dont call next the program  will not continue

//logging the data ;)
app.use((req, res ,next )=>{
  var now = new Date().toString();
  var log=`${now}: ${req.method} ${ req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n',(err)=>{
    if(err){
      console.log('unable to append this data on to the log.');
    }
  });
  next();
});

//maintainece page ;)
app.use((req,res,next)=>{
  res.render('maintain.hbs',{
    pageTitle:'maintainece Page',
  })
});

app.use(express.static(__dirname+'/public'));// this is make the deafult dir


hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();

})

app.get('/',(req,res)=>{
  // res.send('<h1>HEllo express!! yo oy oy </h1>');
  res.render('home.hbs',{
    pageTitle:'Home Page',
    uName:'Avinash Sharma',
  })
});
app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'aboutPage',

  });
})
app.get('/bad',(req,res)=>{
  res.send({
    errorMessage: 'Unable to handel the request'
  })
})
app.listen(3000,()=>{
  console.log('server is up on port :3000');
});
