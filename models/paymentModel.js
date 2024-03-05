const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentSchema = new Schema({
    product_name:{
        type: String,
        required: true
       },
       amount:{
        type: String,
        required: true
       },
       transactionId:{
        type: String,
        required: true
       },
      status:{
        type: String,
        required: true
       },
       unique_element:{
        type: String,
        required: true
       },
    purchased_code:{
        type: String,
        required: true
       },

       by:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true
    },

       createdAt:{
        type: Date,
        default:Date.now,
        required: true,
       },
    // trnscBy:{
    //     type : Schema.Types.ObjectId,
    //     ref:'user',
    //     required: true
    //    }
})

const payment = mongoose.model('payment', paymentSchema);
module. exports = payment;