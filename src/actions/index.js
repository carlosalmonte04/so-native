import Nat from 'natjs'
import { pedometer } from 'pedometer'
// import Quagga from 'quagga' // -TODO
var stream = weex.requireModule('stream')

let counter              = 0 // steps throttle - line 65
let altitudeHistory      = []
let accelerometerHistory = []

export function captureImage() {
  this.isWeb ? _getWebCamera.call(this) : _getMobileCamera.call(this)
}

export function scannerToggle() {
  this.isWeb ? _getWebScanner.call(this) : _getMobileScanner.call(this)
}

export function getGeolocation() {
  (this.isWeb && "geolocation" in navigator) ? _getWebLocation.call(this) : _getMobileLocation.call(this)
}

export function accelerometerToggle() {
  this.accelerometerIsOn ? _stopAccelerometer.call(this) : _startAccelerometer.call(this)
}

////////
//
// helper functions
//
////////

function _stopAccelerometer() {
  Nat.accelerometer.clearWatch()
  this.steps = 0
  _resetSteps()
  this.accelerometerIsOn = !this.accelerometerIsOn
}

function _startAccelerometer() {
  Nat.accelerometer.watch((err, coords) => {
    let { x, y, z } = coords

    accelerometerHistory.push([x, y, z])
    altitudeHistory.push([x, y, z]) // -TODO Should be [pitch, roll, yawn]. No native components available for such data

    x = Math.round(x) 
    y = Math.round(y)
    z = Math.round(z)

    this.accelerometerCoords = { x, y, z }

    counter++

    if(counter == 10) { // update pedometer after 10 checks   
      this.steps = pedometer(accelerometerHistory, altitudeHistory, 500).length // -TODO O(n^2)!!! Revisit! --init arrays, save steps in hashmap
      console.log("STEPS!!!------->", this.steps)
      counter = 0
    }
  }, {interval: 50})
  this.accelerometerIsOn = !this.accelerometerIsOn
}

function _resetSteps() {
  counter              = 0
  altitudeHistory      = []
  accelerometerHistory = []
}

function _renderImage(picturePath) {
  return(`
    <image src="${picturePath}" resize="cover"></image>
  `)
}

function _getMobileCamera() {
  let that = this
  Nat.camera.captureImage({}, (err, picture) => {
    if (err) console.log("Could not capture image", err)

    that.images.push(_renderImage(picture.path))
    return new Promise(function(resolve, reject) {
      resolve(picture.path)
    })
  })
}

function _getWebCamera() {
  return new Promise((resolve, reject) => {
    resolve(this.$refs.camera.$refs.imgPicker.$el.click())
  })
}

function _getWebScanner() {
  this.$refs.imgPicker.$el.onchange = (e) => { // -TODO bubble event
    Quagga.decodeSingle({src: e.value}, function(result) {
    })
  }
  this.$refs.imgPicker.$el.click()
}

function _getWebLocation() {
  let that = this
  navigator.geolocation.getCurrentPosition(function(position) {
    const { latitude, longitude } = position.coords
    __fetchAndRenderLocation.call(that, latitude, longitude);
  })
}

function _getMobileLocation() {
  Nat.geolocation.get((err, location) => {
    if(err) console.log("Could not get location", err)
 
    const { latitude, longitude } = location
    __fetchAndRenderLocation.call(this, latitude, longitude);
  })
}

function __fetchAndRenderLocation(latitude, longitude) {
  let scope = this
  stream.fetch({
      method: 'GET',
      type: 'json',
      url: `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBZaIlmEzmho9ltpSZY1g2at6rXAYdJZfM&latlng=${latitude},${longitude}&sensor=true` // -TODO save apiKey on ENV variable
    }, function(response) {
      const address = response.data.results[0].formatted_address
      const location = { address, latitude, longitude }
      this.isWeb ? ___renderWebLocation.call(this, location) : ___renderMobileLocation.call(this, location)
    }.bind(this))
}

function ___renderMobileLocation(location) {
  const { address, latitude, longitude} = location
  this.geolocationCoords = { latitude, longitude }
  this.address = address
}

function ___renderWebLocation(location) {
  const { address, latitude, longitude} = location
  this.geolocationCoords = { latitude, longitude }
  this.address = address
}

function _getMobileScanner() {
// Quagga.init({
//     inputStream : {
//       name : "Live",
//       type : "VideoStream",
//       target: this.$refs.scannerElement.$el,
//     },
//     decoder : {
//       readers : ["code_128_reader"]
//     }
// }, function(err) {
//     if (err) {
//       console.log(err);
//       return
//     }
//     console.log("Initialization finished. Ready to start");
//     Quagga.start();
//   });
//   cordova.plugins.barcodeScanner.scan(
// function (result) {
// alert("We got a barcode\n" +
// "Result: " + result.text + "\n" +
// "Format: " + result.format + "\n" +
// "Cancelled: " + result.cancelled);
// },
// function (error) {
// alert("Scanning failed: " + error);
// }
// );
}