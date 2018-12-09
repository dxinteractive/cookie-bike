//
// Arduino > Cookie Bike App
//

const five = require("johnny-five");
const board = new five.Board();
const pin = 2;
const sleepWhenLongerThan = 3000;

let interval = "";
let lastRotate = new Date();

board.on("ready", () => {
    console.log(`Cookie Bike App is ready to connect to Arduino`);
    let button = new five.Button({
        pin,
        isPullup: true
    });

    let led = new five.Led(13);

    button.on("down", function(value) {
        lastRotate = new Date();
        led.on();
    });

    button.on("up", function() {
        led.off();
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

    // move this logic somewhere with a constant timer

    // let now = new Date();
    // let diff = now - lastRotate;
    // if(diff > sleepWhenLongerThan) {
    //     interval = "";
    // } else {
    //     interval = `${diff}`;
    // }
    // console.log("interval", interval);

    res.send(interval);
});

app.listen(port, () => console.log(`Cookie Bike App is ready to connect to Cookie Bike Script (port ${port})`));
