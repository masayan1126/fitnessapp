<template>
  <transition appear>
  <div class="searchsong m-4">
    <h3 class="text-left mt-2">Search</h3>
    <div class="input-group shadow-sm mt-3 mb-3">
      <input type="text" v-model="searchquery" id="search-form" class="form-control"
      placeholder="Search for YOUTUBE"
      aria-label="Recipient's username" aria-describedby="basic-addon2">
      <div class="input-group-append" @click="search()">
        <span class="input-group-text" id="basic-addon2">
        <i class="fas fa-search"></i></span>
      </div>
    </div>
    <ul class="list-group shadow">
      <transition-group appear>
      <li class="list-group-item"
        v-for="(song, index) in this.videoList"
        :key="song.id">{{song.title}}
        <youtube @playing="playing(song.id, song.title, index)"
        :video-id="song.id"/><button type="button" @click="addPlayList(song.id, song.title)"
        class="btn text-white btn-danger mt-1 mb-1 add-playlist shadow">Add to playlist
        </button></li>
      </transition-group>
    </ul>
      <Loading v-show="this.$store.state.loading"></Loading>
      <p class="m-3 hide" id="reload" @click="reloadVideo()">
        <i id="reload-icon" class="fas fa-sync-alt"></i>Next 5</p>
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
    console.log(this.songList);
  },
  methods: {
    playing(id: string, title: string) {
      this.recentlySongDataArr.push({ id, title });
      localStorage.setItem('recentlySongDataList', JSON.stringify(this.recentlySongDataArr));
    },
    reloadVideo() {
      const arr = this.songList.slice(this.count, this.count += 5);
      arr.forEach((video) => {
        this.videoList.push(video);
      });
      this.count += 5;
    },
    async search() {
      console.log(this.songList);
      this.songList = [];
      const res = await
      fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${this.searchquery}&key=AIzaSyDENmeM9nK1AYLgE1xWl9ZUezZPTvXJYls&maxResults=50`);
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
        alert('Sorry Already added');
      } else {
        this.musicCollection.add({
          created: firebase.firestore.FieldValue.serverTimestamp(),
          id,
          title,
          tag: 'on',
          userId: this.$store.state.auth,
        })
          .then((snapshot: any) => {
            alert('Add complete!');
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
    // this.idArray = [];
    // this.musicCollection.orderBy('created')
    //   .where('userId', '==', this.$store.state.auth).get()
    //   .then((querySnapshot: any) => {
    //     const idArr: string[] = querySnapshot.docs.map((doc: any) => doc.data().id);
    //     for (let i = 0; i <= idArr.length; i += 1) {
    //       const id = idArr[i];
    //       this.idArray.push(id);
    //     }
    //   });
  },
});

</script>
