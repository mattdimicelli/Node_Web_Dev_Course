import express from 'express';
import chalk from 'chalk';
import debugUninitialized from 'debug';
import morgan from 'morgan';
import path, { dirname } from 'path';  //dirname gives you the absolute path to the parent dir of 
// the given file
import passport from 'passport';  // maintains your user object in the session
import { fileURLToPath } from 'url';
const debug = debugUninitialized('app');
const __filename = fileURLToPath(import.meta.url);  //converts a file URL (eg. 'file://nas/foo.text')
// to a valid cross-platform absolute path string, ensuring correct decoding of percent-encoded chars
const __dirname = dirname(__filename);
import cookieParser from 'cookie-parser';
import session from 'express-session';
// only the session ID is stored in the cookie.  session data is stored server-side
// reads and writes cookies directly on req/res
// if cookie parser is used (it doesn't have to be, the secret must be the same b/t express-session)
// and cookie-parser
// the default server-side session storage, MemoryStore, is not designed for production
import configurePassport from './src/config/passport.js';


const app = express();
const PORT = process.env.PORT  || 3000;
import sessionsRouter from './src/routes/sessionsRouter.js';
import adminRouter from './src/routes/adminRouter.js';
import authRouter from './src/routes/authRouter.js';

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'globomantics', resave: false, saveUninitialized: false }));

configurePassport(app);

app.set('views', './src/views/');  //app.set() allows us to set variables in the context of our app
app.set('view engine', 'ejs');

app.use('/admin', adminRouter);
app.use('/sessions', sessionsRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(PORT, () => {
    debug(`Listening on port ${chalk.green(PORT)}`);
});

