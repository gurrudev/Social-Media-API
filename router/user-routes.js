import express from 'express'
import UserCotroller from '../controller/user-controller.js';

const router = express.Router();

router.get('/', UserCotroller.getAllUser)
router.post('/signup',UserCotroller.signUp)
router.post('/login',UserCotroller.logIn)

export default router;