const { discover } = require('@eschoellhorn/deadlights');
const express = require('express');
const mustacheExpress = require('mustache-express');

const app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

(async function main() {
    const bulbs = await discover();

    // Render Web UI
    app.get('/', (req, res) => {
        res.render('index', {
            bulbCount: bulbs.length,
        });
    });

    // API endpoint for turning on ALL bulbs
    app.get('/on', (req, res) => {
        console.log('Turning all bulbs ON!');
        bulbs.forEach(bulb => bulb.switchOn());
        res.end('Bulbs on.');
    });

    // API endpoint for turning off ALL bulbs
    app.get('/off', (req, res) => {
        console.log('Turning all bulbs OFF!');
        bulbs.forEach(bulb => bulb.switchOff());
        res.end('Bulbs off.');
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`API Listening on port ${PORT}!`));
}());
