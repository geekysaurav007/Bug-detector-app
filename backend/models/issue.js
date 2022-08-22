const mongoose=require('mongoose')

let Issue=new mongoose.Schema({
    
        title:{
            type:String
        },
        responsible:{
            type:String
        },
        description:{
            type:String
        },
        severity:{
            type:String
        },
        status:{
            type:String,
            default:'open'
        }
})
module.exports=mongoose.model('issues',Issue)    //(collection_name,schema_name)