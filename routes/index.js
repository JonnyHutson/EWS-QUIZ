const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');
//Welcome page
router.get('/', (req, res) => res.render('welcome'));

//Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => 
res.render('dashboard',{
    name: req.user.name
}));

router.get('/users/register', (req, res) => res.render('register'));
router.get('/users/login', (req, res) => res.render('login'));


router.get('/users/update', ensureAuthenticated, (req, res) =>
res.render('update',{
    name: req.user.name,
    email: req.user.email,
    password: req.user.password
}));
router.get('/quiz/quiz', ensureAuthenticated, (req, res) =>
res.render('update',{
    name: req.user.name,
    email: req.user.email,
    password: req.user.password
}));
module.exports = router;