<template>
  <div>
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
  </div>
</template>

<script>
  export default {
    name: 'Accelerometer',
    props: ['isWeb', 'isAccActive', 'isAnimationOver', 'accelerometerCoords', 'handleAccelerometerToggle']
  }
</script>