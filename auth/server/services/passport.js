const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create local strategy
const localOptions = { usernameField: 'email' }; // just to set that if it searchs for user has to loook at email
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  // Verify this email and password, call done with the user
  // if it is the correct email and password
  // otherwise, call done with false
  User.findOne({ email: email }, function(err, user) {
    if (err) { return done(err); }// err in the operation
    if (!user) { return done(null, false); } // no err but email (so user) not found

    // compare passwords - is `password` equal to user.password?
    user.comparePassword(password, function(err, isMatch) { //comparePassword is a method we created in user
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false); }

      return done(null, user);
    });
  });
});

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),//where to find the jtw (in this case header-authorization from the request)
  secretOrKey: config.secret //what to use to decript the token (so we can have the user id back)
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if the user ID in the payload exists in our database
  // If it does, call 'done' with that user
  // otherwise, call done without a user object
  User.findById(payload.sub, function(err, user) {// payload is the obj created with jwt.encode attached to the token in the db 
    if (err) { return done(err, false); } // if there is an err and we cannot find user (coz of the err)

    if (user) {
      done(null, user);// there is no err an we find a user
    } else {
      done(null, false);// there is no err but we don't find the user
    }
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
