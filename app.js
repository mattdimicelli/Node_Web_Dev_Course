import express from 'express';
import chalk from 'chalk';
import debugUninitialized from 'debug';
import morgan from 'morgan';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const debug = debugUninitialized('app');
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import sessionsRouter from './src/routes/sessionsRouter.js';
import adminRouter from './src/routes/adminRouter.js';
import authRouter from './src/routes/authRouter.js';
import passport from 'passport';  //maintains your user object in the session
import cookieParser from 'cookie-parser';
import session from 'express-session';
import configurePassport from './src/config/passport.js';


const app = express();
const PORT = process.env.PORT  || 3000;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'globomantics', resave: true, saveUninitialized: true }));
/* The default value is true, but using the default has been deprecated, as the default will change 
in the future. Please research into this setting and choose what is appropriate to your use-case. 
Typically, you'll want false.

How do I know if this is necessary for my store? The best way to know is to check with your store if 
it implements the touch method. If it does, then you can safely set resave: false. If it does not 
implement the touch method and your store sets an expiration date on stored sessions, then you 
likely need resave: true. */
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

