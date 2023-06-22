import mongoose from "mongoose";
import Blogs from "./Blog";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type:String,
        unique :true,
        required: true
    },
    password: {
        type: String,
        required : true,
        minlength: 6,
    },
    blogs:[{type: mongoose.Types.ObjectId, ref:"Blog", required: true}]
    
})

const User = mongoose.model('User', userSchema);

export default User;