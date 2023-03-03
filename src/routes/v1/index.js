import express from 'express';

import { signUp, login, getAllUser, uploadResume } from '../../controller/user-controller.js';
import { authenticate } from '../../middlewares/authentication.js';

const router = express.Router();


router.post('/signup', signUp);  
router.post('/login', login);
router.get('/users', authenticate, getAllUser);
router.post('/upload', uploadResume);


export default router;
