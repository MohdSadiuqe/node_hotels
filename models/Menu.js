const mongoose=require('mongoose');
const menuschema=new mongoose.Schema({
    
    
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    
    taste:{
        type:String,
        require:true
    },
    is_drink:{
        type:Boolean,
        default:false,
        require:true
    },
    ingredients: {
        type:[String],   
        default: []     
    },
    num_sell:{
        type:Number
    },
})
const Menu=mongoose.model('Menu',menuschema);
module.exports=Menu