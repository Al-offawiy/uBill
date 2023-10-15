const express = require ('express');
const app = express();
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser');
const seedAdmin = require('./seeder'); 
const userRoute = require('./routes/userRoute');
const paymentRoute = require('./routes/paymentRoute');
const cors = require('cors');
const bodyParser = require('body-parser')
const {checkToken, getUser} = require('./middleware/loginAuth');
// const {req} = require('./verify')
const main = require('./db');

dotenv.config();
main().catch(err => console.log(err));
 const PORT =  3000;
seedAdmin();
 app.use(express.json());
 app.use(express.urlencoded({extended:true}));
 app.use(express.static('public'));
 app.set( 'view engine', 'ejs');
 app.use(cookieParser());
 app.use(bodyParser.json());
 app.use(cors());
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

app.get('/user/dashboard',getUser, (req,res) => {
   res.render('dashboard', {title:'uBill | Dashboard'})
});

app.get('/user/about', (req,res) => {
   res.render('about', {title:'uBill | About'})
});

app.get('/user/buyElectricity', (req,res) => {
   res.render('buyElectricity', {title:'uBill | Buy electricity'})
});

app.get('/user/fundWallet', (req,res) => {
   res.render('fundWallet', {title:'uBill | Fund wallet'})
});

app.get('/user/CRM', (req,res) => {
   res.render('message', {title:'uBill | '})
});

app.get('*',checkToken);

 app.listen(PORT,() => {
console.log("APP is 3000 ")
 })