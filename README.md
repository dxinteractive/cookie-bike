# Cookie Bike

Cookie bike goes:

Exercise bike > Arduino > Computer
- Exercise bike pedal sensor 3.5mm plug goes to Arduino (Pin 2 and GND).
- Arduino USB goes to Computer USB Port.

Cookie Bike has 2 software components:
- Cookie Bike App, a node app that controls the Arduino, calculates the pedalling speed and makes the result available to Cookie Bike Script.
- Cookie Bike Script, a browser Userscript that asks Cookie Bike App for data and controls the clicking of the Cookie Clicker cookie.

## Setup

### Arduino setup

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

### Node app setup

Build yourself an executable.

1. Open terminal and go to `cookie-bike/cookie-bike-app`
2. Run `yarn && yarn start-dev` to try it out
3. Run `yarn build` to make an executable. It'll have a name like `/cookie-bike-app/cookie-bike-win.exe` or something.

If that all works then you can just use the executable from now on.

### Chrome setup

1. Open Chrome
2. Install [Tampermonkey](https://tampermonkey.net)
3. To add `cookie-bike-script/CookieBike.user.js` to Tampermonkey, go to [/cookie-bike/raw/master/cookie-bike-script/CookieBike.user.js](/cookie-bike/raw/master/cookie-bike-script/CookieBike.user.js) and it should prompt you to add the script.
4. If you go to [Cookie Clicker](http://orteil.dashnet.org/cookieclicker/) in Chrome it should now ask you if you want to use Cookie Bike

## Usage

Do setup first if you haven't already.

- Plug in stuff
  - Exercise bike pedal sensor 3.5mm plug goes to Arduino (Pin 2 and GND).
  - Arduino USB goes to Computer USB Port.
- Start Cookie Bike App
  - Windows: start `/cookie-bike-app/cookie-bike-win.exe`
  - Mac: start `/cookie-bike-app/cookie-bike-mac`
  - Linux: start `/cookie-bike-app/cookie-bike-linux`
- Go to [Cookie Clicker](http://orteil.dashnet.org/cookieclicker/) in Chrome
- Pedal!

## Development

You need `node` and `yarn` (or `npm`) to dev cookie-bike-app.
- Run `yarn` (or `npm install`) in `cookie-bike-app` directory
- Run `yarn start-dev` to run the app
- Run `yarn build` to build the app into executables

You only really need [Tampermonkey](https://tampermonkey.net) to dev cookie-bike-script.
