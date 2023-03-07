import express from 'express';

import { signUp, login, getAllUser, uploadResume, getUser } from '../../controller/user-controller.js';
import { authenticate } from '../../middlewares/authentication.js';

const router = express.Router();


router.post('/signup', signUp);  
router.post('/login', login);
router.get('/users', getAllUser);
router.post('/upload/:id', uploadResume);
router.get('/getuser', getUser);


export default router;
