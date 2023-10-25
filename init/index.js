

const mongoose=require('mongoose');
const initData=require('./data.js');
const Listing=require('../models/adminData.js');
const MONGO_URL='mongodb://127.0.0.1:27017/boat';


main().then(()=>{
    console.log('Connected to DB!');
}).catch((err)=>{
    console.log(err);
});
 async function main(){
    await mongoose.connect(MONGO_URL);
 }
  async function initDB(){
    await Listing.insertMany(initData.data);
    console.log("Data was initialized!");
    console.log(initData);
  }
  initDB();