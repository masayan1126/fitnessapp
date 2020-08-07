import Vue from 'vue';
import Router from 'vue-router';
// import firebase from 'firebase';
import Signup from './components/Signup.vue';
import Signin from './components/Signin.vue';
import Music from './components/Music.vue';
import Calendar from './components/Calendar.vue';
import Weather from './components/Weather.vue';
import ArtistList from './components/ArtistList.vue';
import Song from './components/Song.vue';
import PlayList from './components/PlayList.vue';
import WeightAnalytics from './components/WeightAnalytics.vue';
import BurnedCaloriesAnalytics from './components/BurnedCaloriesAnalytics.vue';
import Loading from './components/Loading.vue';
import SearchSong from './components/SearchSong.vue';
import MyData from './components/MyData.vue';
import Playlists from './components/PlayLists.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: 'signin',
    },
    {
      path: '/',
      name: 'signin',
      component: Signin,
      meta: { requiresAuth: true },
    },
    {
      path: '/music',
      name: 'music',
      component: Music,
    },
    {
      path: '/artistList',
      name: 'artistList',
      component: ArtistList,
    },
    // {
    //   path: '/chart',
    //   name: 'chart',
    //   component: Chart,
    // },
    {
      path: '/calendar',
      name: 'calendar',
      component: Calendar,
    },
    {
      path: '/weather',
      name: 'weather',
      component: Weather,
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin,
    },
    {
      path: '/song',
      name: 'song',
      component: Song,
    },
    {
      path: '/weightanalytics',
      name: 'weightanalytics',
      component: WeightAnalytics,
    },
    {
      path: '/burnedcaloriesanalytics',
      name: 'burnedcaloriesanalytics',
      component: BurnedCaloriesAnalytics,
    },
    {
      path: '/loading',
      name: 'loading',
      component: Loading,
    },
    {
      path: '/searchsong',
      name: 'searchsong',
      component: SearchSong,
    },
    {
      path: '/playlist',
      name: 'playlist',
      component: PlayList,
    },
    {
      path: '/mydata',
      name: 'mydata',
      component: MyData,
    },
    {
      path: '/playlists',
      name: 'playlists',
      component: Playlists,
    },
  ],
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

export default router;
