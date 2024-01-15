import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import jobRouter from './routes/jobRouter.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5100;

// middlewares
if(process.env.NODE_ENV === 'DEVELOPMENT'){
    app.use(morgan('dev'));
}
app.use(express.json());



// routes
app.use('/api/v1/jobs', jobRouter);


// not found middleware
app.use('*', (req, res) => {
    res.status(404).json({error: 'not found'});
});

// error handler middleware
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({error: 'something went wrong'});
});

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

