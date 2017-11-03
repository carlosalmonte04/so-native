
# soNative
implementation of native components using weex and VueJS 2

## Getting started

### on native web browsers 
- download
- `cd` into repo
- npm install
- `npm start`
- get `localhost` url (e.g., `192.1.2.48:8081`) and browse to it on your phone

### on ios
- download
- `cd` into repo
- npm install
- `cd` into `platforms/ios`
- `open .`
- open `WeexDemo.xcworkspace` on xCode
- build to run on your connected ios device

### on android
- not fully supported/tested yet

### on computer browser
- not fully supported/tested yet

# Demo
![Native Browser](https://media.giphy.com/media/3o6ggbvpEwU9JvR5Be/giphy.gif "Native Browser Demo")

![Native App](https://media.giphy.com/media/xT0CyLQSvwiHXZ8ELe/giphy.gif "Native App Demo")

## Highlights
- Implemented camera component **native**, *native browser*
- Implemented accelerometer **native**
- Implemented geolocation alongh with Google Maps API fetches to get address. **computer browser**, **native browser**, **native**
- Implemented neccessary native permissions to enable HTTP protocol, Camera and Geolocation access.

## Todo
- Implement scanner
- Refactoring
- Save picture
- ~~Add Google API~~
- ~~Follow more Vue practices~~ 
- More responsive styling

## Troubleshooting
- Upon first start on ios Weex will ask for update then crash the app regardless of pressing `cancel` or `update`.
-- restarting the app fixes this.
- Font sizes not dynamic. Fully tested and incorporated on iPhone6.
- Scanner does not work.
