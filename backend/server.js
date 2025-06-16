const path = require('path'); // Built into Node
const express = require('express');
const logger = require('morgan');
const app = express();
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// Process the secrets/config vars in .env
require('dotenv').config();

// Connect to the database
require('./db');

// MIDDLEWARE
app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// JWT Authentication Middleware BEFORE protected routes
app.use(require('./middleware/checkToken'));

// PUBLIC ROUTES (No Auth Required)
app.use('/api/auth', require('./routes/auth'));

// PROTECTED ROUTES (Require token - checkToken adds req.user)
app.use('/api/profile', ensureLoggedIn, require('./routes/profileRoute'));
app.use('/api/patrons', ensureLoggedIn, require('./routes/patronRoute'));
app.use('/api/strands', ensureLoggedIn, require('./routes/strandRoute'));

// CATCH-ALL for SPA Routing (React)
app.get('/*splat', function (req, res) {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// START SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`The express app is listening on ${port}`);
});





