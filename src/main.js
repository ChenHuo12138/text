// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/base.css'
import axios from 'axios'
import router from './router'
//配置基础地址
axios.defaults.baseURL='http://localhost:8888/api/private/v1/'
Vue.prototype.$http=axios
Vue.use(ElementUI)
//使用vue.use()使用插件
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
