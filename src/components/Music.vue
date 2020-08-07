<template>
  <transition appear>
    <div class="music m-3 mt-4">
      <h3 class="text-left">Library</h3>
      <ul class="list-group mb-4 ml-2 mr-2 text-left shadow">
        <router-link class="color-green" to="/searchsong">
          <li class="list-group-item pt-3 pb-3">Search</li>
        </router-link>
        <router-link class="color-green" to="/playlist">
          <li class="list-group-item pt-3 pb-3">Playlist</li></router-link>
        <router-link class="color-green" to="/artistList">
          <li class="list-group-item pt-3 pb-3">ArtistList</li>
        </router-link>
      </ul>
      <h3 class="text-left">Recently played</h3>
      <ul v-if="recentlySongDataArr.length" class="list-group">
        <li class="list-group-item shadow"
          v-for="(recentlySong) in recentlySongDataArr"
          :key="recentlySong.id">{{recentlySong.title}}<youtube
          :video-id="recentlySong.id"/>
        </li>
      </ul>
      <ul class="list-group" v-else>
        <li class="m-3">最近再生した曲はありません</li>
      </ul>
    <Loading v-show="this.$store.state.loading"></Loading>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';

interface LocalStObj {
  id: string,
  title: string,
}

interface Music {
  recentlySongDataArr: LocalStObj[],
}

export default Vue.extend({
  name: 'music',
  data():Music {
    return {
      recentlySongDataArr: [],
    };
  },
  async created() {
    this.$store.dispatch('loading');
    const localSt = localStorage.getItem('recentlySongDataList');
    const localStObj:LocalStObj[] = await JSON.parse(localSt!);
    if (localStObj) {
      console.log('最近再生したデータあり');
      this.recentlySongDataArr = [];
      localStObj.forEach((obj:LocalStObj) => {
        this.recentlySongDataArr.push(obj);
      });
    } else {
      console.log('最近再生したデータなし');
    }
  },
  mounted() {
  },
  methods: {
    loading() {
      this.$store.state.loading = true;
    },
  },
});

</script>
