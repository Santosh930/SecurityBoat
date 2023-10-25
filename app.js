const express=require('express');
const methodOverride=require('method-override');
const app=express();
const ejsMate=require('ejs-mate');
const session=require('express-session');
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(session(session));
const passport=require('passport');
const LocalStrategy =require('passport-local');
const User=require('./models/user.js');
app.engine('ejs',ejsMate);
const adminData=require('./models/adminData.js');
const mongoose=require('mongoose');
const userRouter=require('./routes/user.js');
const path=require('path');
app.set('view engine','ejs');
app.use('/',userRouter);
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extende:true}));
app.use(methodOverride("_method"));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(express.static(path.join(__dirname,'/public')));
const MONGO_URL='mongodb://127.0.0.1:27017/boat';
// listen route!
app.listen(8080,()=>{
    console.log(`Server is listening on port 8080!`);
});
//DataBase Connection ! 
main().then(()=>{
    console.log('Connected to DB!');
})
.catch((err)=>{
    console.log(err);
})
    


async function main(){
    await mongoose.connect(MONGO_URL);
}
//route Page route
app.get('/',(req,res)=>{
    res.send('Welcome to the root Page!');
});
//Sample testing route for checking admin data
// app.get('/testadminData' , async (req,res)=>{
//     let sampleadminData= new adminData({
//         title:'Santosh Kumar',
//         description:'Apple',
//         price:120000,
//         location:'mobile',
//         country:'India'


//     });
//     await sampleadminData.save();
//     console.log('sample was saved in DB');
//     res.send('Sucessfull Data Saved!')
// });
//Home Page route
app.get('/listings', async (req,res)=>{
   const allListings= await adminData.find({});
//    console.log(allListings);
   res.render("listings/index.ejs",{allListings});
})
//new rout
app.get('/listings/new',(req,res)=>{
    res.render('listings/new.ejs');
})
//show/Read Rout
app.get('/listings/:id' ,async (req,res)=>{
    let {id}=req.params;
    const listing=await adminData.findById(id);
    // console.log(listing);
    res.render("listings/show.ejs",{ listing});
});

//create route
app.post('/listings',async (req,res)=>{
    const newListing= new adminData(req.body.listing);
    // console.log(newListing);
   await newListing.save();
    res.redirect('/listings');
});

//Edit Route
app.get('/listings/:id/edit', async (req,res)=>{
    let {id}=req.params;
    const listing=await adminData.findById(id);


    res.render('listings/edit.ejs',{listing});
});

//update route
app.put('/listings/:id',async (req,res)=>{
    let {id} =req.params;
    await adminData.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings`);
});

//Delete Route

app.delete('/listings/:id' , async (req,res)=>{
    let {id} =req.params;
    const deletedData= await adminData.findByIdAndDelete(id);
    res.redirect('/listings');
})

//demouser
// app.get('/demouser', async (req,res)=>{
//     let fakeUser=new User({
//         email:'Mantosh@gmail.com',
//         username:'Mantosh',
//     });
//    let registeredUse=await User.register(fakeUser,'helloworld');
//    res.send(registeredUse);
// })

