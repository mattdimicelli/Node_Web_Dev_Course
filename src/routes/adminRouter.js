import express from 'express';
import { MongoClient } from 'mongodb';
import debugUninitialized from 'debug';
const debug = debugUninitialized('app:adminRouter');
import { readFileSync } from 'fs';
const sessions = JSON.parse(
    readFileSync(new URL ('../data/sessions.json', import.meta.url))
);

const adminRouter = express.Router();

adminRouter.route('/').get((req, res) => {
    const URL = 'mongodb+srv://mrd2689a_globomantics:Ua2QNisYENTc6t@globomantics' +
    '.sehz7.mongodb.net/globomantics?retryWrites=true&w=majority';

    const DB_NAME = 'globomantics';

    (async () => {
        let client;
        try {
            client = await MongoClient.connect(URL);
            debug('Connected to MongoDB');

            const db = client.db(DB_NAME);  //if name of db is not provided, use the name from the
            // connection string

            const response = await db.collection('sessions').insertMany(sessions);
            res.json(response);
        }
        catch(err) {
            debug(err.stack);
        }
        client.close();
    })();
})


export default adminRouter;