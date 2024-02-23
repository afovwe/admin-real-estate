import Realtor from "../models/realtor.model.js";
import { v4 as uuidv4 } from 'uuid';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/errors.js'; // Import errorHandler function

export const signup = async (req, res, next) => {
   const { username, email, password, phoneNumber, sponsorCid } = req.body;

   try {
      // Check if any required field is missing or empty
      if (!username || username === '') {
         throw errorHandler(400, "Username is required"); // Pass the error message directly to errorHandler
      }
      if (!email || email === '') {
         throw errorHandler(400, "Email is required"); // Pass the error message directly to errorHandler
      }
      if (!password || password === '') {
         throw errorHandler(400, "Password is required"); // Pass the error message directly to errorHandler
      }
      if (!phoneNumber || phoneNumber === '') {
         throw errorHandler(400, "Phone number is required"); // Pass the error message directly to errorHandler
      }
      if (!sponsorCid || sponsorCid === '') {
         throw errorHandler(400, "Sponsor CID is required"); // Pass the error message directly to errorHandler
      }

      // Generate unique realtorCid
      const realtorCid = generateUniqueCid();

      const hashedPassword = bcryptjs.hashSync(password, 10);

      const newRealtor = new Realtor({
         username,
         email,
         password: hashedPassword,
         phoneNumber,
         sponsorCid,
         realtorCid, // Assign generated realtorCid
         isVerified: false // Set isVerified to false
      });

      // Save the new realtor to the database
      await newRealtor.save();
      res.json('Sign up successful!!!');
   } catch (error) {
      // Pass the error to the error-handling middleware
      next(error);
   }
}

// Function to generate a unique realtorCid
function generateUniqueCid() {
   // Generate a UUID
   const uuid = uuidv4();
   // Extract the first 12 characters from the UUID
   const shortUuid = uuid.replace(/-/g, '').substring(0, 12);
   return shortUuid;
}

// Function to get specific error message for duplicate key
function getDuplicateKeyErrorMessage(keyValue) {
   if (keyValue.username) {
      return "A user with this username already exists";
   } else if (keyValue.email) {
      return "A user with this email already exists";
   } else if (keyValue.phoneNumber) {
      return "A user with this phone number already exists";
   }
   // Handle other duplicate key errors
   return "Duplicate key error";
}
