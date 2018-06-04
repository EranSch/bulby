const { discover } = require('@eschoellhorn/deadlights');
const express = require('express');

async function main() {
    const app = express();
    const bulbs = await discover();

    app.get('/on', () => bulbs.forEach(bulb => bulb.switchOn()));
    app.get('/off', () => bulbs.forEach(bulb => bulb.switchOff()));

    app.listen(3000, () => console.log('API Listening!'));
}

main();
