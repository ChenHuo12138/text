// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/base.css'
import axios from 'axios'
import router from './router'
import moment from 'moment'
//配置基础地址
axios.defaults.baseURL='http://localhost:8888/api/private/v1/'
Vue.prototype.$http=axios
Vue.use(ElementUI)
//使用vue.use()使用插件
Vue.config.productionTip = false
//全局过滤器处理日期格式
Vue.filter('fmtdate',(v)=>{
  //要处理的数据会自动的传入moment中 fromat是日期的格式
  return moment(v).format('YYYY-MM-DD')
  //使用位置 v-bind ，插值表达式 {{msg | 过滤器}}
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
