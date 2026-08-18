import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'name is important'],
        trim : true
    },
    email: {
        type: String,
        required: [true,'email is important'],
        unique: true,
        trim : true
    },
    password: {
        type: String,
        required: [true, "password is required"]
    }
});

export default mongoose.model("User",userSchema)