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
        <div ref="scannerElement"></div>
        <video ref="videoEl"></video>
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
  @import './assets/stylesheets/style.css';
</style>


<script>
///////////
import Quagga from 'quagga' // -TODO
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
    console.log("")
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
  Quagga.init({
    inputStream : {
      name : "Live",
      type : "LiveStream",
      target: this.$refs.scannerElement.$el,
      videoEl: this.$refs.videoEl.$el,
    },
    decoder : {
      readers : ["code_128_reader"]
    }
  },function(err) {
      if (err) {
        console.log(err);
        return
      }
      console.log("Initialization finished. Ready to start");
      Quagga.start();
    });
}
</script>