<template>
  <div class="artistList container-fluied mt-4 mx-auto">
    <h2 class="mt-2 text-left">{{ $t("message.artistList_title") }}</h2>
    <ul class="list-group text-left">
      <router-link class="color-green" to="/song"><li @click="selectArtist($event)"
      class="list-group-item" v-for="(artist)
      in this.$store.state.artistList"
      :key="artist.channelId">{{artist.name}}</li></router-link>
    </ul>
    <!-- ▼未実装の機能▼ -->
    <!-- <input type="text" v-model="artistName">
    <button @click="addArtistList()">一覧に追加</button> -->
    <Loading v-show="this.$store.state.loading"></Loading>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
// import firebase from 'firebase';
// import 'firebase/firestore';

interface ArtistList {
  db: any,
  musicCollection: any,
  recentlySongDataArr: [],
}

export default Vue.extend({
  name: 'artistList',
  data() {
    return {
      artistName: '',
      // artistList: [],
    };
  },
  // props: ['artistlist'],
  async created() {
    this.$store.dispatch('loading');
  },
  mounted() {
  },
  methods: {
    async showArtistData(selectArtistName:string) {
      const res = await
      fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${selectArtistName} 曲&key=AIzaSyDENmeM9nK1AYLgE1xWl9ZUezZPTvXJYls&maxResults=50`);
      const json = await res.json();
      const jsonItems = await json.items;
      const idArr = jsonItems.map((item: any) => item.id.videoId);
      const titleArr = jsonItems.map((item: any) => item.snippet.title);
      this.$store.state.songList = [];
      for (let i = 1; i <= idArr.length; i += 1) {
        const dataObj = {
          id: `${idArr[i]}`,
          title: titleArr[i],
        };
        this.$store.state.songList.push(dataObj);
      }
      this.$store.state.artistName = selectArtistName;
    },
    selectArtist(event: any) {
      const selectArtistName: string = event.target.innerHTML;
      this.showArtistData(selectArtistName);
    },
    // ▼未実装の機能▼
    // addArtistList() {
    //   const newArtist = { name: this.artistName };
    //   this.$store.state.artistList.push(newArtist);
    // },
  },
});

</script>

<style lang ="css">
.artistList {
  max-width: 590px;
}
</style>