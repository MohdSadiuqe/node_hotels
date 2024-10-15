const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const Person = require("./models/Person");

// Authentication Strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // console.log('Received credentials:', username, password);

      // Find the user by username
      const user = await Person.findOne({ username: username });

      // Compare the entered password with the stored password

      const isPasswordMatch = await user.comparePassword(password);

      // If no user is found, return false
      if (!user) {
        return done(null, false, { message: "Incorrect Username." });
      }

      // If the password matches, return the user object
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        // If the password doesn't match, return false
        return done(null, false, { message: "Incorrect Password." });
      }
    } catch (err) {
      // Handle any errors that occur during the process
      return done(err);
    }
  })
);

module.exports = passport;