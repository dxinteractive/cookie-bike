//
// Arduino > Cookie Bike App
//

const five = require("johnny-five");
const board = new five.Board();
const pin = 2;
const sleepWhenLongerThan = 3000;
const ignoreIntervalLessThan = 100;

let interval = 0;
let lastRotate = new Date();

board.on("ready", () => {
    console.log(`Cookie Bike App is ready to connect to Arduino`);

    let button = new five.Button({
        pin,
        isPullup: true
    });

    button.on("down", (value) => {
        let now = new Date();
        let diff = now - lastRotate;
        if(diff < ignoreIntervalLessThan) {
            return;
        }
        interval = diff;
        lastRotate = now;
    });
});

//
// Cookie Bike App > Cookie Script
//

const express = require('express');
const app = express();
const port = 3101;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/', (req, res) => {
    let now = new Date();
    let diff = now - lastRotate;
    diff = Math.max(diff, interval);
    let response = diff < sleepWhenLongerThan ? `${diff}` : ``;
    res.send(response);
});

app.listen(port, () => console.log(`Cookie Bike App is ready to connect to Cookie Bike Script (port ${port})`));
