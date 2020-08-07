import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 共通
    navbarToggler: true,
    auth: null,
    loading: true,
    // 認証系
    userName: '',
    password: '',
    // Music系
    artistList:
      [
        { name: 'AKLO', channelId: 'UCYS3mk7wEJtAcuuzMdxRL-A', query: 'AKLO' },
        { name: 'SALU', channelId: 'UCEKfSdDkX1fuJ2PX-sXkNpg', query: 'SALU' },
        { name: 'ZORN', channelId: 'UC4nFXu3gS34mJlaEVchsRWw', query: 'ZORN' },
        { name: 'NORIKIYO', channelId: 'UCLhmcnghttE5PULLtBh-Lpg', query: 'NORIKIYO' },
        { name: 'KREVA', channelId: 'UCBw5UGXnygjDQRoGfl8HaDQ', query: 'KREVA' },
        { name: 'KOHH', channelId: 'UCky2_T6UT_05FJ_osRtmf9Q', query: 'KOHH' },
        { name: 'BADHOP', channelId: 'UCcb0Ixexedx7eXLzgYZh6bg', query: 'BADHOP' },
        { name: 'T-PABLOW', channelId: 'UCiKl9VKeljzsbz8LlolrAcQ', query: 'T-PABLOW' },
        { name: 'KEN THE 390', channelId: 'UCJ2KPK3QvONKhXMwm8FzxZQ', query: 'KEN THE 390' },
      ],
    songList: [],
    artistName: '',
    // 統計系
    selectedMonth: '',
    // ユーザープロフィール系
    height: 0,
    standardWeight: 0,
    standardbodyMassIndex: 22,
    bodyMassIndex: 0,
  },
  mutations: {
    loading(state) {
      setTimeout(() => {
        state.loading = false;
      }, 3000);
    },
  },
  actions: {
    loading(context) {
      context.commit('loading');
    },
  },
});
