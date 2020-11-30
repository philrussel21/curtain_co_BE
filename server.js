if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes/routes');

// USES PROVIDED PORT FROM PRODUCTION, OTHERWISE
// USES PORT 5000
const port = process.env.PORT || 5000;

// SERVER PORT LISTENING TO
const server = app.listen(port, () => {
  console.log('listening on port:' + port);
});

// MONGODB
const dbConnection = process.env.CONNECT_DB;
// Set three properties to avoid deprecation warnings:
mongoose.connect(dbConnection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}, (err) => {
  if (err)
    console.log('Error connecting to database', err);
  else
    console.log('Connected to database!');
});

// ALLOWING PARAMS TO COME AS REQ.BODY
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// HOME PAGE
app.get('/', (req, res) => {
  res.status(200).json({ welcome_message: 'Hello World!' });
});

// ALL OTHER ROUTES
app.use('/api', routes);

module.exports = { app, server };