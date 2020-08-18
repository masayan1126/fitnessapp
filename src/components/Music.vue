<template>
  <transition appear>
    <div class="music m-3 mt-4 mx-auto">
      <h3 class="text-left mb-3">{{ $t("message.music_library") }}</h3>
      <ul class="list-group mb-4 text-left shadow-sm">
        <router-link class="color-green" to="/searchsong">
          <li class="list-group-item pt-3 pb-3">{{ $t("message.music_search") }}</li>
        </router-link>
        <router-link class="color-green" to="/playlist">
          <li class="list-group-item pt-3 pb-3">
            {{ $t("message.music_playlist") }}</li></router-link>
        <router-link class="color-green" to="/artistList">
          <li class="list-group-item pt-3 pb-3">{{ $t("message.music_artistList") }}</li>
        </router-link>
      </ul>
      <h3 class="text-left mb-3 mt-3">{{ $t("message.music_recentlyplayed_true") }}</h3>
      <ul v-if="recentlySongDataArr.length" class="list-group recentlyplayed">
        <li class="list-group-item shadow recentlyplayed"
          v-for="(recentlySong) in recentlySongDataArr"
          :key="recentlySong.id">{{recentlySong.title}}<youtube
          :video-id="recentlySong.id"/>
        </li>
      </ul>
      <ul class="list-group recentlyplayed" v-else>
        <li class="m-3">{{ $t("message.music_recentlyplayed_false") }}</li>
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
      this.recentlySongDataArr = [];
      localStObj.forEach((obj:LocalStObj) => {
        this.recentlySongDataArr.push(obj);
      });
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

<style lang ="scss">
.music{
  width: 70%;
}

@media screen and (min-width: 481px) {
  .recentlyplayed {
    height: 300px;
  }
}
@media screen and (min-width: 769px) {
  .recentlyplayed {
    height: 500px;
  }
}

</style>
