// src/config/passport-config.ts
// The passport configuration file

// Imports
import { PassportStatic } from "passport";
import { Strategy } from "passport-local";
import { IUserModel, User } from "../models/user";

export const passportSetup = (passport: PassportStatic) => {
    // For persistent login sessions

    // Serialize User
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    // Deserialize User
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    // Local Signup
    passport.use("local-signup", new Strategy({
        passReqToCallback: true,
        passwordField: "password",
        usernameField: "email"
    }, (req, email, password, done) => {
        // Async
        // User.findOne won't fire unless data is sent back
        User.findOne({ "local.email": email }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (user) {
                return done(null, false);
            } else {
                const newUser: IUserModel = new User();
                newUser.local.email = email;
                newUser.local.password = newUser.generateHash(password);
                newUser.save((error) => {
                    if (error) {
                        throw error;
                    }
                    return done(null, newUser);
                });
            }
        });
    }));

    // Local Login
    passport.use("local-login", new Strategy({
        passReqToCallback: true,
        passwordField: "password",
        usernameField: "email"
    }, (req, email, password, done) => {
        User.findOne({ "local.email": email }, (err, user) => {
            if (err) {
                console.log(err);
                return done(err);
            }
            if (!user) {
                console.log("User does not exist.");
                return done(null, false, { message: "No user." });
            }
            if (!user.validPassword(password)) {
                console.log("Wrong password");
                return done(null, false, { message: "Wrong password." });
            }
            return done(null, user);
        });
    }));

};
