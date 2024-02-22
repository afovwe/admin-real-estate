import Realtor from "../models/realtor.model.js";
import { v4 as uuidv4 } from 'uuid';
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
   const { username, email, password, phoneNumber, sponsorCid } = req.body;

   // Check if any required field is missing or empty
   if (!username || username === '') {
      return res.status(400).json({ message: "Username is required" });
   }
   if (!email || email === '') {
      return res.status(400).json({ message: "Email is required" });
   }
   if (!password || password === '') {
      return res.status(400).json({ message: "Password is required" });
   }
   if (!phoneNumber || phoneNumber === '') {
      return res.status(400).json({ message: "Phone number is required" });
   }
   if (!sponsorCid || sponsorCid === '') {
      return res.status(400).json({ message: "Sponsor CID is required" });
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

   
   try {
      // Save the new realtor to the database
      await newRealtor.save();
      res.json('Sign up successful!!!');
   } catch (error) {
      // Handle duplicate key error
      if (error.name === 'MongoServerError' && error.code === 11000) {
         const errorMessage = getDuplicateKeyErrorMessage(error.keyValue);
         return res.status(400).json({ message: errorMessage });
      }
      // Handle other errors
      console.error("Error while signing up:", error);
      res.status(500).json({ message: "Failed to sign up" });
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