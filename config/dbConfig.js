import mongoose  from "mongoose"; 
import dotenv from 'dotenv';
dotenv.config();

const dbConnect = () =>{
    try {
        mongoose.connect(`mongodb+srv://${process.env.MONGO_CRED}`).then(()=>{
            console.log('DB Connected :)')
        }).catch((e)=>{
            console.log(e)
        })
    } catch (error) {
       console.log(error) 
    }
}

export default dbConnect;