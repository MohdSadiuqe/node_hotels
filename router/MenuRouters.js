const express=require('express')
const router=express.Router();
const Menu=require('./../models/Menu');

// Post Method to add the menu item

router.post('/',async(req,res)=>{
    try{
        const data=req.body;
        const newmenu=new Menu(data);
        
        const response=await newmenu.save();
        console.log('Data should be save');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
})


// Get Method to get menu item

router.get('/',async(req,res)=>{
    try{
        const data=await Menu.find();
        console.log('Data retrieved:');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
})

router.get('/:itemtaste',async(req,res)=>{
    try{
        const itemtaste=req.params.itemtaste;
        if(itemtaste=='sweet'||itemtaste=='sour'||itemtaste=='spicy'){
            const response=await Menu.find({taste:itemtaste})
            console.log('response fetch');
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error:'item not found'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
})

// Update Menu detals Put Methods

router.put('/:id',async(req,res)=>{
    try {
        const menuid=req.params.id;
        const updatemenu=req.body;

        const response=await Menu.findByIdAndUpdate(menuid,updatemenu,{
            new:true,
            runValidators:true
        })
        if(!response){
            res.status(404).json({error:'Menu not found'});
        }
        console.log('Data Update');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"})
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;
        const response=await Menu.findByIdAndDelete(personId);
        if(!response){
            res.status(404).json("Menu not found");
        }
        console.log("data deleted");
        res.status(200).json({message:"menu item deleted succesfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"})
    }
})

// commit is added
module.exports=router;



