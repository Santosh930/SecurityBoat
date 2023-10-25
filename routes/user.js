const express=require('express');
const { model } = require('mongoose');
const router=express.Router();
router.use(express.urlencoded({ extended: true }));
const User=require('../models/user.js');
//get route
router.get('/signup',(req,res)=>{
    res.render("users/signup.ejs");
});

//post route
router.post("/signup",async (req,res)=>{
    let {username,email,password} =req.body;
    console.log(username,email,password);
    const newUser =new User({email,username});
    const registeredUser= await User.register(newUser,password);
    console.log(registeredUser);
    req.flash("sucess","Welcome to the SecurityBoat");
    res.redirect('/listings');

})

module.exports=router;