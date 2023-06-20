import bcryptjs from 'bcryptjs'
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

        const user = new User({
            name,
            email,
            password
        });

        try {
            await user.save()
        } catch (err) {
            console.log(err);
        }
        return res.status(201).json({ user })
    }
}

export default UserCotroller;


