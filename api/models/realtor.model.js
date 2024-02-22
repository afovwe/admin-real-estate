import mongoose from 'mongoose';

const realtorSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },     
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
     realtorCid: {
      type: String,
      required: true,
      unique: true,
    },
      sponsorCid: {
      type: String,
      required: true,
      
    },
    avatar:{
      type: String,
      default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
    isVerified: {
      type: Boolean,
      default: false, // Initial status set to false
    },
  },
  { timestamps: true }
);

const Realtor = mongoose.model('Realtor', realtorSchema);

export default Realtor;
