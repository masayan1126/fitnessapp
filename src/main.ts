import firebase from 'firebase';
import 'firebase/firestore';
import Vue from 'vue';
import VueYoutube from 'vue-youtube';
import App from './App.vue';
import router from './router';
import store from './store';
import Loading from './components/Loading.vue';
// Bootstrapのスタイルシート側の機能を読み込む
import 'bootstrap/dist/css/bootstrap.min.css';
// BootstrapのJavaScript側の機能を読み込む
import 'bootstrap';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';


Vue.use(VueYoutube);

Vue.config.productionTip = false;
Vue.component('Loading', Loading);

router.beforeEach((to, from, next) => {
  // next({ path: '/lording' });
  next();
});

const VueTouch = require('vue-touch');

Vue.use(VueTouch, { name: 'v-touch' });

const firebaseConfig = {
  apiKey: 'AIzaSyDe5UEI4wiGxd7xG4Ow7znhA6f80j4Mg_M',
  authDomain: 'my-fitness-4624a.firebaseapp.com',
  databaseURL: 'https://my-fitness-4624a.firebaseio.com',
  projectId: 'my-fitness-4624a',
  storageBucket: 'my-fitness-4624a.appspot.com',
  messagingSenderId: '143844526446',
  appId: '1:143844526446:web:db8503ab7bf5ebec38d97f',
  measurementId: 'G-ZHJ1XMEBH0',
};
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
