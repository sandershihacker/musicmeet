// config/passport.js

// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var User = require('../app/models/user');

// expose this function to our app using module.exports
module.exports = function (passport) {
    // For persistent login sessions

    // serialize user
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // deserialize user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    // Local signup
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, done) {
        // Async
        // User.findOne won't fire unless data is sent back
        process.nextTick(function () {
            // Find user whose email is the same as the forms email
            // Checking to see if the user trying to login already exists
            User.findOne({ 'local.email': email }, function (err, user) {
                if (err) {
                    return done(err);
                }

                if (user) {
                    return done(null, false, req.flash('signupMessage', 'That email is taken'));
                } else {
                    var newUser = new User();

                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);
                    newUser.save(function (err) {
                        if (err) {
                            throw err;
                        }
                        return done(null, newUser);
                    });
                }
            });
        });
    }));

    // Local Login
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, done) {
        User.findOne({ 'local.email': email }, function (err, user) {
            if (err) {
                console.log(err);
                return done(err);
            }

            if (!user) {
                console.log("No user");
                return done(null, false, { message: "No user" });
            }

            if (!user.validPassword(password)) {
                console.log("Wrong password");
                return done(null, false, { message: "Wrong password" });
            }

            return done(null, user);
        });
    }));
};