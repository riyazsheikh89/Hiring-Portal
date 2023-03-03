import express from 'express';

import { signUp, login, getAllUser } from '../../controller/user-controller.js';

const router = express.Router();


router.post('/signup', signUp);  
router.post('/login', login);
router.get('/users', getAllUser);                       


export default router;
