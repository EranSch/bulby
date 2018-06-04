const { discover } = require('@eschoellhorn/deadlights');
const express = require('express');

const PORT = process.env.PORT || 3000;

(async function main() {
    const app = express();
    const bulbs = await discover();

    app.get('/on', (req, res) => {
        console.log('Turning all bulbs ON!');
        bulbs.forEach(bulb => bulb.switchOn());
        res.end('Bulbs on.');
    });

    app.get('/off', (req, res) => {
        console.log('Turning all bulbs OFF!');
        bulbs.forEach(bulb => bulb.switchOff());
        res.end('Bulbs off.');
    });

    app.listen(PORT, () => console.log(`API Listening on port ${PORT}!`));
}());
