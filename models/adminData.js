const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const adminDataSchema=new Schema({
    title:{
    type:String,
    required:true
    },
    
    image:{
       type:String,
       default:'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&q=80&w=2187&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    set:(v)=>
       
        v===''?`https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&q=80&w=2187&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`
        :v,
    },
    description:String,
    price:Number,
    country:String,
    location:String,

});


const adminData=mongoose.model('adminData',adminDataSchema);
module.exports=adminData;
