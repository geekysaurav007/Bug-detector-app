const express=require('express')
const app=express();
const cors=require('cors')
app.use(cors());
app.use(express.json());
const mongoose=require('mongoose');
const router=express.Router();

mongoose.connect('mongodb://localhost:27017/problems');
const issue=require('./models/issue');//the schema in which we have to work
const { request } = require('express');

const connection=mongoose.connection;
connection.once('open',()=>{
    console.log('BINGO!!!......mongodb connection established successfully');
})



app.get("/issues",async(req,resp)=>{
    try{
        let data= await issue.find();
        console.log(req);
        resp.send(data);
        
    }catch(e){
        resp.send(e);
    }
});
//get records
router.route('/issues/:id').get((req,resp)=>{
    issue.findById(req.params.id,(err,issue)=>{
        if(err)
        console.log(err);
        else{
            resp.json(issue);
        }
    })
})


    //add records
    app.post("/issues/add",async (req,resp)=>{
        let data=new issue(req.body);
        let result= await data.save();
        console.log(result);
        resp.send("done");
        
    });


router.route('/issues/update/:id').post((req,resp)=>{
    issue.findById(req.params.id,(err,issue)=>{
        if(!issue){
            return next(new Error('could not load documents'))
        }
        else{
            issue.title=req.body.title;
            issue.responsible=req.body.responsible;
            issue.description=req.body.description;
            issue.severity=req.body.severity;
            issue.status=req.body.status;
            issue.save().then(issue=>{
                resp.json('update done');
            }).catch(err=>{
                resp.status(400).send("update failed");
            })
            


        }
    })
})
router.route('/issues/delete/:id').get((req,res)=>{
    issue.findByIdAndRemove({_id:req.params.id},(err,issue)=>{
        if(err){
            res.json(err);
        }
        else{
            res.json('remove succesfully');
        }
    })
})
app.use('/',router);
app.listen(4000,()=>console.log("server running on port 4000"));
