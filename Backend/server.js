const mongoose =require('mongoose');
require('dotenv').config();
const express=require('express');
const cors=require('cors');
const app=express();
const data=require('./models/data')
const json=require('./json/jsondata.json')
const dbconnect=require('./DB_Connection/db')
dbconnect();



app.use(express.json());
app.use(cors());

// commented the below code after running once
// To create the data in mongoDB from the json file given in the assignment
// app.post('/api/v1',async(req,res)=>{

//     try{
        
//         let files=await data.insertMany(json);
//         res.json(files);
//     }
//     catch(e){
//         return res.status(500).json(e);
//     }
// })

app.get('/api/v1',async(req,res)=>{

    try{
        let query=req.query;
        let files;
        if(req.query.limit){
            
            files=await data.find(query).limit(parseInt(req.query.limit));
        }
        else if(JSON.stringify(query)!='{}'){
             files=await data.find(query).limit(100)
        }else{
         files=await data.find().limit(10);
        }
        res.json({
            status  : "Success",
            length: files.length,
data : files
        }
            );
    }
    catch(e){
        return res.status(500).json({status : "Failed", error : e});
    }
})



const port=process.env.PORT || 8080;
app.listen(port,()=>console.log(`Listening on ${port}`))