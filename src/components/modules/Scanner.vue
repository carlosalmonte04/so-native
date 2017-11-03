<template>
	<div>
	  <div ref="scannerElement"></div>
	  <!-- <video ref="videoEl"></video> -->
	  <text class="module-toggle" v-bind:class="{web: isWeb, active: isScanActive }" animationSwitch="isScanActive" @click="handleScannerToggle" id="scannerElement" >Scanner</text>
	</div>
</template>

<script>
	export default {
		name: 'scanner',
    props: ['isWeb', 'isScanActive', 'isAnimationOver', 'handleScannerToggle'],
    mounted() {
    }
	}
</script>