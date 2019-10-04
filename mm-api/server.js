// server.js

// Set up =====================================================================
// Get all the tools we need
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');


var configDB = require('./config/database');


// Configuration ==============================================================
mongoose.connect(configDB.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}); // Connect to our database

require('./config/passport')(passport); // pass passport for configuration

// Set up our express application
app.use(morgan('dev')); // Log every request to the console.
app.use(cookieParser()); // Read cookies (needed for auth)
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
// Get information from HTML forms
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.set('view engine', 'ejs'); // set up ejs for templating


// required for passport
app.use(session({
    secret: 'ilovenancy',
    resave: false,
    saveUninitialized: false
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // Persistent login sessions
app.use(flash()); // Use connect-flash for flash messages stored in session


// Routes =====================================================================
require('./app/routes')(app, passport); // Load routes and pass app & passport


// Launch =====================================================================
app.listen(port);
console.log('The magic happens on port ' + port);