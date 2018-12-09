// ==UserScript==
// @name         Cookie Bike Script
// @namespace    https://github.com/dxinteractive/cookie-bike
// @version      0.0.0
// @description  Cookie Bike
// @author       Damien Clarke
// @match        http://orteil.dashnet.org/cookieclicker/
// @grant        none
// ==/UserScript==

//
// Utils
//

const repeatWith = (fn, repeatTime) => {
    let promise = fn();
    if(promise) {
        promise.then(() => {
            setTimeout(() => repeatWith(fn, repeatTime), repeatTime);
        });
    }
};

//
// Constants
//

const cookieBikeAppPort = 3101;
const cookieBikeAppReadInterval = 250; // ms
const multiplier = 6;

//
// State
//

let clickInterval = 3000;
let clicking = true;
let lastClick = new Date();

//
// Cookie Bike Script > Cookie Clicker
//

const tick = () => {
    let now = new Date();
    let diff = now - lastClick;
    if(clicking && diff > clickInterval) {
        lastClick = now;
        window.Game.ClickCookie();
        console.log(`${1000 / clickInterval} clicks per second!`);
    }
    return Promise.resolve();
};

//
// Coocke Bike App > Cookie Bike Script
//

const readSpeed = () => {
    return fetch(`http://localhost:${cookieBikeAppPort}/`)
        .then(response => response.text())
        .then(response => {
            clicking = !!response;
            clickInterval = response
                ? Number(response) / multiplier
                : 0;
        })
        .catch(() => {
            alert("Could not find the Cookie Bike App. Please start the Cookie Bike App and press OK");
            return new Promise((resolve) => {
                setTimeout(resolve, 2000);
            });
        });
};


//
// startup and prompts
//

const startCookieBike = () => {
    alert('OK! Start the Cookie Bike App and get ready to pedal!');
    repeatWith(tick, 1);
    repeatWith(readSpeed, cookieBikeAppReadInterval);
};

const askCookieBike = () => {
    if(confirm("Would you like to use Cookie Bike?")) {
        startCookieBike();
    }
};

const waitUntilLoaded = () => {
    if(!window.Game.ClickCookie) {
        return Promise.resolve();
    }
    setTimeout(askCookieBike, 1000);
};

(() => {
    'use strict';
    console.log("I AM AT THE COOKIE PLACE!");
    repeatWith(waitUntilLoaded, 1000);
})();
