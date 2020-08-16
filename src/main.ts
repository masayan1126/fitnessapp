import firebase from 'firebase';
import 'firebase/firestore';
import Vue from 'vue';
import VueYoutube from 'vue-youtube';
import VueI18n from 'vue-i18n';
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

import data from './message.json';

Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'en', // デフォルト言語はjaにしておくが、ブラウザの言語を拾ってきてここに入れる => 言語変更されたら書き換える
  messages: data,
});

Vue.use(VueYoutube);
Vue.config.productionTip = false;
Vue.component('Loading', Loading);

router.beforeEach((to, from, next) => {
  // next({ path: '/lording' });
  next();
});


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
  i18n,
  data: {},
  created() {},
  methods: {
    // changeLocale() {
    //   console.log(this.$i18n.locale);
    //   this.$i18n.locale = (this.$i18n.locale === 'ja') ? 'en' : 'ja';
    // },
  },
  render: (h) => h(App),
}).$mount('#app');
