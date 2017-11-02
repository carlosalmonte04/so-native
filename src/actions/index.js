import Nat from 'natjs'
import { pedometer } from 'pedometer'

// import cordova from 'cordova'

function accToggle() {
  if(this.accIsOn) {
    Nat.accelerometer.clearWatch()
    this.steps = 0
    resetSteps()
  }
  else {
    Nat.accelerometer.watch((err, coords) => {
      let { x, y, z } = coords

      accHistory.push([x, y, z])
      altHistory.push([x, y, z]) // Should be [pitch, roll, yawn]. No native components available for such data -TODO

      x = Math.round(x) 
      y = Math.round(y)
      z = Math.round(z)

      this.accData = { x, y, z }

      counter++

      if(counter == 10) { // update pedometer after 10 checks    v   
        this.steps = pedometer(accHistory, altHistory, 100).length
        console.log("STEPS!!!------->", this.steps)
        counter = 0
      }
    }, {interval: 50})
  }
  this.accIsOn = !this.accIsOn
}

function captureImage() {
  Nat.camera.captureImage({}, (err, picture) => {
    if (err) console.log("Could not capture image", err)
    console.log("Image path =>", picture.path)
    this.path = picture.path
  })
}

function scannerToggle() {
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
  // },function(err) {
  //     if (err) {
  //       console.log(err);
  //       return
  //     }
  //     console.log("Initialization finished. Ready to start");
  //     Quagga.start();
  //   });
}

function getGeolocation() {
  Nat.geolocation.watch((err, loc) => {
      if(err) console.log("Could not get location", err)
      console.log("I AM THE LOCATION", loc)
  })
}

const actions = {
  accToggle, captureImage, scannerToggle, getGeolocation
}

export default actions