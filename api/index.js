import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import realtorRoutes from './routes/realtor.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();



mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log('Connection to database is successfull!!');
  })
  .catch((err) => {
    console.log(err);
  });

  
const app = express();
app.use(express.json());
const port = process.env.PORT || 7000; 
app.listen(port, () => {
    console.log(`Server is running on port ${port}!!!`);
});

app.use('/api/realtor', realtorRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
    if (err && err.message && err.message.includes('duplicate key error collection')) {
        if (err.message.includes('username')) {
            return res.status(400).json({ success: false,  statusCode: 400, message: "A user with this username already exists" });
        } else if (err.message.includes('email')) {
            return res.status(400).json({ success: false,  statusCode: 400, message: "A user with this email already exists" });
        } else if (err.message.includes('phoneNumber')) {
            return res.status(400).json({ success: false,  statusCode: 400,message: "A user with this phone number already exists" });
        }
    }

    // If the error is not a duplicate key error or cannot be handled, return a generic error
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json ({
        success: false,
        statusCode,
        message
    });
});
