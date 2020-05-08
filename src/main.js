import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import ElementUI from 'element-ui';
//import 'element-ui/lib/theme-chalk/index.css';
import '../element-variables.scss'

Vue.use(ElementUI);

//引入一些全局变量
import global from './constant/global.vue'
Vue.prototype.global = global;

import axios from 'axios'
Vue.prototype.$ajax= axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
