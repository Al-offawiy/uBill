const jwToken = require ('jsonwebtoken');
const appUser = require ('../models/userModel')
 



const checkToken = (req,res,next)  => {
    const token = req.cookies.envelope
    if (checkToken) {
jwToken.verify(token,'casablanca de catamatophia',(err,verifyToken) => {
    if (verifyToken) {
        next()
    } else {   
        res.send('You do not have a token'); 
    }
});
  }else{
    res.send('Your token is invalid'); 
    }
 
};     


// middleware to get the username
const getUser = (req, res, next) =>{
    const token = req.cookies.envelope
  
    if(token){
          
        jwToken.verify(token,'casablanca de catamatophia', async (err,decodedToken)=>{
            if (decodedToken){
                
                let user = await appUser.findById(decodedToken.id)
                res.locals.user = user;
             next()   
            }
            else{
                console.log("User info was not collected")
                res.locals.user =null
                next()
            }
        })
    }
    else{
        console.log("No token")
        res.locals.user = null
        next()
        
    }
    
    }


module.exports = {checkToken, getUser}







 
