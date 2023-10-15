const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require ('bcrypt');


const userSchema = new Schema({ 

  first_name:{
    unique:true,
    type: String,
    required: true
   },
  
    last_name: {
      unique:true,
      type: String,
      required: true
     },
    
    username: {
      unique:true,
      type: String,
      required: true,
      unique:true
     },
   
    email:{
      type: String,
      required: true,
      unique:true,
      lowercase:true,
     },
    
    password:{
      type: String,
      required: true,
     },

     role:{
      type:String,
      enum:['admin','user'],
      default: 'user' 
     }
});

// function to hash password (mongoose hooks)
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSaltSync()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})


//fire a static method to login user(compare the hashed password in the database and the one inputed in login)
userSchema.statics.userLoginAuth = async function (username,password) {
  const userNameChecker = await this.findOne({username})
  if(userNameChecker){
    const loginAuthenticator = await bcrypt.compare(password, userNameChecker.password)

    if(loginAuthenticator){
      return userNameChecker  
    }
     throw res.send('incorrect password')  

  }
throw res.send('incorrect username') 
}

const user  = mongoose.model('user', userSchema)
module.exports = user;