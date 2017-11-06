
# soNative
Implementation of native components using weex and VueJS 2.

*-see the [blog post](https://medium.com/@carlosalmonte04/weex-vuejs-first-application-bb3d5a5763fa) on Medium*

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

## Demo
Native Web Browser         |    Native App (ios)
:-------------------------:|:-------------------------:
![](https://thumbs.gfycat.com/TimelySphericalAsianwaterbuffalo-size_restricted.gif "Native Browser Demo")   |  ![](https://thumbs.gfycat.com/EnchantingUnfitFritillarybutterfly-size_restricted.gif "Native App Demo")

              

## Highlights
- Implemented camera component - ***native ios***, ***native browser***
- Implemented accelerometer - ***native ios***
- Implemented geolocation alongh with Google Maps API fetches to get address - ***computer browser***, ***native ios browser***, ***native ios***
- Implemented necessary native permissions to enable HTTP protocol, Camera and Geolocation access

## Todo - ***Open to pull requests!***
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
