<template>
  <div class="songlist mx-auto mt-4 container-fluied">
    <h3 class="mb-4 text-left">{{this.$store.state.artistName}}</h3>
    <ul class="list-group">
      <transition appear>
        <div class="row justify-content-center">
        <li class="d-block list-group-item m-2 music-list col-xs-12 col-sm-5 col-md-4 col-lg-3"
          v-for="(song, index) in videoList" :key="song.id">
          <youtube @playing="playing(song.id, song.title, index)"
          :video-id="song.id"/><button type="button" @click="addPlayList(song.id, song.title)"
          class="btn text-white btn-danger mt-1 mb-1 add-playlist shadow">
          {{ $t("message.song_button_addplaylist") }}
          </button>
        </li>
        </div>
      </transition>
    </ul>
    <Loading v-show="this.$store.state.loading"></Loading>
    <p class="m-3" @click="reloadVideo()"><i class="fas fa-sync-alt"></i>
    {{ $t("message.song_button_reload") }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import firebase from 'firebase';
import 'firebase/firestore';

interface LocalStObj {
  id: string,
  title: string,
}

interface SongObj {
  id: string,
  title: string,
}

interface Song {
  db: any,
  musicCollection: any,
  videoList: SongObj[],
  recentlySongDataArr: LocalStObj[],
  count: number,
  songList: SongObj[],
  idArray: string[],
}

export default Vue.extend({
  name: 'song',
  data(): Song {
    return {
      db: null,
      musicCollection: null,
      videoList: [],
      recentlySongDataArr: [],
      count: 0,
      songList: [],
      idArray: [],
    };
  },
  mounted() {
  },
  methods: {
    // 再生したらローカルストレージに追加
    playing(id: string, title: string) {
      this.recentlySongDataArr.push({ id, title });
      localStorage.setItem('recentlySongDataList', JSON.stringify(this.recentlySongDataArr));
    },
    reloadVideo() {
      // 次の5件表示
      const arr: SongObj[] = this.songList.slice(this.count, this.count += 5);
      arr.forEach((video: SongObj) => {
        this.videoList.push(video);
      });
      this.count += 5;
    },
    addPlayList(id: string, title: string) {
      if (this.idArray.includes(id)) {
        alert(this.$i18n.t('message.song_alert_alreadyadd'));
      } else {
        this.musicCollection.add({
          created: firebase.firestore.FieldValue.serverTimestamp(),
          id,
          title,
          tag: 'on',
          userId: this.$store.state.auth,
        })
          .then((snapshot: any) => {
            alert(this.$i18n.t('message.song_alert_addcomplete'));
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
    // アーティスト一覧から渡ってきた楽曲一覧データを受け取る
    setTimeout(() => {
      this.songList = this.$store.state.songList;
      this.recentlySongDataArr = [];
      this.reloadVideo();
    }, 2000);
    this.$store.dispatch('loading');
    this.db = firebase.firestore();
    this.musicCollection = this.db.collection('musicCollection');
    this.idArray = [];
    this.musicCollection.orderBy('created')
      .where('userId', '==', this.$store.state.auth).get()
      .then((querySnapshot: any) => {
        const idArr: string[] = querySnapshot.docs.map((doc: any) => doc.data().id);
        for (let i = 0; i <= idArr.length; i += 1) {
          const id = idArr[i];
          this.idArray.push(id);
        }
      });
  },
});

</script>

<style lang ="scss">
.songlist {
  width: 90%;
}
</style>
