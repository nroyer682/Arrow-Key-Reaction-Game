'use strict';

const express = require('express');
const path = require('path');
const port = 8080;
const app = express();
app.use(express.json());

//route
app.use(express.static(path.join(__dirname, '../frontend')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/home.html'));
});


let scores = [];

app.get('/leaderboard', (req, res) => {
    console.log("leaderboard endpoint hit");
    const leaderboard = scores.sort((a, b) => b.score - a.score).slice(0, 10);
    console.log("leaderboard data:", leaderboard);
    res.json(leaderboard);
});

app.post('/submit-score', (req, res) => {
    const { playerName, score } = req.body;

    if (!playerName || score == null) {
        return res.status(400).json({ error: "Invalid data"});
    }

    scores.push({ playerName, score });
    console.log("New score added:", { playerName, score });
    
    res.json({ message: 'Score submitted' });
});
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});

