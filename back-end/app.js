import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const users = [];
const tweets = [];

app.post('/sign-up', (req, res) => {
    const { username, avatar } = req.body;
    if (!isEmpty(username) && isValidType(username) && isValidUrl(avatar)) {
        users.push(req.body);
        res.status(201).send('OK');
    } else {
        res.status(400).send('“Todos os campos são obrigatórios!');
    }
});

app.post('/tweets', (req, res) => {
    const user = req.headers.user;
    const { tweet } = req.body;
    const { avatar } = users.find(u => u.username === user);
    if (!isEmpty(user) && isValidType(user) && !isEmpty(tweet) && isValidType(tweet) && isValidUrl(avatar)) {
        tweets.push({
            username: user,
            avatar: avatar,
            tweet: tweet
        });
        res.status(201).send('OK');
    } else {
        res.status(400).send('“Todos os campos são obrigatórios!');
    }
});

app.get('/tweets', (req, res) => {
    if (isEmpty(req.body)) {
        res.sendStatus(400);
    } else {
        const page = req.query.page;
        if (tweets.length > 0 && page > Math.ceil(tweets.length / 10)) {
            res.status(400).send('Informe uma página válida!');
        } else {
            const pageTweets = [];
            for (let i = tweets.length - (page - 1) * 10 - 1; (i > -1 && i >= tweets.length - page * 10); i--) {
                pageTweets.push(tweets[i]);
            }
            res.send(pageTweets);
        }
    }
});

app.get('/tweets/:username', (req, res) => {
    const user = req.params.username;
    if (isEmpty(user) || !isValidType(user) ) {
        res.sendStatus(400);
    } else {
        const userTweets = tweets.filter(u => u.username === user);
        res.send(userTweets);
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
    if (!isEmpty(url) && isValidType(url) ) {
        if (URL_REGEX.test(url)) {
            return true;
        }
        return false;
    }
    return false;
}

function isValidType(obj) {
    if (typeof obj === 'string') {
        return true;
    }
    return false;
}

app.listen(5000);