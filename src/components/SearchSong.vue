<template>
  <transition appear>
  <div class="searchsong mx-auto mt-4 container-fluied">
    <h3 class="text-left mt-2">{{ $t("message.searchsong_title") }}</h3>
    <div class="input-group shadow-sm mt-3 mb-3 w-75 mx-auto">
      <input type="text" v-model="searchquery" id="search-form" class="form-control"
      placeholder="Search for YOUTUBE"
      aria-label="Recipient's username" aria-describedby="basic-addon2">
      <div class="input-group-append" @click="search()">
        <span class="input-group-text" id="basic-addon2">
        <i class="fas fa-search"></i></span>
      </div>
    </div>
    <ul class="list-group">
      <transition appear>
      <div class="row justify-content-center">
      <li class="d-block list-group-item m-2 music-list col-xs-12 col-sm-5 col-md-4 col-lg-3"
        v-for="(song, index) in this.videoList"
        :key="song.id">
        <youtube @playing="playing(song.id, song.title, index)"
        :video-id="song.id"/><button type="button" @click="addPlayList(song.id, song.title)"
        class="btn text-white btn-danger mt-1 mb-1 add-playlist shadow">
        {{ $t("message.searchsong_button_addplaylist") }}
        </button></li>
      </div>
      </transition>
    </ul>
      <Loading v-show="this.$store.state.loading"></Loading>
      <p class="m-3 hide" id="reload" @click="reloadVideo()">
        <i id="reload-icon" class="fas fa-sync-alt"></i>
        {{ $t("message.searchsong_button_reload") }}</p>
</div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';
import firebase from 'firebase';
import 'firebase/firestore';

interface SongObj {
  id: string,
  title: string,
}

interface LocalStObj {
  id: string,
  title: string,
}

interface SearchSong {
  db: any,
  musicCollection: any,
  searchquery: string,
  videoList: SongObj[],
  count: number,
  songList: SongObj[],
  idArray: string[],
  recentlySongDataArr: LocalStObj[],
}

export default Vue.extend({
  name: 'searchsong',
  data(): SearchSong {
    return {
      db: null,
      musicCollection: null,
      searchquery: '',
      videoList: [],
      count: 0,
      songList: [],
      idArray: [],
      recentlySongDataArr: [],
    };
  },
  mounted() {
    const searchForm = document.getElementById('search-form');
    setTimeout(() => {
      searchForm!.focus();
    }, 3000);
  },
  methods: {
    playing(id: string, title: string) {
      this.recentlySongDataArr.push({ id, title });
      localStorage.setItem('recentlySongDataList', JSON.stringify(this.recentlySongDataArr));
    },
    reloadVideo() {
      console.log(this.songList);
      console.log(this.videoList);
      const arr = this.songList.slice(this.count, this.count += 5);
      arr.forEach((video) => {
        this.videoList.push(video);
      });
      this.count += 5;
    },
    async search() {
      this.count = 5;
      this.songList = [];
      this.videoList = [];
      const res = await
      fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${this.searchquery}&key=AIzaSyDENmeM9nK1AYLgE1xWl9ZUezZPTvXJYls&maxResults=20`);
      const json = await res.json();
      const jsonItems = await json.items;
      const idArr = await jsonItems.map((item: any) => item.id.videoId);
      const titleArr = await jsonItems.map((item :any) => item.snippet.title);
      for (let i = 1; i <= idArr.length; i += 1) {
        const dataObj: SongObj = {
          id: `${idArr[i]}`,
          title: titleArr[i],
        };
        this.songList.push(dataObj);
      }
      this.reloadVideo();
      // 検索後、リロードアイコンを表示
      const reloadIcon = document.getElementById('reload');
      reloadIcon!.classList.remove('hide');
    },
    addPlayList(id: string, title: string) {
      if (this.idArray.includes(id)) {
        alert(this.$i18n.t('message.searchsong_alert_alreadyadd'));
      } else {
        this.musicCollection.add({
          created: firebase.firestore.FieldValue.serverTimestamp(),
          id,
          title,
          tag: 'on',
          userId: this.$store.state.auth,
        })
          .then((snapshot: any) => {
            alert(this.$i18n.t('message.searchsong_alert_addcomplete'));
            const documentSnapshot = this.musicCollection.doc(`${snapshot.id}`);
            documentSnapshot.get()
              .then((doc: any) => {
                this.idArray.push(doc.data().id);
              });
          })
          .catch((error: any) => {
            console.log(error);
          });
      }
    },
  },
  created() {
    this.$store.dispatch('loading');
    this.db = firebase.firestore();
    this.musicCollection = this.db.collection('musicCollection');
  },
});

</script>

<style lang ="scss">
.searchsong {
  width: 90%;
}
</style>
