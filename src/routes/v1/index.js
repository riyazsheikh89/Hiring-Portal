import express from 'express';

import { signUp, login, getAllUser, uploadResume, getUser } from '../../controller/user-controller.js';
import { authenticate } from '../../middlewares/authentication.js';

const router = express.Router();


router.post('/signup', signUp);  
router.post('/login', login);
router.post('/upload/:id', authenticate, uploadResume);

router.get('/users', getAllUser);
router.get('/getuser', getUser);


export default router;
