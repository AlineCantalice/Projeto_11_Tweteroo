import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const users = [];
const tweets = [];

app.post('/sign-up', (req, res) => {
    users.push(req.body);
    res.send('OK');
});

app.post('/tweets', (req, res) => {
    const { username, tweet } = req.body;
    const { avatar } = users.find(user => user.username === username);
    tweets.push({
        username: username,
        avatar: avatar,
        tweet: tweet
    });
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