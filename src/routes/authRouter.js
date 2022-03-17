import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import debugUninitialized from 'debug';
const debug = debugUninitialized('app:authRouter');
import passport from 'passport';

const authRouter = express.Router();

authRouter.route('/signUp').post((req, res) => {
    // console.log(req.body);
    // res.json(req.body);

    //TODO: create user

    const { username, password } = req.body;
    const URL = 'mongodb+srv://mrd2689a_globomantics:Ua2QNisYENTc6t@globomantics' +
                '.sehz7.mongodb.net/globomantics?retryWrites=true&w=majority';

    const DB_NAME = 'globomantics';
    (async function addUser() {
        try {
            const client = await MongoClient.connect(URL);
            const db = client.db(DB_NAME);
            const { insertedId } = await db.collection('users').insertOne({ username, password });
            const user = await db.collection('users').findOne({ _id: insertedId});
            debug(user);
            req.login(user, () => {
                res.redirect('/auth/profile');
            });
        }
        catch(err) {
            debug(err);
        }
    })();
});

authRouter.route('/signin')
    .get((req, res) => {
        res.render('signin');
    })
    .post(passport.authenticate('local', {
    successRedirect: '/auth/profile',
    failureMessage: '/',
    }));

authRouter.route('/profile').get((req, res) => {
    res.json(req.user);
})

export default authRouter;