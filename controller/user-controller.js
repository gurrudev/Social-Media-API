import bcrypt from 'bcryptjs'
import User from "../models/User.js";

class UserCotroller {
    static getAllUser = async (req, res, next) => {

        let users;

        try {
            users = await User.find();
        } catch (err) {
            console.log(err);
        }

        if (!users) {
            return res.status(404).json({ message: 'No users found' });
        }

        return res.status(200).json({ users })
    }

    static signUp = async (req, res, next) => {

        const { name, email, password } = req.body
        let existingUser;

        try {
            existingUser = await User.findOne({ email })
        } catch (err) {
            return console.error(err);
        }

        if (existingUser) {
            return res.status(200).json({ message: 'User already exists!, Login insted' })
        }

        const hashedPassword = bcrypt.hashSync(password)
        
        const user = new User({
            name,
            email,
            password : hashedPassword,
            blogs: []
        });


        try {
            await user.save()
        } catch (err) {
            console.log(err);
        }
        return res.status(201).json({ user })
    }

    static logIn = async(req, res, next) =>{
        const {email, password} = req.body;

        let existingUser;
        
        try {
            existingUser = await User.findOne({email})
        } catch (err) {
            return console.log(err)
        }

        if(!existingUser){
            return res.status(404).json({message: 'User not found'})
        }

        const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)

        if(!isPasswordCorrect){
            return res.status(400).json({message: 'Invalid password'})
        }

        return res.status(200).json({message:'Login successful'})
    }
}

export default UserCotroller;


