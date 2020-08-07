<template>
  <transition appear>
  <div class="playlists m-3 mt-4 container">
    <h2>プレイリスト一覧</h2>
  <div class="row">
<div class="card" style="width: 18rem;">
  <svg class="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Image cap"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"/><text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text></svg>
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick exrd title of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>

  </div>
    <!-- <ul class="list-group">
      <li class="list-group-item"
      v-for="(song, index) in playList"
      :key="song.id">{{song.title}}
      <youtube @playing="playing(song.id, song.title)"
      :video-id="song.id"/><p @click="removePlayList(song.id, index)"
      class="remove-playlist">プレイリストから削除する</p></li>
    </ul> -->
    <Loading v-show="this.$store.state.loading"></Loading>
    <p class="m-3" @click="reloadVideo()"><i class="fas fa-sync-alt"></i>次の5件</p>
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
  name: 'playlists',
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
          // const docArr = querySnapshot.docs.map(function(doc: any, index: number) {
          //   return doc.data();
          // });
          const docIdArr = querySnapshot.docs.map((doc: any) => doc.id);
          // for (let i = 0; i <= docIdArr.length; i += 1) {
          //   const idObj: IdObj = {
          //     videoId: docArr[i],
          //     docId: docIdArr[i],
          //   };
          //   this.targetDataArr.push(idObj);
          // }
          // const targetDataObj = this.targetDataArr.filter((value:any) => value.videoId === id);
          this.musicCollection.doc(`${docIdArr[index]}`).delete();
          alert('削除完了');
          // setTimeout(() => {
          this.showPlayList();
          this.$router.push('/playlist');
          // }, 1000);
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
