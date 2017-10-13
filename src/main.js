// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '@/router'
// import store from '@/store'

 // ivew UI组件
import iView from 'iview'
import '../theme/iview/index.less'

// ajax 
import axios from 'axios'
// import VueAxios from 'vue-axios'
import Qs from 'qs'

Vue.config.productionTip = false
// 强制启用devtools
Vue.config.devtools = true

Vue.use(iView)

var instance = axios.create({
  baseURL: '',
  //`withCredentails`选项表明了是否是跨域请求
  withCredentials: true,  
  timeout: 2000,
  //请求类型
  headers:{'Content-Type':'application/x-www-form-urlencoded'},
  transformRequest: [function (data) {
  	//x-www-form-urlencoded
    data = Qs.stringify(data);
    return data;
  }],
  //返回类型
  responseType: 'json'
});

Vue.prototype.$formHttp = instance

var jsonInst = axios.create({
  baseURL: '',
  //`withCredentails`选项表明了是否是跨域请求
  withCredentials: true,  
  timeout: 2000,
  //请求类型
  headers:{'Content-Type':'application/json'},
  //返回类型
  responseType: 'json'
});
Vue.prototype.$jsonHttp = jsonInst

// Vue.use(VueAxios, instance)



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  template: '<App/>',
  components: { App }
})
