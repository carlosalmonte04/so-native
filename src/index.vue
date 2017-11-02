<template>
  <div class="wrapper" >
    <image ref="background" :src="backgroundImage" class="background" resize="cover" v-bind:style="{width: screen.width, height: screen.height}"></image>
    <div class="container">
      <text class="title" v-bind:style="{fontSize: ((screen.width * 0.095) + (screen.height * 0.095)).toString() + 'px'}">soNative</text>
      <text class="subtitle" v-bind:style="{fontSize: ((screen.width * 0.012) + (screen.height * 0.012)).toString() + 'px'}">Implementation of native components using Weex</text>
      <div class="modules-container">
        <text class="module-toggle" animationSwitch="isCamActive" v-bind:class="{ active: isCamActive}" @click="handleCaptureImage" >Camera</text>
        <text class="module-toggle" animationSwitch="isAccActive" v-bind:class="{ active: isAccActive}" @click="handleAccelerometerToggle" >Accelerometer</text>
        <div class="module-text-container">
          <div class="box">
            <text class="module-text" >X: </text><text class="accelerometer-data">{{accelerometerData.x}}</text>
          </div>
          <div class="box">
            <text class="module-text" >Y: </text><text class="accelerometer-data">{{accelerometerData.y}}</text>
          </div>
          <div class="box">
            <text class="module-text" >Z: </text><text class="accelerometer-data">{{accelerometerData.z}}</text>
          </div>
        </div>
        <!-- <video ref="videoEl" autoplay=true muted=true playsinline=true playstatus="playing" v-on:appear="iam(this)"></video> -->
        <text class="module-toggle" animationSwitch="isScanActive" v-bind:class="{ active: isScanActive}" @click="handleScannerToggle" id="scannerElement" >Scanner</text>
        <text class="module-toggle" animationSwitch="isGeoActive" v-bind:class="{ active: isGeoActive}" @click="handleGetGeolocation" >Geolocation</text>
        <div class="module-text-container">
          <div class="box">
            <text class="module-text" >lat: </text><text class="accelerometer-data">{{geoLocationData.x}}</text>
          </div>
          <div class="box">
            <text class="module-text" >lon: </text><text class="accelerometer-data">{{geoLocationData.z}}</text>
          </div>
        </div>
      </div>
      <text style="margin-bottom: 20px;">by Carlos Almonte</text>
  </div>
</div>
</template>

<style>
/* -TODO: export to separate file*/
  .wrapper { align-items: center; display: flex; align-items: center; }
  .background {position: absolute; height: 100%; width: 100%; opacity: 0.1} 
  .container { display: flex; align-items: center; }
  .title { padding-top:40px; font-weight: 100; color: #262526;} /* -TODO: dynamic font-size on android*/
  .modules-container { margin-top: 100px; display: flex; align-items: center }
  .module-toggle { padding-top:40px; font-size: 100px; margin: 20px !important; font-weight: 300; color: #3f3e3f;border-color: #3f3e3f; border-style: solid; border-width:  3px;border-radius: 15px;padding: 0px 31px !important;cursor: pointer; text-align: center;transition-property: backgroundColor;  transition-duration: 0.5s; transition-delay: 0s;transition-timing-function: ease;}
  .module-toggle.active {background-color: #cbc5cb} /* -TODO native feedback*/
  .box { display: flex; flex-direction: row; margin-left: 60px; }
  .module-text-container { display: flex; flex-direction: row; justify-content: space-between; }
  .module-text { font-size: 22px}
  .logo { width: 360px; height: 156px; }
  .desc { padding-top: 20px; color:#888; font-size: 24px;}
</style>

<script>
///////////
// import Quagga from 'quagga' // -TODO
// import BarcodeScanner from '../plugins/cordova-plugin-barcodescanner/www/barcodescanner'
// const plugin = weex.requireModule('weexMapcomponent') // -TODO
///////////


import { accelerometerToggle, captureImage, scannerToggle, getGeolocation } from './actions/index'

const { deviceWidth, deviceHeight } = weex.config.env

export default { 
  data: {
    steps: 0,
    isCamActive  : false,
    isAccActive  : false,
    isScanActive : false,
    isGeoActive  : false,
    accelerometerIsOn: false,
    backgroundImage: 'https://static.pexels.com/photos/2255/black-and-white-city-houses-skyline.jpg',
    screen: {
      height: deviceHeight,
      width: deviceWidth
    },
    images: [],
    accelerometerData: {
      x: 0,
      y: 0,
      z: 0
    },
    geoLocationData: {
      lat: 0,
      lon: 0,
    }
  },
  mounted () {
    _initializeView.call(this)
  },
  methods: {
    handleGetGeolocation(e) { // -TODO
      _animateBtn.call(this, e)
      getGeolocation.call(this)
    },
    handleScannerToggle(e) { // -TODO
      _animateBtn.call(this, e)
      scannerToggle.call(this)
    },
    handleCaptureImage(e) {
      _animateBtn.call(this, e)
      captureImage.call(this)
      .then(picture => _updateBackground.call(this))
    },
    handleAccelerometerToggle(e) {
      _animateBtn.call(this, e)
      this.isAccActive = true
      accelerometerToggle.call(this)
    }
  }
}

////////
//
// Helper functions
//
////////

function _updateBackground() {
  this.backgroundImage = picture.path
  this.$refs.background.style.opacity = 0.6
}

function _animateBtn(e) { // Hacky web btn press feedback
  let animationSwitch
  if(weex.config.env.platform === "Web") {
    animationSwitch = e.target.attrs.animationSwitch
  }
  else {
    animationSwitch = e.target.attr.animationSwitch
  }
  this[animationSwitch] = true
  setTimeout(() => this[animationSwitch] = false, 500)
}

function _initializeView() { // -TODO Rabbit hole
  // BarcodeScanner.scan(
  //   function (result) {
  //   alert("We got a barcode\n" +
  //     "Result: " + result.text + "\n" +
  //     "Format: " + result.format + "\n" +
  //     "Cancelled: " + result.cancelled);
  //   },
  //   function (error) {
  //     alert("Scanning failed: " + error);
  //   })
  // Quagga.init({
  //   inputStream : {
  //     name : "Live",
  //     type : "LiveStream",
  //     target: this.$refs.scannerElement.$el,
  //     videoEl: this.$refs.videoEl.$el,
  //   },
  //   decoder : {
  //     readers : ["code_128_reader"]
  //   }
  // },function(err) {
  //     if (err) {
  //       console.log(err);
  //       return
  //     }
  //     console.log("Initialization finished. Ready to start");
  //     Quagga.start();
  //   });
}
</script>