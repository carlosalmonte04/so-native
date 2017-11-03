<template>
  <div class="modules-container">
    <input class="hidden" type="file" accept="image/*" capture="camera" ref="imgPicker">
    <text class="module-toggle" v-bind:class="{web: isWeb, active: isCamActive }" animationSwitch="isCamActive" @click="handleCaptureImage" >Camera</text>
  </div>
</template>
<style src="../../assets/stylesheets/style.css" />


<script>
  export default {
    name: 'Camera',
    props: ['isWeb', 'isCamActive', 'isAnimationOver', 'handleCaptureImage'],
    mounted() {
    }
	}
</script>
