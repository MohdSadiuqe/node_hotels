// Express

const express=require('express');
const app=express();

// DB Connection

const db=require('./db');

// Body Parser

const bodyparser=require('body-parser');
app.use(bodyparser.json());

//  Person Mongoose

// Menu Mongoose




app.get('/',(req,res)=>{
    res.send("welcome To my Hotel sir how can i help you?");
})

// Post Method to add the menu item

// Person Routers Connection to server.js

const PersonRouters=require('./router/PersonRouters');

// Use the Router

app.use('/person',PersonRouters)
// Local Host

const MenuRouters=require('./router/MenuRouters');
app.use('/menus',MenuRouters);

app.listen(2900,()=>{
    console.log('listening on port 2900');
})

