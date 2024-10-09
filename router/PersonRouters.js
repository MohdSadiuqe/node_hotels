const express=require('express');
const router=express.Router();
const Person=require('./../models/Person');

//  Post route to add the person

router.post('/',async(req,res)=>{
    try{
        const data=req.body;

        const newperson= new Person(data);

        const response=await newperson.save();
        console.log('Data should be save');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"})
    }
})

// Get Method to get the person

router.get('/',async(req,res)=>{
    try{
      const data=await person.find();
      console.log('Data');
      res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"})
    }
})

// Parametarised API

router.get('/:worktype',async(req,res)=>{
    try{
        const worktype=req.params.worktype;

        if(worktype=='waiter'||worktype=='chef'||worktype=='manager'){
            const response=await Person.find({work:worktype});
            console.log('response fetch');
            res.status(200).json(response);   
        }
        else{
            res.status(401).json(response);
        }  
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"})
    }
})

// Update Person Detaits PUT method

router.put('/:id',async(req,res)=>{
    try{
       const personId=req.params.id;
       const Updatepersondata=req.body;

       const response=await Person.findByIdAndUpdate(personId,Updatepersondata,{
        new :true,
        runvalidators:true
       })
       if(!response){
        res.status(404).json({error:"Person not found"})
       }
       console.log('Data Update');
       res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"})
    }
})

// Delete Person Dalete method 
router.delete('/:id',async(req,res)=>{
    try{
       const personId=req.params.id;
       const response=await Person.findByIdAndDelete(personId);
       if(!response){
        res.status(404).json({error:"Person not found"})
       }
       console.log('Delete person data');
       res.status(200).json({message:'person Deleted Succesfully'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"})
    }
})

module.exports=router;