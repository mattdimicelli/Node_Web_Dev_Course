import express from 'express';
import { readFileSync } from 'fs';
const sessions = JSON.parse(
    readFileSync(new URL ('../data/sessions.json', import.meta.url))
);
import { MongoClient, ObjectId } from 'mongodb';
import debugUninitialized from 'debug';
const debug = debugUninitialized('app:sessionsRouter');

const sessionsRouter = express.Router();

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
            res.render('session', { session });    
        }
        catch(err) {
            debug(err.stack);
        }
    })();
});


export default sessionsRouter;