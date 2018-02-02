// /** Lines below are already loaded in /test/helpers/entry.js
// import Vue from 'vue'
// import plugin from './index'
// import 'babel-polyfill' // promise and etc ...
//
// Vue.config.productionTip = false
// Vue.use(plugin)
//
// window.Vue = Vue
// Vue.config.debug = true
// */

import VueHZoom from './libs/VueHZoom.vue'

new window.Vue({
  el: 'app',
  template: `<vue-h-zoom image="/assets/bugatti-chiron-white_01_thumb.jpg"
              image-full="/assets/bugatti-chiron-white_01.jpg" :zoom-level="2"
              :zoom-window-size="1"></vue-h-zoom>`,
  components: { VueHZoom }
})
