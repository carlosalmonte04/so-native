<template>
  <div class="wrapper" >
    <image ref="background" :src="backgroundImage" class="background" resize="cover" v-bind:style="getBackgroundStyle()"></image>
    <div class="container">
      <title v-bind="{isWeb, isAnimationOver}" />
      <modulesContainer ref="modules" v-bind="{isWeb, isAnimationOver}"/>
      <footer />
    </div>
  </div>
</template>

<style src="./assets/stylesheets/style.css" />

<script>
  import Title from './components/Title.vue'
  import ModulesContainer from './components/ModulesContainer.vue'
  import Footer from './components/Footer.vue'

  const animation = weex.requireModule('animation')
  const { deviceWidth, deviceHeight } = weex.config.env
  const backgroundImage = 'http://24.media.tumblr.com/fd5267ff1121b0d3eb331a2bf831f0de/tumblr_meols6ozIo1qg39ewo1_500.gif'

  export default { 
    name: 'index',
    components: {
      Title, ModulesContainer, Footer
    },
    data: () => {
      return {
        isWeb: !!(weex.config.env.platform === 'Web'),
        isAnimationOver: false,
        screen: {
          height: deviceHeight,
          width: deviceWidth
        },
        backgroundImage,    
      }
    },
    mounted() {
      _initializeView.call(this)
    },
    methods: {
      getBackgroundStyle() {
        if (this.isWeb) {
          return {
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: 0,
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
    }
  }


  //////////////////
  //
  // Helper functions
  //
  //////////////////

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

  function __fadeInBackground() {
    animation.transition(this.$refs.background, {
      styles: {
        opacity: 1
      },
      duration: 5000,
      timingFunction: 'ease',
      needLayout:false,
      delay: 0 
    })
  }

  function __fadeInTitle() {
    animation.transition(this.$refs.titleContainer, {
      styles: {
        opacity: 1,
        transform: 'translateY(-10px)'
      },
      duration: 1000, 
      timingFunction: 'ease',
      needLayout:false,
      delay: 0 
    })
  }

  function __fadeInModulesContainer() {
    animation.transition(this.$refs.modules.$refs.container, {
      styles: {
        opacity: 1,
      },
      duration: 3000,
      timingFunction: 'ease',
      needLayout:false,
      delay: 0 
    }) 
  }

  function _initializeView() {
    this.isWeb ? __fadeInBackground.call(this) : null // -TODO animate on mobile
    setTimeout(__fadeInModulesContainer.bind(this), 3000)
  }
</script>