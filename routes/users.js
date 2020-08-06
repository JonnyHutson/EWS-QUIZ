const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
//User model
const User = require('../models/User');
const { db } = require('../models/User');

//Login Page
router.get('/login', (req, res) => res.render('Login'));

//Register Page
router.get('/register', (req, res) => res.render('Register'));



//Update Page
router.get('/update',(req, res) => res.render('Update'));


//Register Handle
router.post('/register', (req,res) =>{
    const{name, email, password, password2 } = req.body;
    let errors =[];

    //Check required fields
    if(!name || !email || !password || !password2){
        errors.push({msg: 'Please fill in all fields'})
    }

    //Check passwords match
    if(password !=password2){
        errors.push({msg: 'Passwords do not match'});
    }

    //Check password length
    if(password.length < 6){
        errors.push({msg: 'Password should be atleast 6 characters long'})
    }

    if(errors.length > 0){
        res.render('register',{
            errors, 
            name,
            email,
            password,
            password2
        });
    }else{
        //Validation passsed
        User.findOne({email: email})
        .then(user =>{
            if(user){
                //User exists
                
                errors.push({msg: 'Email is already registered'})
                res.render('register',{
                    errors, 
                    name,
                    email,
                    password,
                    password2
                });
            }else{
                const newUser = new User({
                    name,
                    email,
                    password
                });

                //Hash Password
                bcrypt.genSalt(10, (err, salt) => 
                    bcrypt.hash(newUser.password, salt, (err, hash) =>{
                        if(err) throw err;
                        //Set password to hashed password
                        newUser.password = hash;

                        //Save User
                        newUser.save()
                        .then(user => {
                            req.flash('success_msg', 'You are now registered and can login');
                            res.redirect('/users/login')
                        })
                        .catch(err => console.log(err));
                }))
            }
        });
    }
});

//Login Handler
router.post('/login', (req, res, next) =>{
    
    console.log(req.body)
    passport.authenticate('local', {
        successRedirect: '/dashboard/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

//Logout Handle
router.get('/logout', (req,res) =>{
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});

//Delete Handle
router.get('/delete', (req,res) =>{
    
    db.collection("users").deleteOne({email: req.user.email}, function(err, obj){
        if(err) throw err;
        console.log(req.user.email)
        console.log("1 document deleted");
        req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
    });
});


//Update Handle

router.post('/update', (req,response) =>{
    
    const{name, email, password } = req.body;
    console.log(password);
        console.log(email);
        var tempPass = password;
        bcrypt.genSalt(10, (error, salt) => 
                    bcrypt.hash(tempPass, salt, (err, hash) =>{
                        if(error) throw err;
                        //Set password to hashed password
                        tempPass = hash;
                        var newvalues = { $set: {name: name, email: email, password: tempPass} };
        db.collection("users").findOneAndUpdate({_id:req.user._id},newvalues, { $multi: true }, (err, res)=> {
            
            if(err) {
                throw err;
              }
              req.flash('success_msg', 'You have successfully update your info');
              response.redirect('/users/login');
            
          });
                    }));
         
        
    console.log(name)
    
    
    
});
module.exports = router;