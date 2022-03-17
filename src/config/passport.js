import passport from 'passport';
import useLocalStrategy from './strategies/local.strategy.js';

function passportConfig(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    useLocalStrategy();
}

export default passportConfig;