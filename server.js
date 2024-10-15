// Express

const express=require('express');
const app=express();
const passport = require('./auth');

// .Env connection

require('dotenv').config(); 

// DB Connection

const db=require('./db');

// Port Connection  ENV

const PORT=process.env.PORT || 2900;

// Body Parser

const bodyparser=require('body-parser');
app.use(bodyparser.json());

// Middleware-------->

const logrequest=(req,res,next) =>{
    console.log(`[${ new Date().toLocaleString()}] Request to : ${req.originalUrl}`)
    next();
}

app.use(logrequest);

// Authentication ------->
// Hotel Api

app.use(passport.initialize());
const Localauthermiddlewere=passport.authenticate('local',{session:false});


app.get('/',(req,res)=>{
    res.send("welcome To my Hotel sir how can i help you?");
})

// Person Mongoose API------->
// Person Routers Connection to server.js

const PersonRouters=require('./router/PersonRouters');
app.use('/person',Localauthermiddlewere,PersonRouters)

// Menu Mongoose API------->
// Person Routers Connection to server.js

const MenuRouters=require('./router/MenuRouters');
app.use('/menus/',MenuRouters);

// Local Host

app.listen(PORT,()=>{
    console.log('listening on port 2900');
})