import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;
Vue.config.devtools = true;

new Vue({
  render: (h): Vue.VNode => h(App),
}).$mount('#app');
