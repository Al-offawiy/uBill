const dotenv = require ('dotenv');
 const mongoose = require ('mongoose');
const user = require ('./models/userModel');
const main = require ('./db');
 dotenv.config();


const seedAdmin = async () =>{
try {
main().catch(err => console.log(err));

  const adminChecker = await user.findOne({ email: 'fawazmusty247@gmail.com' });
    if (adminChecker) {
      console.log('Admin user already exists, skipping seed');
      return;
    }

const adminUser = {
  first_name: 'Fawas',
  last_name: 'Muhammad',
  username: 'Al-offawiy',
  email: 'fawazmusty247@gmail.com',
  gender: 'male',
   password: '*F1A2Z3#',
  role : 'admin'
};
await user.create(adminUser)
 await mongoose.disconnect();
 console.log('Admin user seeded successfully');

 } catch (error) {
  console.error('Error seeding admin user')
}
 

}
 
module.exports =seedAdmin;

