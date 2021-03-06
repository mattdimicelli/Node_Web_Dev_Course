import passport from 'passport';
import LocalStrategy from 'passport-local';
import debugUninitialized from 'debug';
const debug = debugUninitialized('app:localStrategy');
import { MongoClient } from 'mongodb';

function localStrategy() {
    passport.use(new LocalStrategy((username, password, done) => {
        const URL = process.env.MONGODB_URI;

        const DB_NAME = 'globomantics';
        (async function validateUser() {
            let client;
            try {
                client = await MongoClient.connect(URL);
                debug('Connected to MongoDB');
                const db = client.db(DB_NAME);
                const user = await db.collection('users').findOne({ username });
                if (user && user.password === password) {
                    done(null, user);
                }
                else {
                    done(null, false);
                }
            }
            catch(err) {
                done(err, false);
            }
            client.close();
        })();
    }));
}
export default localStrategy;