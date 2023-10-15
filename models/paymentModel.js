const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentSchema = new Schema({
    name:{
        unique:true,
        type: String,
        required: true
       },
    // trnscBy:{
    //     type : Schema.Types.ObjectId,
    //     ref:'user',
    //     required: true
    //    }
})

const payment = mongoose.model('payment', paymentSchema);
module. exports = payment;