const express = require ('express');
const app = express();
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser');
const seedAdmin = require('./seeder'); 
const userRoute = require('./routes/userRoute');
const paymentRoute = require('./routes/paymentRoute');
const cors = require('cors');
const bodyParser = require('body-parser')
const session = require('express-session')
const sessionSaver = require('connect-mongodb-session')(session)
const user = require ('./models/userModel');
// save a session
const saveSession = new sessionSaver({
   uri:process.env.DBURL,
   collection:'session' });
// const {checkToken, getUser} = require('./middleware/loginAuth');
const main = require('./db');

dotenv.config();
main().catch(err => console.log(err));
const PORT = process.env.PORT || 5000;
seedAdmin();
 app.use(express.json());
 app.use(express.urlencoded({extended:true}));
 app.use(express.static('public'));
 app.set( 'view engine', 'ejs');
 app.use(cookieParser());
 app.use(bodyParser.json());
 app.use(cors());
app.use(session({secret:'casablanca the catamatophia', resave:false, saveUninitialized:false, store:saveSession }))
app.use(async (req,res,next) =>{
   if(!req.session.user){
      return next()
   }
   try {
     const userInfo = await user.findById(req.session.user._id)
req.user = userInfo
next() 
   } catch (error) {
    res.send(error)  
   }

})
 app.use(userRoute);
 app.use(paymentRoute);
 



 app.get('/', (req,res) => {
    res.render('index', {title:'uBill'})
 });
 
app.get('/user/signup', (req,res) => {
res.render('signup', {title:'uBill | Signup'})
});

 app.get('/user/login',(req,res) => {
   res.render('login', {title:'uBill | Login'})
});

app.get('/user/dashboard', (req,res) => {
   res.render('dashboard', {title:'uBill | Dashboard'})
});

app.get('/user/about', (req,res) => {
   res.render('about', {title:'uBill | About'})
});

app.get("/user/payElectricity", (req,res) => {
   res.render('buyElectricity', {title:'uBill | Buy electricity'})
});

app.get('/user/fundWallet', (req,res) => {
   res.render('fundWallet', {title:'uBill | Fund wallet'})
});

app.get('/user/CRM', (req,res) => {
   res.render('message', {title:'uBill | '})
});


app.get('/failed', (req,res) => {
   res.render('unsuccess', {title:'uBill | Failed'})
});

app.get('/msgSent', (req,res) => {
   res.render('success', {title:'uBill | Success'})
});

app.get('*', (req,res) => {
   res.render('404', {title:'uBill | Not found'})
});



// app.get('*',checkToken);

 app.listen(PORT,() => {
console.log("APP is running on port "+PORT)
 })