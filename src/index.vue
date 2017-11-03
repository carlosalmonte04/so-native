<template>
  <div class="wrapper" >
    <image ref="background" :src="backgroundImage" class="background" resize="cover" v-bind:style="getBackgroundStyle()"></image>
    <div class="container">
      <title v-bind="{isWeb, isAnimationOver}"/>
      <div class="modules-container">
        <input class="hidden" type="file" accept="image/*" capture="camera" ref="imgPicker">
        <text class="module-toggle" v-bind:class="{web: isWeb, active: isCamActive }" animationSwitch="isCamActive" @click="handleCaptureImage" >Camera</text>
        <text class="module-toggle" v-bind:class="{web: isWeb, active: isAccActive }" animationSwitch="isAccActive" @click="handleAccelerometerToggle" >Accelerometer</text>
        <div class="module-text-container">
          <div class="box">
            <text class="module-text" >X: </text><text class="accelerometer-data">{{accelerometerCoords.x}}</text>
          </div>
          <div class="box">
            <text class="module-text" >Y: </text><text class="accelerometer-data">{{accelerometerCoords.y}}</text>
          </div>
          <div class="box">
            <text class="module-text" >Z: </text><text class="accelerometer-data">{{accelerometerCoords.z}}</text>
          </div>
        </div>
        <div ref="scannerElement"></div>
        <!-- <video ref="videoEl"></video> -->
        <text class="module-toggle" v-bind:class="{web: isWeb, active: isScanActive }" animationSwitch="isScanActive"@click="handleScannerToggle" id="scannerElement" >Scanner</text>
        <text class="module-toggle" v-bind:class="{web: isWeb, active: isGeoActive }" animationSwitch="isGeoActive" @click="handleGetGeolocation" >Geolocation</text>
        <div class="module-text-container-column">
          <div class="box">
            <text>{{address}}</text>
          </div>
          <div class="box">
            <text class="module-text" >lat: </text><text class="geolocation-data">{{geoLocationCoords.latitude}}</text>
          </div>
          <div class="box">
            <text class="module-text" >lon: </text><text class="geolocation-data">{{geoLocationCoords.longitude}}</text>
          </div>
        </div>
      </div>
      <text class="footer" style="margin-bottom: 20px;">by Carlos Almonte</text>
  </div>
</div>
</template>

<style src="./assets/stylesheets/style.css">

</style>


<script>
import { accelerometerToggle, captureImage, scannerToggle, getGeolocation } from './actions/index'
import Title from './components/Title.vue'

const animation = weex.requireModule('animation')
const { deviceWidth, deviceHeight } = weex.config.env

export default { 
  data: () => {
    return {
      isWeb: !!(weex.config.env.platform === 'Web'),
      steps: 0,
      isCamActive  : false,
      isAccActive  : false,
      isScanActive : false,
      isGeoActive  : false,
      accelerometerIsOn: false,
      isAnimationOver: false,
      address : 'Press geolocation to get address',
      backgroundImage: 'http://24.media.tumblr.com/fd5267ff1121b0d3eb331a2bf831f0de/tumblr_meols6ozIo1qg39ewo1_500.gif',
      screen: {
        height: deviceHeight,
        width: deviceWidth
      },
      images: [],
      accelerometerCoords: {
        x: 0,
        y: 0,
        z: 0
      },
      geoLocationCoords: {
        latitude: 0,
        longitude: 0,
      }
    }
  },
  mounted () {
    _initializeView.call(this)
  },
  methods: {
    getBackgroundStyle() {
      if (this.isWeb) {
        return {
          position: 'absolute',
          width: '100%',
          height: '100%',
        }
      }
      else {
        return {
          position: 'absolute',
          height: `${this.screen.height}px`,
          width: `${this.screen.width}px`,
          opacity: 0.2
        }
      }
    },
    handleGetGeolocation(e) { 
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

function _animateBtn(e) { // Hacky btn press feedback | ?only on mobile browser
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

function ___manuallySetOpacity() {
  this.isAnimationOver = true
}

function __fadeInBackground() {
  animation.transition(this.$refs.background, {
    styles: {
      opacity: 1
    },
    duration: 5000, //ms
    timingFunction: 'ease',
    needLayout:false,
    delay: 0 //ms
  }, ___manuallySetOpacity.bind(this))
}

function __fadeInTitle() {
  animation.transition(this.$refs.titleContainer, {
    styles: {
      opacity: 1,
      transform: 'translateY(-10px)'
    },
    duration: 1000, //ms
    timingFunction: 'ease',
    needLayout:false,
    delay: 0 //ms
  })
}

function _initializeView() {
  this.isWeb ? __fadeInBackground.call(this) : null // -TODO animate on mobile
  setTimeout(__fadeInTitle.bind(this), 2000)
}
</script>