import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();



mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

  
const app = express();
const port = process.env.PORT || 7000; 
app.listen(port, () => {
    console.log(`Server is running on port ${port}!!!`);
});
