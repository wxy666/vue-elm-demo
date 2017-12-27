// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//vue-resource是Vue提供的体格http请求插件，如同jQuery里的$.ajax，用来和后端交互数据的。引入resource插件
import VueResource from 'vue-resource'
Vue.config.productionTip = false


Vue.use(VueResource)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
