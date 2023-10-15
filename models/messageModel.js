const mongoose = require('mongoose');
const { Schema } = mongoose;

const msgSchema = new Schema({
    email:{
        type: String,
        required: true,
        lowercase:true
       },
     message:{
        type: String,
        required: true
       },

       createdAt:{
        type: Date,
        default:Date.now,
        required: true,
       },
    //    writtenBy:{
    //     type : Schema.Types.ObjectId,
    // ref:'user',
    // required: true
    //    }
})

const msg = mongoose.model('msg', msgSchema);
module. exports = msg;