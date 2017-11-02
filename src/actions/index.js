import Nat from 'natjs'
import { pedometer } from 'pedometer'

let accelerometerHistory = []
let altitudeHistory = []
let counter    = 0

// import cordova from 'cordova'

function _resetSteps() {
  accelerometerHistory = []
  altitudeHistory = []
  counter    = 0
}

function _renderImage(picturePath) {
  return(`
    <image src="${picturePath}" resize="cover"></image>
  `)
}

export function accelerometerToggle() {
  if(this.accelerometerIsOn) {
    Nat.accelerometer.clearWatch()
    this.steps = 0
    _resetSteps()
  }
  else {
    Nat.accelerometer.watch((err, coords) => {
      let { x, y, z } = coords

      accelerometerHistory.push([x, y, z])
      altitudeHistory.push([x, y, z]) // Should be [pitch, roll, yawn]. No native components available for such data -TODO

      x = Math.round(x) 
      y = Math.round(y)
      z = Math.round(z)

      this.accelerometerData = { x, y, z }

      counter++

      if(counter == 10) { // update pedometer after 10 checks    v   
        this.steps = pedometer(accelerometerHistory, altitudeHistory, 100).length
        console.log("STEPS!!!------->", this.steps)
        counter = 0
      }
    }, {interval: 50})
  }
  this.accelerometerIsOn = !this.accelerometerIsOn
}

export function captureImage() {
  return Nat.camera.captureImage({}, (err, picture) => {
    if (err) console.log("Could not capture image", err)
    console.log("Image path =>", picture.path)
    this.images.push(_renderImage(picture.path))
    console.log("THIS IMAGES", this.images)
    return new Promise(function(resolve, reject) {
      resolve(picture.path)
    })
  })
}

export function scannerToggle() {
  // console.log("GOT CALLED")
  // Quagga.init({
  //     inputStream : {
  //       name : "Live",
  //       type : "VideoStream",
  //       target: this.$refs.scannerElement.$el,
  //     },
  //     decoder : {
  //       readers : ["code_128_reader"]
  //     }
  // },export function(err) {
  //     if (err) {
  //       console.log(err);
  //       return
  //     }
  //     console.log("Initialization finished. Ready to start");
  //     Quagga.start();
  //   });
}

export function getGeolocation() {
  Nat.geolocation.watch((err, loc) => {
      if(err) console.log("Could not get location", err)
      console.log("I AM THE LOCATION", loc)
  })
}