// app/routes.js

module.exports = function (app, passport) {
    // Home Page
    app.get('/', function (req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // Login
    app.get('/login', function (req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // Process Login
    app.post('/login', function (req, res, next) {
        console.log('/app/routes.js, login, req.body: ');
        console.log(req.body);
        passport.authenticate('local-login', function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).send({ success: false, message: "Authentication failed" })
            }
            req.login(user, function (err) {
                if (err) {
                    return next(err);
                }
                return res.send(req.user);
            });
        })(req, res, next);
    });

    // Sign Up
    app.get('/signup', function (req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // Process Sign Up
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    // Profile Section
    // We will want this protected so you have to be logged in to visit
    // We will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });

    app.get('/info', isLoggedIn, function (req, res) {
        res.send(req.user);
    });

    // Logout
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    //  Route Middleware to make sure a user is logged in
    function isLoggedIn(req, res, next) {
        // if user is authenticated in the session, carry on
        if (req.isAuthenticated()) {
            console.log("LOGGED IN");
            return next();
        }
        console.log("NOT LOGGED IN");

        // If they aren't redirect them to the home page
        res.redirect('/');
    }
};