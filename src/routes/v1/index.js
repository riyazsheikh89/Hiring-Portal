import express from 'express';

import { signUp, login, getAllUser, uploadResume, getUser } from '../../controller/user-controller.js';
import { authenticate } from '../../middlewares/authentication.js';

const router = express.Router();


router.post('/signup', signUp);  
router.post('/login', login);
router.post('/upload', authenticate, uploadResume);

router.get('/users', authenticate, getAllUser);
router.get('/getuser', authenticate, getUser);


export default router;
