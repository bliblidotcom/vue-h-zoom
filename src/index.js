/* @flow */
import plugin from './libs/VueHZoom.vue'

module.exports = {
  install: function (Vue, options) {
    Vue.component('vue-h-zoom', plugin)
  }
}
