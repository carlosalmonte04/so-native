<template>
  <div ref="container" class="modules-container" v-bind:class="{ web: isWeb }" >
    <camera        v-bind="{isWeb, isAnimationOver, isCamActive, handleCaptureImage}" ref="camera" />
    <accelerometer v-bind="{isWeb, isAnimationOver, isAccActive, handleAccelerometerToggle, accelerometerCoords}" />
    <scanner       v-bind="{isWeb, isAnimationOver, isScanActive, handleScannerToggle}" />
    <geolocation   v-bind="{isWeb, isAnimationOver, isGeoActive, handleGetGeolocation, address, geolocationCoords}" />
  </div>
</template>
<style src="../assets/stylesheets/style.css" />

<script>
  import { captureImage, accelerometerToggle, scannerToggle, getGeolocation } from '../actions/index'
  import Camera from './modules/Camera.vue'
  import Accelerometer from './modules/Accelerometer.vue'
  import Scanner from './modules/Scanner.vue'
  import Geolocation from './modules/Geolocation.vue'

  export default {
    name: 'modules-container',
    props: ['isWeb', 'isAnimationOver'],
    components: {
      Camera, Accelerometer,
      Scanner, Geolocation
    },
    data: () => {
      return {
        steps: 0,
        file: 'file',
        isCamActive  : false,
        isAccActive  : false,
        isScanActive : false,
        isGeoActive  : false,
        accelerometerIsOn: false,
        address : 'Press geolocation to get address',
        accelerometerCoords: {
          x: 0,
          y: 0,
          z: 0,
        },
        geolocationCoords: {
          latitude: 0,
          longitude: 0,
        },
        images: []
      }
    },
    mounted() {
    },
    methods: {
      handleCaptureImage(e) {
        this.animateBtn(e)
        captureImage.call(this)
        .then( picture => this.updateBackground() )
      },
      handleAccelerometerToggle(e) {
        this.animateBtn(e)
        accelerometerToggle.call(this)
      },
      handleScannerToggle(e) { // -TODO
        this.animateBtn(e)
        scannerToggle.call(this)
      },
      handleGetGeolocation(e) {
        this.animateBtn(e)
        getGeolocation.call(this)
      },
      animateBtn(e) { // Hacky btn press feedback | ?only on mobile browser
        let animationSwitch
        if(this.isWeb) {
          animationSwitch = e.target.attrs.animationSwitch
        }
        else {
          animationSwitch = e.target.attr.animationSwitch
        }
        this[animationSwitch] = true
        setTimeout(() => this[animationSwitch] = false, 500)
      }
    }
  }
</script>