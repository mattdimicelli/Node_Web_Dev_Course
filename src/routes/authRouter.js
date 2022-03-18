import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import debugUninitialized from 'debug';
const debug = debugUninitialized('app:authRouter');
import passport from 'passport';

const authRouter = express.Router();

authRouter.route('/signUp').post((req, res) => {
    // console.log(req.body);
    // res.json(req.body);

    const { username, password } = req.body;
    const URL = 'mongodb+srv://mrd2689a_globomantics:Ua2QNisYENTc6t@globomantics' +
                '.sehz7.mongodb.net/globomantics?retryWrites=true&w=majority';

    const DB_NAME = 'globomantics';
    (async function addUser() {
        let client;
        try {
            client = await MongoClient.connect(URL);
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
        client.close();
    })();
});

authRouter.route('/signIn')
    .get((req, res) => {
        console.log(req.user);
        res.render('signin');
    })
    .post(passport.authenticate('local', {
        successRedirect: '/auth/profile',
        failureRedirect: '/',
    }));

authRouter.route('/profile').get((req, res) => {
    res.json(req.user);

})

export default authRouter;