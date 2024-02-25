import Realtor from "../models/realtor.model.js";
import Member from "../models/member.model.js";
import { v4 as uuidv4 } from 'uuid';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/errors.js'; // Import errorHandler function
import { sendVerificationEmail } from '../utils/emailSender.js'; // Adjust the path as per your project structure
import { generateVerificationCode } from '../utils/helpers.js'; // Import generateVerificationCode function


export const verifyEmail = async (req, res) => {
  try {
    const { email } = req.params; // Get email from URL parameter
    const { verificationCode } = req.body; // Get verification code from request body

    // Fetch the user from the database using the provided email
    const user = await Member.findOne({ email });

    // Check if the user exists and if the verification code matches
    if (!user || user.verificationCode !== verificationCode) {
      return res.status(400).json({ error: 'Invalid verification code' });
    }

    // Mark the user's email as verified in the database
    user.isVerified = true;
    await user.save();

    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};


export const verifyEmailLink = async (req, res, next) => {
   try {
      const { email, verificationCode } = req.query;

      // Check if any required parameter is missing
      if (!email || !verificationCode) {
         throw errorHandler(400, "Email and verification code are required");
      }

      // Find the user with the provided email and verification code
      const user = await Member.findOne({ email, verificationCode });

      // If user is not found or verification code doesn't match, return an error
      if (!user) {
         throw errorHandler(400, "Invalid verification code");
      }

      // Update the user's isVerified field to true
      user.isVerified = true;
      await user.save();

      // Respond with a success message
      res.json({ success: true, message: 'Email verified successfully' });
   } catch (error) {
      // Pass the error to the error-handling middleware
      next(error);
   }
};


export const signup = async (req, res, next) => {
   const { username, email, password, phoneNumber, sponsorCid } = req.body;

   try {
      // Check if any required field is missing or empty
      if (!username || username === '') {
         throw errorHandler(400, "Username is required");
      }
      if (!email || email === '') {
         throw errorHandler(400, "Email is required");
      }
      if (!password || password === '') {
         throw errorHandler(400, "Password is required");
      }
      if (!phoneNumber || phoneNumber === '') {
         throw errorHandler(400, "Phone number is required");
      }
      if (!sponsorCid || sponsorCid === '') {
         throw errorHandler(400, "Sponsor CID is required");
      }

      // Generate unique realtorCid
      const realtorCid = generateUniqueCid();

      const hashedPassword = bcryptjs.hashSync(password, 10);

      // Generate verification code and expiry timestamp
      const { code, expiryTimestamp } = generateVerificationCode();

      const newMember = new Member({
         username,
         email,
         password: hashedPassword,
         phoneNumber,
         sponsorCid,
         realtorCid,
         isVerified: false,
         verificationCode: code,
         expiryTimestamp
      });

      // Save the new realtor to the database
      await newMember.save();

      // After saving to the database, send verification email
      await sendVerificationEmail(email, code, 'signup');

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