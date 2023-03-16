import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';

import { PORT } from './config/env-variables.js';
import { passportAuth } from './config/jwt-strategy.js';
import connect from './config/db-config.js';
import apiRoute from './routes/index.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(passport.initialize());
passportAuth(passport);

app.use('/api', apiRoute);


app.listen(PORT, async () =>{
    console.log(`Server Started on port: ${PORT}`);
    await connect();
    console.log("mongoDB connected");
});