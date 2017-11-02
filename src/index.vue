<template>
  <div class="wrapper" >
    <!-- <image src="https://images3.alphacoders.com/208/208377.jpg" class="background" resize="cover"></image> -->
    <div class="container">
      <text class="title" v-bind:style="{fontSize: ((screen.width * 0.095) + (screen.height * 0.095)).toString() + 'px'}">soNative</text>
      <text class="module-toggle" v-bind:class="{ active: accIsOn}" @click="handleCaptureImage" >Camera</text>
      <text class="module-toggle" v-bind:class="{ active: accIsOn}" @click="handleAccToggle" >Accelerometer</text>
      <div class="module-text-container">
        <div class="box">
          <text class="module-text" >X: </text><text class="acc-data">{{accData.x}}</text>
        </div>
        <div class="box">
          <text class="module-text" >Y: </text><text class="acc-data">{{accData.y}}</text>
        </div>
        <div class="box">
          <text class="module-text" >Z: </text><text class="acc-data">{{accData.z}}</text>
        </div>
      </div>
      <video ref="videoEl" autoplay=true muted=true playsinline=true playstatus="playing" v-on:appear="iam(this)"></video>
      <text id="scannerElement" ref="scannerElement" class="module-toggle" @click.native="handleScannerToggle" >Scanner</text>
      <text class="module-toggle" @click="handleGetGeolocation" >Geolocation</text>
      <div class="module-text-container">
        <div class="box">
          <text class="module-text" >lat: </text><text class="acc-data">{{accData.x}}</text>
        </div>
        <div class="box">
          <text class="module-text" >lon: </text><text class="acc-data">{{accData.z}}</text>
        </div>
      </div>
      <text style="margin-bottom: 20px;">by Carlos Almonte</text>
  </div>
</div>
</template>

<style>
/* -TODO: export to separate file*/
  .wrapper { align-items: center; margin-top: 120px; display: flex; align-items: center; }
  .background {position: absolute; flex: 1;} /* -TODO gradient/background-img*/
  .container { display: flex; align-items: center; }
  .title { padding-top:40px; padding-bottom: 40px; font-weight: 100; color: #262526;} /* -TODO: dynamic font-size on android*/
  .module-toggle { padding-top:40px; font-size: 100px; margin: 20px !important; font-weight: 300; color: #3f3e3f;border-color: #3f3e3f; border-style: solid; border-width:  3px;border-radius: 15px;padding: 0px 31px !important;cursor: pointer; }
  .module-toggle .active {background-color: green} /* -TODO native feedback*/
  .box { display: flex; flex-direction: row; margin-left: 60px; }
  .module-text-container { display: flex; flex-direction: row; justify-content: space-between; }
  .logo { width: 360px; height: 156px; }
  .desc { padding-top: 20px; color:#888; font-size: 24px;}
</style>

<script>
// import Quagga from 'quagga' // -TODO
import { accToggle, captureImage, scannerToggle, getGeolocation } from './actions/index'
// import BarcodeScanner from '../plugins/cordova-plugin-barcodescanner/www/barcodescanner'

const { deviceWidth, deviceHeight } = weex.config.env

const plugin = weex.requireModule('weexMapcomponent') // -TODO

let accHistory = [] // line 112
let altHistory = []
let counter    = 0

export default { 
  data: {
    steps: 0,
    accIsOn: false,
    screen: {
      height: deviceHeight,
      width: deviceWidth
    },
    images: [],
    accData: {
      x: 0,
      y: 0,
      z: 0
    },
  },
  mounted () {
//     BarcodeScanner.scan(
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
      // Quagga.init({
      //     inputStream : {
      //       name : "Live",
      //       type : "LiveStream",
      //       target: this.$refs.scannerElement.$el,
      //       videoEl: this.$refs.videoEl.$el,
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
  },
  methods: {
    iam(h) {
      console.log("THISSS?!?!?!", h)
      this.$refs.videoEl.$el.play()
    },
    handleGetGeolocation() { // -TODO
      getGeolocation().call(this)
    },
    handleScannerToggle() {
      scannerToggle().call(this)
    },
    handleCaptureImage() {
      captureImage().call(this)
    },
    handleAccToggle() {
      accToggle().call(this)
    }
  }
}

function resetSteps() {
  accHistory = []
  altHistory = []
  counter    = 0
}
</script>