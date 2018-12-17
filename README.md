# Cookie Bike 🍪🚴

Control clicking the [Cookie Clicker](http://orteil.dashnet.org/cookieclicker/) cookie with an exercise bike. Try to use it if you dare. Ask me questions if you really want but you're kind of on your own, this is a very diy project 😈

Cookie bike goes:

Exercise bike 🚴 > Arduino 🕹️ > Computer 💻
- Exercise bike pedal sensor goes to Arduino (Pin 2 and GND).
- Arduino USB goes to Computer USB Port.

Cookie Bike has 2 software components:
- Cookie Bike App, a node app that controls the Arduino, calculates the pedalling speed and makes the result available to Cookie Bike Script.
- Cookie Bike Script, a browser Userscript that asks Cookie Bike App for data and controls the clicking of the Cookie Clicker cookie.

## Your bike 🚴

Cookie Bike measures your pedal speed by using an Arduino to detect that Pin 2 is pulled to ground once per cycle. The exercise bike we have as a 3.5mm TS jack which acts like a normally open switch, but which closes for a bit each revolution. Normally this 3.5mm jack goes to a 3.5mm plug that connects to the little dashboard thing that measures your calories and stuff. Instead, if the Arduino's GND is connected to the sleeve of the 3.5mm jack and Pin 2 of the Arduino is connected to the tip of the 3.5mm jack, then the Arduino and Cookie Bike App can measuring how often the circuit is closed, and work out the pedal rate from that.

Your bike needs some way of closing a circuit once per revolution to work with Cookie Bike.

## Setup

There are 4 parts to the setup:

### 1. Bike setup

Connect the Arduino to the bike in such a way that Pin 2 is pulled to ground once per cycle. See above "Your bike" for details.

### 2. Arduino setup

Cookie Bike App uses [Johnny Five](http://johnny-five.io/) to control an Arduino from the Cookie Bike App.
I used an Arduino Micro, which required me to [follow these instructions](http://johnny-five.io/platform-support/#arduino-micro):

#### Install the Arduino IDE

1. Do this https://www.arduino.cc/en/Guide/Windows

#### Install the Firmata library

1. Open the Arduino IDE and navigate to: `Sketch > Include Library > Manage Libraries`.
2. Filter by "Firmata" and click on the "Firmata by Firmata Developers" item in the list of results.
3. Click the Select version dropdown and select the most recent version (note you can also install previous versions).
4. Click Install.

*Instructions from [here](https://github.com/firmata/arduino#user-content-updating-firmata-in-the-arduino-ide---arduino-164-and-higher)*

#### Upload the StandardFirmataPlus runtime to the Arduino Micro

1. Select `File > Examples > Firmata > StandardFirmataPlus`
2. Select `Tools > Board > Arduino Micro`
3. Click Upload

### 3. Node app setup (Cookie Bike App)

Build yourself an executable if you don't have one. If you already have one for your OS / environment then skip this step.

1. First check the [johnny-five prerequisites](https://github.com/rwaldron/johnny-five/wiki/Getting-Started#prerequisites) to make sure your node setup is all good.
2. Open terminal and go to `cookie-bike/cookie-bike-app`
3. Run `yarn && yarn start-dev` to try it out
4. Run a build command to make an executable. Depending on your OS it'll be:
  - `yarn build-linux` 
  - `yarn build-macos` 
  - `yarn build-win`
5.  It'll make a new directory with a name like `/cookie-bike-app/ookie-bike-app`. Inside there will be a `cookie-bike.exe` or something, and a `serialport.node` file. The `serialport.node` file is specific to your OS / environment, so if you want to compile an executable for a different OS / enviroment, right now you'll need to be on that OS / environment when you build.

If that all works then you can just use the executable from now on. You should also be able to use the executable on other similar computers without them needing to built it themselves, hopefully.

When you run the executable file (or using `yarn && yarn start-dev`), it should look something like this:

![capture](https://user-images.githubusercontent.com/345320/50081281-2dbd7980-0242-11e9-8081-72a8eee60323.PNG)

### 4. Browser setup (Cookie Bike Script)

#### Chrome

1. Open Chrome
2. Install [Tampermonkey](https://tampermonkey.net)
3. To add `cookie-bike-script/CookieBike.user.js` to Tampermonkey, go to [https://github.com/dxinteractive/cookie-bike/raw/master/cookie-bike-script/CookieBike.user.js](https://github.com/dxinteractive/cookie-bike/raw/master/cookie-bike-script/CookieBike.user.js) and it should prompt you to add the script.
4. If you go to [Cookie Clicker](http://orteil.dashnet.org/cookieclicker/) in Chrome it should now ask you if you want to use Cookie Bike

#### Firefox

1. Open Firefox
2. Install [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)
3. To add `cookie-bike-script/CookieBike.user.js` to Greasemonkey, go to [https://github.com/dxinteractive/cookie-bike/raw/master/cookie-bike-script/CookieBike.user.js](https://github.com/dxinteractive/cookie-bike/raw/master/cookie-bike-script/CookieBike.user.js) and it should prompt you to add the script.
4. If you go to [Cookie Clicker](http://orteil.dashnet.org/cookieclicker/) in Firefox it should now ask you if you want to use Cookie Bike

## Usage

Do setup first if you haven't already.

1. Plug in stuff
  - Exercise bike pedal sensor goes to Arduino (Pin 2 and GND).
  - Arduino USB goes to Computer USB Port.
  - Arduino **must** be plugged in and operational before starting Cookie Bike App
2. Start Cookie Bike App by double  licking on the executable inside `/cookie-bike-app/cookie-bike-app`
3. Go to [Cookie Clicker](http://orteil.dashnet.org/cookieclicker/) in Chrome or Firefox
4. Pedal!

### Changing the cookie rate

By default one pedal revolution will give you 6 cookies. That seems about right for our bike on the difficulty we like. You can change this by opening the console in Chrome or Firefox by pressing `F12`, and typing `CookieBike.setMultiplier()` into it with the new number of cookies per cycle. Example:

```
CookieBike.setMultiplier(10);
```

Cookie Bike Script will remember this for next time you play. It uses `localStorage` to store the multiplier.

## Development

You need `node` and `yarn` (or `npm`) to dev cookie-bike-app.
- Run `yarn` (or `npm install`) in `cookie-bike-app` directory
- Run `yarn start-dev` to run the app
- Run `yarn build` to build the app into executables

You only really need [Tampermonkey](https://tampermonkey.net) to dev cookie-bike-script.
