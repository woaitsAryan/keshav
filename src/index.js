import express from 'express';
import expressMongoSanitize from 'express-mongo-sanitize';
import cors from 'cors';
import user from './routes/user.js';
import auth from './routes/auth.js';
import connectToDB from './init/db.js';

const app = express();


app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

app.use(cors({
    origin: '*' // Allow requests from any origin
}));

app.use(expressMongoSanitize());

connectToDB();

app.use('/auth', auth);
app.use('/user', user);

app.listen(3010,() => {
    console.log('Server started on port 3010')
});

export default app;