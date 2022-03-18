import passport from 'passport';
import useLocalStrategy from './strategies/local.strategy.js';

function passportConfig(app) {
    app.use(passport.initialize());
    app.use(passport.session());  //required if using persistent login sessions.
    // persistent login sessions are not necessary

    useLocalStrategy();

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    // serialization and deserialization of the user to the session is necessary
    // for persistent login sessions to work

}

export default passportConfig;