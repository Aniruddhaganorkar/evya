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

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://evya-frontend.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(cors({ origin: '*' }));
// app.options('*', cors(corsOptions)); 
// app.use(cors());
app.use(helmet()); // Add security headers

// Routes
app.use('/v1/members', memberRouter);


// Start server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
