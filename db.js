const mongoose = require('mongoose');
mongoose.set('strictQuery',true);
mongoose.Promise = global.Promise;
const main = async () => {
    await mongoose.connect(process.env.DBURL)
};
module.exports = main;