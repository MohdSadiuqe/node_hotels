// Express

const express=require('express');
const app=express();

// DB Connection

const db=require('./db');

// .Env connection 

require('dotenv').config();



// Body Parser

const bodyparser=require('body-parser');
app.use(bodyparser.json());

// Port Connection 

const PORT=process.env.PORT || 2900;

// Person Mongoose

// Menu Mongoose

app.get('/',(req,res)=>{
    res.send("welcome To my Hotel sir how can i help you?");
})

// Person Routers Connection to server.js

const PersonRouters=require('./router/PersonRouters');

// Use the Router

app.use('/person',PersonRouters)

// Local Host

const MenuRouters=require('./router/MenuRouters');
app.use('/menus',MenuRouters);





app.listen(PORT,()=>{
    console.log('listening on port 2900');
})