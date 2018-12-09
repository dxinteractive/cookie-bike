# Cookie Bike

Cookie bike goes:

Exercise bike > Arduino > Computer
- Exercise bike pedal sensor 3.5mm plug goes to Arduino (Pin 1 and GND)
- Arduino USB goes to Computer USB Port

Cookie Bike has 2 software components:
- Cookie Bike App, a node app that controls an Arduino
- Cookie Bike Script, 

## Usage

Do setup first if you haven't already

- Plug in stuff ^^^
- Start Cookie Bike App
- Go to [Cookie Clicker](http://orteil.dashnet.org/cookieclicker/) in Chrome
- Pedal!

## Setup

### Arduino setup

Cookie Bike App uses [Johnny Five](http://johnny-five.io/) to control an Arduino from the Cookie Bike App.
I used an Arduino Micro, which required me to [follow these instructions](http://johnny-five.io/platform-support/#arduino-micro):

#### Install the Firmata library

1. Open the Arduino IDE and navigate to: `Sketch > Include Library > Manage Libraries`
2. Filter by "Firmata" and click on the "Firmata by Firmata Developers" item in the list of results.
3. Click the Select version dropdown and select the most recent version (note you can also install previous versions)
4. Click Install.

*Instructions from [here](https://github.com/firmata/arduino#user-content-updating-firmata-in-the-arduino-ide---arduino-164-and-higher)*

#### Upload the StandardFirmataPlus runtime to the Arduino Micro

1. Select `File > Examples > Firmata > StandardFirmataPlus`
2. Select `Tools > Board > Arduino Micro`
3. Click Upload

### Node app setup

???

### Chrome setup

1. Open Chrome
2. Install [Tampermonkey](https://tampermonkey.net)
3. Add `cookie-bike-script/CookieBike.user.js` to Tampermonkey
4. If you go to [Cookie Clicker](http://orteil.dashnet.org/cookieclicker/) in Chrome it should now ask you if you want to use Cookie Bike
