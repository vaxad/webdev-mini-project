const connectMongo = require('./db');
const dotenv = require('dotenv');

dotenv.config();
connectMongo();

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const port = 5000;

const loggerMiddleware = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
};

const afterResponseMiddleware = (req, res, next) => {
  const startTime = new Date();
  res.on("finish", () => {
    const endTime = new Date();
    const responseTime = endTime - startTime;
    console.log(`[${new Date().toISOString()}] Response sent: ${res.statusCode} ${res.statusMessage} (${responseTime}ms)`);
  });
  next();
};

app.use(loggerMiddleware);
app.use(afterResponseMiddleware);

app.use(express.json());
app.use('/auth', require('./routes/auth'));
app.use('/secrets', require('./routes/secrets'));
app.use('/games', require('./routes/game'));

app.get('/', async (req, res) => {
  res.send("server is working");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})