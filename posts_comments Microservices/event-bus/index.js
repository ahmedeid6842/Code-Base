const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const events = [];
app.post('/events', (req, res) => {
    const event = req.body;
    events.push(event);

    axios.post('http://posts-clusterip-srv:4000/events', event);
    axios.post('http://comments-clusterip-srv:4001/events', event);
    axios.post('http://queries-clusterip-srv:4002/events', event);
    axios.post('http://moderations-clusterip-srv:4003/events', event);

    res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
    res.send(events);
});

app.listen(4005, () => {
    console.log('Listening on 4005');
});
