const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();

//Passport config
require('./config/passport')(passport);

//DB Config
const db = require('./config/keys').MongoURI;

//Connect to Mongo
mongoose.connect(process.env.MONGODB_URI || db, {useUnifiedTopology: true, useNewUrlParser:true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')

//Bodyparser
app.use(express.urlencoded({extended: false}));

//Express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));


//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Connect Flash
app.use(flash());

//Global Variables
app.use((req,res,next) =>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
