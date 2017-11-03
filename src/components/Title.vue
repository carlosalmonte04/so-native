<template functional>
  <div ref="titleContainer" class="title-container" v-bind:style="{transform: isAnimationOver ? 'translateY(-10px)' : 'translateY(10px)'  }">
    <text ref="title" class="title" v-bind:class="{web: isWeb}">soNative</text>
  </div>
</template>
<style src="../assets/stylesheets/style.css" />


<script>
  const animation = weex.requireModule('animation')
  const { deviceWidth, deviceHeight } = weex.config.env

  export default { 
    name: 'Title',
    props: ['isWeb', 'isAnimationOver'],
    data: () => { 
      return {}
    },
    mounted () {
      setTimeout(this.fadeInTitle, 2000)
    },
    methods: { 
      fadeInTitle() {
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
    }
  }
</script>