import mongoose from "mongoose";    

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
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
        image: {
            type: String,
            default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        },
        address: {
            type:String,
            default:'',
        },
        gender: {
            type: String,
            default:"Not specified",
        },
        dob: {
            type: String,
            default:"Not specified",
        },
        phone: {
            type: String,
            default:'0000000000'
        },

        });
        const User = mongoose.model('User', userSchema);
    export default User;
      