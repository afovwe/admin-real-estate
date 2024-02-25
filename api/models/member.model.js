import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    realtorCid: String,
    sponsorCid: String,
    avatar: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationCode: String,
    package: {
        type: String,
        default: 'starter'
    },
    expiryTimestamp: {
        type: Number,
        default: 120 // 2 minutes converted to seconds
    }
}, { timestamps: true });

const Member = mongoose.model('Member', memberSchema);

export default Member;
