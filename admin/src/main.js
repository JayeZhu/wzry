import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import http from './http'
import { Message } from 'element-ui';
import './style.css';

Vue.config.productionTip = false
Vue.prototype.$http = http;
Vue.prototype.$Message = Message;

Vue.mixin({
  computed: {
    imgAction () {
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    getAuthHeaders () {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
