"use strict";
exports.__esModule = true;
var firebase_1 = require("firebase");
require("firebase/firestore");
var vue_1 = require("vue");
var vue_youtube_1 = require("vue-youtube");
var App_vue_1 = require("./App.vue");
var router_1 = require("./router");
var store_1 = require("./store");
var Loading_vue_1 = require("./components/Loading.vue");
// Bootstrapのスタイルシート側の機能を読み込む
require("bootstrap/dist/css/bootstrap.min.css");
// BootstrapのJavaScript側の機能を読み込む
require("bootstrap");
require("@fortawesome/fontawesome-free/js/fontawesome");
require("@fortawesome/fontawesome-free/js/solid");
require("@fortawesome/fontawesome-free/js/regular");
var VueSocialSharing = require('vue-social-sharing');
vue_1["default"].use(vue_youtube_1["default"]);
vue_1["default"].config.productionTip = false;
vue_1["default"].component('Loading', Loading_vue_1["default"]);
router_1["default"].beforeEach(function (to, from, next) {
    // next({ path: '/lording' });
    next();
});
var VueTouch = require('vue-touch');
vue_1["default"].use(VueTouch, { name: 'v-touch' });
vue_1["default"].use(VueSocialSharing);
var firebaseConfig = {
    apiKey: 'AIzaSyDe5UEI4wiGxd7xG4Ow7znhA6f80j4Mg_M',
    authDomain: 'my-fitness-4624a.firebaseapp.com',
    databaseURL: 'https://my-fitness-4624a.firebaseio.com',
    projectId: 'my-fitness-4624a',
    storageBucket: 'my-fitness-4624a.appspot.com',
    messagingSenderId: '143844526446',
    appId: '1:143844526446:web:db8503ab7bf5ebec38d97f',
    measurementId: 'G-ZHJ1XMEBH0'
};
firebase_1["default"].initializeApp(firebaseConfig);
new vue_1["default"]({
    router: router_1["default"],
    store: store_1["default"],
    render: function (h) { return h(App_vue_1["default"]); }
}).$mount('#app');
