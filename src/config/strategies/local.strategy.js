import passport from 'passport';
import { Strategy } from 'passport-local';
import debugUninitialized from 'debug';
const debug = debugUninitialized('app:localstrategy');

function localStrategy() {
    debug('boom')
    passport.use(
        new Strategy(
          {
            usernameField: 'username',
            passwordField: 'password',
          },
          (username, password, done) => {
        debug('boom2')
        const user = { username, password, name: 'Matt' };
        done(null, user);
    }));
}
export default localStrategy;