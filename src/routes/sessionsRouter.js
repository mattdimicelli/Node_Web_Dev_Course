import express from 'express';
import { readFileSync } from 'fs';
const sessions = JSON.parse(
    readFileSync(new URL ('../data/sessions.json', import.meta.url))
);
import { MongoClient, ObjectId } from 'mongodb';
import debugUninitialized from 'debug';
const debug = debugUninitialized('app:sessionsRouter');
import speakerService from '../services/speakerService.js';

const sessionsRouter = express.Router();

sessionsRouter.use((req, res, next) => {
    if (req.user) {  // if passport has put a user object into the equest object
        next();
    }
    else {
        res.redirect('/auth/signIn');
    }
});

sessionsRouter.route('/').get((req, res) => {
    const URL = 'mongodb+srv://mrd2689a_globomantics:Ua2QNisYENTc6t@globomantics' +
                '.sehz7.mongodb.net/globomantics?retryWrites=true&w=majority';

    const DB_NAME = 'globomantics';

    (async () => {
        let client;
        try {
            client = await MongoClient.connect(URL);
            debug('Connected to MongoDB');

            const db = client.db(DB_NAME);

            const sessions = await db.collection('sessions').find().toArray();
            res.render('sessions', { sessions });    
        }
        catch(err) {
            debug(err.stack);
        }
        client.close();
    })();
});

sessionsRouter.route('/:id').get((req, res) => {
    const id = req.params.id;
    const URL = 'mongodb+srv://mrd2689a_globomantics:Ua2QNisYENTc6t@globomantics' +
                '.sehz7.mongodb.net/globomantics?retryWrites=true&w=majority';

    const DB_NAME = 'globomantics';

    (async () => {
        let client;
        try {
            client = await MongoClient.connect(URL);
            debug('Connected to MongoDB');

            const db = client.db(DB_NAME);

            const session = await db.collection('sessions').findOne({ _id: ObjectId(id)});
            const speakerId = session.speakers[0].id;
            const speaker = await speakerService().getSpeakerById(speakerId);
            res.render('session', { session, speaker });    
        }
        catch(err) {
            debug(err.stack);
        }
        client.close();
    })();
});


export default sessionsRouter;