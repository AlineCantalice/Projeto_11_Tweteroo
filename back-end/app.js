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
    res.send(users);
});

app.listen(5000);