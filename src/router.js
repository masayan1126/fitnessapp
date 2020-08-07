"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var vue_router_1 = require("vue-router");
// import firebase from 'firebase';
var Signup_vue_1 = require("./components/Signup.vue");
var Signin_vue_1 = require("./components/Signin.vue");
var Music_vue_1 = require("./components/Music.vue");
var Calendar_vue_1 = require("./components/Calendar.vue");
var Weather_vue_1 = require("./components/Weather.vue");
var ArtistList_vue_1 = require("./components/ArtistList.vue");
var Song_vue_1 = require("./components/Song.vue");
var PlayList_vue_1 = require("./components/PlayList.vue");
var WeightAnalytics_vue_1 = require("./components/WeightAnalytics.vue");
var BurnedCaloriesAnalytics_vue_1 = require("./components/BurnedCaloriesAnalytics.vue");
var Loading_vue_1 = require("./components/Loading.vue");
var SearchSong_vue_1 = require("./components/SearchSong.vue");
var MyData_vue_1 = require("./components/MyData.vue");
var PlayLists_vue_1 = require("./components/PlayLists.vue");
vue_1["default"].use(vue_router_1["default"]);
var router = new vue_router_1["default"]({
    mode: 'history',
    routes: [
        {
            path: '*',
            redirect: 'signin'
        },
        {
            path: '/',
            name: 'signin',
            component: Signin_vue_1["default"],
            meta: { requiresAuth: true }
        },
        {
            path: '/music',
            name: 'music',
            component: Music_vue_1["default"]
        },
        {
            path: '/artistList',
            name: 'artistList',
            component: ArtistList_vue_1["default"]
        },
        // {
        //   path: '/chart',
        //   name: 'chart',
        //   component: Chart,
        // },
        {
            path: '/calendar',
            name: 'calendar',
            component: Calendar_vue_1["default"]
        },
        {
            path: '/weather',
            name: 'weather',
            component: Weather_vue_1["default"]
        },
        {
            path: '/signup',
            name: 'Signup',
            component: Signup_vue_1["default"]
        },
        {
            path: '/signin',
            name: 'signin',
            component: Signin_vue_1["default"]
        },
        {
            path: '/song',
            name: 'song',
            component: Song_vue_1["default"]
        },
        {
            path: '/weightanalytics',
            name: 'weightanalytics',
            component: WeightAnalytics_vue_1["default"]
        },
        {
            path: '/burnedcaloriesanalytics',
            name: 'burnedcaloriesanalytics',
            component: BurnedCaloriesAnalytics_vue_1["default"]
        },
        {
            path: '/loading',
            name: 'loading',
            component: Loading_vue_1["default"]
        },
        {
            path: '/searchsong',
            name: 'searchsong',
            component: SearchSong_vue_1["default"]
        },
        {
            path: '/playlist',
            name: 'playlist',
            component: PlayList_vue_1["default"]
        },
        {
            path: '/mydata',
            name: 'mydata',
            component: MyData_vue_1["default"]
        },
        {
            path: '/playlists',
            name: 'playlists',
            component: PlayLists_vue_1["default"]
        },
    ]
});
// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
//   const { currentUser } = firebase.auth().currentUser;
//   if (requiresAuth) {
//     // このルートはログインされているかどうか認証が必要です。
//     // もしされていないならば、ログインページにリダイレクトします。
//     if (!currentUser) {
//       next({
//         path: '/signin',
//         query: { redirect: to.fullPath },
//       });
//     } else {
//       next();
//     }
//   } else {
//     next(); // next() を常に呼び出すようにしてください!
//   }
// });
exports["default"] = router;
