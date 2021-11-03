const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const student = require("../models/student")

//Called during login/sign up.
passport.use(new LocalStrategy(student.authenticate()))

//called while after logging in / signing up to set user details in req.user
