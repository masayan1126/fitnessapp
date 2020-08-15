<template>
  <transition appear>
  <div class="playlist m-3 mt-4">
    <h2 class="text-left">PlayList</h2>
    <!-- <router-link to="/playlists">一覧へ</router-link> -->
    <ul class="list-group">
      <li class="list-group-item"
      v-for="(song, index) in playList"
      :key="song.id">{{song.title}}
      <youtube @playing="playing(song.id, song.title)"
      :video-id="song.id"/><p @click="removePlayList(song.id, index)"
      class="btn text-white btn-danger
      mt-1 mb-1 shadow remove-playlist">Remove from Playlist</p></li>
    </ul>
    <Loading v-show="this.$store.state.loading"></Loading>
  </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';
import firebase from 'firebase';
import 'firebase/firestore';

interface LocalStObj {
  id: string,
  title: string,
}

interface IdObj {
  videoId: string[number],
  docId: string[number],
}

interface SongObj {
  id: string,
  title: string,
}

interface PlayList {
  db: any,
  musicCollection: any,
  recentlySongDataArr: LocalStObj[],
  count: number,
  playList: SongObj[],
  targetDataArr: IdObj[],
}

export default Vue.extend({
  name: 'playlist',
  data(): PlayList {
    return {
      db: null,
      musicCollection: null,
      recentlySongDataArr: [],
      count: 0,
      playList: [],
      targetDataArr: [],
    };
  },
  methods: {
    playing(id: string, title: string) {
      this.recentlySongDataArr.push({ id, title });
      localStorage.setItem('recentlySongDataList', JSON.stringify(this.recentlySongDataArr));
    },
    removePlayList(id: string, index:number) {
      this.musicCollection.orderBy('created')
        .where('userId', '==', this.$store.state.auth).get()
        .then((querySnapshot: any) => {
          this.playList.slice(index, 1);
          const docIdArr = querySnapshot.docs.map((doc: any) => doc.id);
          this.musicCollection.doc(`${docIdArr[index]}`).delete();
          alert('削除完了');
          this.showPlayList();
        });
    },
    showPlayList() {
      this.playList = [];
      this.musicCollection.orderBy('created')
        .where('userId', '==', this.$store.state.auth).get()
        .then((querySnapshot: any) => {
          const idArr = querySnapshot.docs.map((doc: any) => doc.data().id);
          const titleArr = querySnapshot.docs.map((doc: any) => doc.data().title);
          for (let i = 0; i < idArr.length; i += 1) {
            const playListObj = {
              id: idArr[i],
              title: titleArr[i],
            };
            if (idArr.length === 0) {
              return;
            }
            this.playList.push(playListObj);
          }
        });
    },
  },
  created() {
    this.$store.dispatch('loading');
    this.db = firebase.firestore();
    this.musicCollection = this.db.collection('musicCollection');
  },
  mounted() {
    this.showPlayList();
  },
});

</script>
