import Vue from 'vue';
import App from './App.vue';

//muse-ui
import MuseUI from 'muse-ui';
Vue.use(MuseUI);

//firebase
import './firebase';
import VueFire from 'vuefire';
Vue.use(VueFire);

//alerts global
import Alert from './components/alerts/alert.vue';
import Toast from './components/alerts/toast.vue';
Vue.component('app-alert', Alert);
Vue.component('app-notification', Toast);

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
import Event from './components/layouts/event-detailed.vue';
import Friends from './components/layouts/friends.vue';
import Profile from './components/layouts/profile.vue';
import CreateEvent from './components/layouts/create-event.vue';

var routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/currencies', component: Currencies },
    { path: '/events', component: Events },
    { path: '/friends', component: Friends },
    { path: '/profile', component: Profile },
    { path: '/create-event', component: CreateEvent },
    { path: '/events/event/:event_id', name: 'event', component: Event }
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

