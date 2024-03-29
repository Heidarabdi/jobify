import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';

import jobRouter from './routes/jobRouter.js';
import authRouter from "./routes/authRouter.js";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import {authenticateUser} from "./middleware/authMiddleware.js";
import userRouter from "./routes/userRouter.js";

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';




dotenv.config();
const app = express();
const PORT = process.env.PORT || 5100;

// static files
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, './client/dist')));

// cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

// middlewares
if(process.env.NODE_ENV === 'DEVELOPMENT'){
    app.use(morgan('dev'));
}
app.use(cookieParser());
app.use(express.json());



// routes
app.use('/api/v1/jobs' , authenticateUser, jobRouter);
app.use('/api/v1/users' , authenticateUser, userRouter);
app.use('/api/v1/auth' ,authRouter);

// handle production
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
});


// not found middleware
app.use('*', (req, res) => {
    res.status(404).json({error: 'not found'});
});

// error handler middleware
app.use(errorHandlerMiddleware);

// listen
try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(PORT, () => {
        console.log(`Server is running on port localhost:${PORT}`);
    });
}
catch (e) {
    console.log(e);
    process.exit(1);
}

