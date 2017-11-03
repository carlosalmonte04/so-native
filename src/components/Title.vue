<template>
  <div ref="titleContainer" class="title-container" v-bind:style="{transform: isAnimationOver ? 'translateY(-10px)' : 'translateY(10px)'  }">
  	<text ref="title" class="title" v-bind:class="{web: isWeb}">soNative</text>
	</div>
</template>


<script>
	export default {
		name: 'title',
		props: ['isWeb', 'isAnimationOver']
	}
</script>