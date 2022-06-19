import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const users = [];
const tweets = [];

app.post('/sign-up', (req, res) => {
    const { username, avatar } = req.body;
    if (!isEmpty(username) && isValidUrl(avatar)) {
        users.push(req.body);
        res.status(201).send('OK');
    } else {
        res.status(400).send('“Todos os campos são obrigatórios!');
    }
});

app.post('/tweets', (req, res) => {
    const { username, tweet } = req.body;
    const { avatar } = users.find(user => user.username === username);
    if (!isEmpty(username) && !isEmpty(tweet) && isValidUrl(avatar)) {
        tweets.push({
            username: username,
            avatar: avatar,
            tweet: tweet
        });
        res.status(201).send('OK');
    } else {
        res.status(400).send('“Todos os campos são obrigatórios!');
    }
});

app.get('/tweets', (req, res) => {
    if (tweets.length < 10) {
        res.send([...tweets].reverse());
    } else {
        res.send([...tweets].reverse().slice(0, 10));
    }
});

function isEmpty(obj) {
    const objValues = Object.values(obj);
    if (obj === '') {
        return true;
    }
    return false;
}

function isValidUrl(url) {
    const URL_REGEX = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gmi;
    if (!isEmpty(url)) {
        if (URL_REGEX.test(url)) {
            return true;
        }
        return false;
    }
    return false;
}

app.listen(5000);