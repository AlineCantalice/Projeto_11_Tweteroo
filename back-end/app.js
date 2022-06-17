import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const users = [];
const tweets = [];

app.post('/sign-up', (req, res) => {
    let user = req.body;
    users.push(user);
    res.send('OK');
});

app.post('/tweets', (req, res) => {
    let tweet = req.body;
    tweets.push(tweet);
    res.send('OK');
});

app.get('/tweets', (req, res) => {
    if(tweets.length < 10){
        res.send([...tweets].reverse());
    } else {
        res.send([...tweets].reverse().slice(0, 10));
    }
});

app.listen(5000);