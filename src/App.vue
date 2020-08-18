<template>
  <div id="app">
    <nav class="navbar text-left navbar-expand-lg
    navbar-dark bg-dark shadow">
      <a class="navbar-brand" href="#">My fitness</a>
      <!-- storeのオンオフの切り替えでnav-itemにhideクラスを付与する -->
      <button id="navbar-toggler" class="navbar-toggler" type="button"
      :class="{ hide: $store.state.navbarToggler }"
      data-toggle="collapse" data-target="#navbarNavDropdown"
      aria-controls="navbarNavDropdown" aria-expanded = "false"
      aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
        <ul class="navbar-nav" id="navbar-nav" :class="{ hide: $store.state.navbarToggler }">
          <li @click="logout()" class="nav-item active p-1"><router-link class="color-green" to="*">
          {{ $t("message.navmenu_signout") }}<span class="sr-only"></span></router-link></li>
          <li @click="closeNav()" :click="loading()" class="nav-item p-1">
          <router-link class="color-green" to="/calendar">
          {{ $t("message.navmenu_calendar") }}<span class="sr-only"></span></router-link></li>
          <li @click="closeNav()" :click="loading()" class="nav-item p-1">
          <router-link class="color-green" to="/music">{{ $t("message.navmenu_music") }}
          </router-link></li>
          <li @click="closeNav()" :click="loading()" class="nav-item p-1">
          <router-link class="color-green" to="/mydata">{{ $t("message.navmenu_mydata") }}
          </router-link></li>
          <li class="nav-item dropdown dropleft">
            <a class="nav-link dropdown-toggle p-1" href="#"
          id="navbarDropdownMenuLink" role="button" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false">{{ $t("message.navmenu_analytics") }}</a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li @click="closeNav()"><router-link
              class="dropdown-item color-green" to="/weightanalytics">
              {{ $t("message.navmenu_weight_analytics") }}
              </router-link></li>
              <li @click="closeNav()"><router-link
              class="dropdown-item color-green" to="/burnedcaloriesanalytics">
              {{ $t("message.navmenu_burnedcalories_analytics") }}</router-link></li>
            </div>
          </li>
        </ul>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import firebase from 'firebase';
import 'firebase/firestore';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  text: string = '';

  closeNav() {
    // ダミー
    this.text = 'test';
    // ナビゲーションバーのメニューを押して遷移する直前にバーを閉じる
    const navbarNavDropdown = document.getElementById('navbarNavDropdown');
    // navbarNavDropdown 変数が null でなければ getElementById() を呼び出し、null なら何もしないという宣言になります。
    navbarNavDropdown!.classList.toggle('show');
  }

  private logout() {
    this.$store.state.navbarToggler = true;
    this.$store.state.auth = '';
    this.closeNav();
    firebase.auth().signOut()
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  private loading() {
    this.$store.state.loading = true;
  }
}

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height:100vh;
  background-color:#f2f3f3;
  width: 100%;
}

.hide{
  display: none !important;
}

a{
  text-decoration: none;
}

li{
  list-style: none;
}

/* 共通のフレームサイズ設定 */
iframe {
  width: 90%;
  height: 75%;
}

.v-enter-active, .v-leave-active {
  transition: opacity .5s
}

.v-enter, .v-leave-to {
  opacity: 0
}

.color-green {
  color: #127681;
}

.sign-input-layout {
  margin: 10px 0;
  padding: 10px;
}

.sign-btn{
  color:white;
  background-color:#127681 ;
  border-radius: .15rem;
  padding:7px 75px;
  border: none;
}

.sign-container{
  max-width: 350px;
  background-color: rgb(237, 235, 235);
  width: 90%;
}

input {
  font-size:18px;
  // transform: scale(0.8);
}
select {
  font-size:18px;
  // transform: scale(0.8);
}

</style>
