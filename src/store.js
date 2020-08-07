"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var vuex_1 = require("vuex");
vue_1["default"].use(vuex_1["default"]);
exports["default"] = new vuex_1["default"].Store({
    state: {
        // 共通
        navbarToggler: true,
        auth: null,
        loading: true,
        // 認証系
        userName: '',
        password: '',
        // Music系
        artistList: [
            { name: 'AKLO', channelId: 'UCYS3mk7wEJtAcuuzMdxRL-A', query: 'AKLO' },
            { name: 'SALU', channelId: 'UCEKfSdDkX1fuJ2PX-sXkNpg-A', query: 'SALU' },
            { name: 'ZORN', channelId: 'UCJTyxF0P4_xTtWn2VHK7lMA', query: 'ZORN' },
            { name: 'NORIKIYO', channelId: 'UCJTyxF0P4_xTtWn2VHK7lMA', query: 'ZORN' },
            { name: 'KREVA', channelId: 'UCJTyxF0P4_xTtWn2VHK7lMA', query: 'ZORN' },
            { name: 'KLOOZ', channelId: 'UCJTyxF0P4_xTtWn2VHK7lMA', query: 'ZORN' },
            { name: 'KICKTHECANCREW', channelId: 'UCJTyxF0P4_xTtWn2VHK7lMA', query: 'ZORN' },
            { name: 'KOHH', channelId: 'UCJTyxF0P4_xTtWn2VHK7lMA', query: 'ZORN' },
            { name: 'BADHOP', channelId: 'UCJTyxF0P4_xTtWn2VHK7lMA', query: 'ZORN' },
            { name: 'TPABLOW', channelId: 'UCJTyxF0P4_xTtWn2VHK7lMA', query: 'ZORN' },
            { name: 'MC松島', channelId: 'UCJTyxF0P4_xTtWn2VHK7lMA', query: 'ZORN' },
            { name: 'MARIA', channelId: 'UCJTyxF0P4_xTtWn2VHK7lMA', query: 'ZORN' },
            { name: 'ANARCHY', channelId: 'UCJTyxF0P4_xTtWn2VHK7lMA', query: 'ZORN' },
            { name: '般若', channelId: 'UCJTyxF0P4_xTtWn2VHK7lMA', query: 'ZORN' },
            { name: 'SHINGO★西成', channelId: 'UCJTyxF0P4_xTtWn2VHK7lMA', query: 'ZORN' },
            { name: 'CHICO CARLITO', channelId: 'UCJTyxF0P4_xTtWn2VHK7lMA', query: 'ZORN' },
            { name: 'Awich', channelId: 'UCJTyxF0P4_xTtWn2VHK7lMA', query: 'ZORN' },
            { name: '唾奇', channelId: 'UCJTyxF0P4_xTtWn2VHK7lMA', query: 'ZORN' },
            { name: 'SKY-HI', channelId: 'UCJTyxF0P4_xTtWn2VHK7lMA', query: 'ZORN' },
            { name: 'Young Hastle', channelId: 'UCJTyxF0P4_xTtWn2VHK7lMA', query: 'ZORN' },
            { name: 'Novel Core', channelId: 'UCJTyxF0P4_xTtWn2VHK7lMA', query: 'ZORN' },
            { name: 'PUNPEE', channelId: 'UCJTyxF0P4_xTtWn2VHK7lMA', query: 'ZORN' },
            { name: 'GADORO', channelId: 'UCJTyxF0P4_xTtWn2VHK7lMA', query: 'ZORN' },
            { name: 'JAZEE MINOR', channelId: 'UCJTyxF0P4_xTtWn2VHK7lMA', query: 'ZORN' },
            { name: 'COMA-CHI', channelId: 'UCJTyxF0P4_xTtWn2VHK7lMA', query: 'ZORN' },
            { name: 'JAZEE MINOR', channelId: 'UCJTyxF0P4_xTtWn2VHK7lMA', query: 'ZORN' },
            { name: 'MC☆ニガリ a.k.a 赤い稲妻', channelId: 'UCJTyxF0P4_xTtWn2VHK7lMA', query: 'ZORN' },
            { name: 'MIYACHI', channelId: 'UCJTyxF0P4_xTtWn2VHK7lMA', query: 'ZORN' },
            { name: 'WILYWNKA', channelId: 'UCJTyxF0P4_xTtWn2VHK7lMA', query: 'ZORN' },
            { name: 'RAUDEF', channelId: 'UCJTyxF0P4_xTtWn2VHK7lMA', query: 'ZORN' },
            { name: 'KEN THE 390', channelId: 'UCJTyxF0P4_xTtWn2VHK7lMA', query: 'ZORN' },
        ],
        songList: [],
        artistName: '',
        // 統計系
        selectedMonth: '',
        // ユーザープロフィール系
        height: 0,
        standardWeight: 0,
        standardbodyMassIndex: 22,
        bodyMassIndex: 0
    },
    mutations: {
        loading: function (state) {
            setTimeout(function () {
                state.loading = false;
            }, 3000);
        }
    },
    actions: {
        loading: function (context) {
            context.commit('loading');
        }
    }
});
