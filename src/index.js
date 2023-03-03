import express from 'express';
import bodyParser from 'body-parser';

import connect from './config/db-config.js';
import apiRoute from './routes/index.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', apiRoute);


app.listen(8000, async () =>{
    console.log('Server Started on port 8000');
    await connect();
    console.log("mongoDB connected");
})