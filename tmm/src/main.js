import Vue from 'vue';
import App from './App.vue';

import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue);



import './firebase';
import VueFire from 'vuefire';

Vue.use(VueFire);


import Alert from './components/alerts/alert.vue';
Vue.component('app-alert', Alert);

new Vue({
  el: '#app',
  render: h => h(App)
})

