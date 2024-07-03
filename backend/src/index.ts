import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import memberRouter from './routers/memberRoute.js';

dotenv.config();
const PORT = process.env.PORT || 8080;
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors({
//     origin: ['https://evya-frontend.vercel.app'],
//     methods: ['POST', 'PUT', 'GET', 'DELETE'],
//     credential: true
// }));
app.use(cors({
  origin: 'https://evya-frontend.vercel.app'
}));
// app.use(cors());
app.use(helmet()); // Add security headers

// Routes
app.use('/v1/members', memberRouter);


// Start server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
