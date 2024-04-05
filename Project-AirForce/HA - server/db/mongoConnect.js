const mongoose = require('mongoose');
require('dotenv').config();

main().catch(err => console.log(err));

async function main() {

  await mongoose.connect(process.env.URL_MONGO);
  console.log('mongo shmongo!');
  
}