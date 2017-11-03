<template functional>
	<div>
	  <text class="module-toggle" v-bind:class="{web: isWeb, active: isGeoActive }" animationSwitch="isGeoActive" @click="handleGetGeolocation" >Geolocation</text>
	  <div class="module-text-container-column">
	    <div class="box">
	      <text>{{address}}</text>
	    </div>
	    <div class="box">
	      <text class="module-text" >lat: </text><text class="geolocation-data">{{geolocationCoords.latitude}}</text>
	    </div>
	    <div class="box">
	      <text class="module-text" >lon: </text><text class="geolocation-data">{{geolocationCoords.longitude}}</text>
	    </div>
	  </div>
	</div>
</template>

<script>
	export default {
		name: 'Geolocation',
		props: ['isWeb', 'isGeoActive', 'isAnimationOver', 'geolocationCoords', 'handleGetGeolocation', 'address'],
		mounted() {
		}
	}
</script>