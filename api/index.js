import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import realtorRoute from './routes/realtor.route.js';

dotenv.config();



mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log('Connection to database is successfull!!');
  })
  .catch((err) => {
    console.log(err);
  });

  
const app = express();
const port = process.env.PORT || 7000; 
app.listen(port, () => {
    console.log(`Server is running on port ${port}!!!`);
});

app.use('/api/realtor', realtorRoute);
