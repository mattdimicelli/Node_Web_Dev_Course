import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import debugUninitialized from 'debug';
const debug = debugUninitialized('app:authRouter');

const authRouter = express.Router();

authRouter.route('/signUp').post((req, res) => {
    console.log(req.body);
    res.json(req.body);
})

export default authRouter;