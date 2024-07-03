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
const corsOptions = {
  origin: 'https://evya-frontend.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
})
app.use(cors());
// app.options('*', cors(corsOptions)); 
// app.use(cors());
app.use(helmet()); // Add security headers

// Routes
app.use('/v1/members', memberRouter);


// Start server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
