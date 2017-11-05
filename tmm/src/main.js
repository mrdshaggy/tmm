import Vue from 'vue';
import App from './App.vue';

//bootstrap-vue
import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue);

//firebase
import './firebase';
import VueFire from 'vuefire';
Vue.use(VueFire);

//bootstrap-vue alerts global
import Alert from './components/alerts/alert.vue';
Vue.component('app-alert', Alert);

//datetime picker
import { Datetime } from 'vue-datetime';
Vue.use(Datetime);
Vue.component('app-datetime', Datetime);

//moneyjs
import Money from 'money';
Vue.use(Money);

//vue router
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Home from './components/layouts/home.vue';
import Login from './components/layouts/login.vue';
import Currencies from './components/layouts/currencies.vue';
import Events from './components/layouts/events.vue';
import Friends from './components/layouts/friends.vue';

var routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/currencies', component: Currencies },
    { path: '/events', component: Events },
    { path: '/friends', component: Friends },
];

var router = new VueRouter({
  routes: routes,
    mode: 'history',
});
Vue.use(router);

//init app
new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})

