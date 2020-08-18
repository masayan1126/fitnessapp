<template>
  <div class="signin container-fluid mx-auto mt-5">
    <h2 class="mb-4">{{ $t("message.signin_title") }}</h2>
    <div class="sign-container mx-auto p-5 shadow">
      <div class="form-group mb-0">
        <input type="email" class="m-2 col-12 sign-input-layout"
        :placeholder="$t('message.signin_input_mail')" v-model="mail">
        <input type="password" class="m-2 col-12 sign-input-layout"
        :placeholder="$t('message.signin_input_password')" v-model="password">
        <button type="button" class="m-2 sign-btn col-12 sign-input-layout
        shadow" @click="signIn">{{ $t("message.signin_button_done") }}</button>
      </div>
    </div>
    <p class="mt-5"><router-link class="color-green" to="/signup">
    {{ $t("message.signin_link_create_account") }}</router-link></p>
    <p class="mb-5" @click="testSignIn()"><i class="fas fa-user"></i>
    {{ $t("message.signin_link_guest_user") }}</p>
    <div class="btn-group btn-group-toggle" data-toggle="buttons">
      <label class="btn btn-secondary active btn-sm">
        <input @click="changeLanguageEn()" type="radio"
        name="options" id="option1" autocomplete="off" checked>English
      </label>
      <label class="btn btn-secondary btn-sm">
        <input @click="changeLanguageJa()"
        type="radio" name="options" id="option2" autocomplete="off"> 日本語
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import firebase from 'firebase';
import Vue from 'vue';

export type DataType = {
  mail: string,
  password: string,
  todayNumber: number,
  expirationDay: number,
}

export default Vue.extend({
  name: 'signin',
  data():DataType {
    return {
      mail: '',
      password: '',
      todayNumber: 0,
      expirationDay: 0,
    };
  },
  created() {
    const localSt = localStorage.getItem('signinData');
    if (localSt) {
      const todayObj = new Date();
      // 1970年1月1日00:00:00UTCからの経過ミリ秒数
      const today: number | null = todayObj.getTime();
      this.todayNumber = today;
      // JSON.parseは、JSON（文字列データをjavascriptで扱えるようにするメソッド）
      // ローカルストレージの期限内なら、メールアドレスとパスをセットする
      if (this.todayNumber < JSON.parse(localSt).expirationDay) {
        this.mail = JSON.parse(localSt).mailAdress;
        this.password = JSON.parse(localSt).password;
      }
    }
  },
  methods: {
    signIn() {
      firebase.auth().signInWithEmailAndPassword(this.mail, this.password).then(
        (user) => {
          const userId = user.user.uid;
          this.$store.state.auth = userId;
          alert('Success!');
          this.$router.push('/calendar');
          // 要修正
          this.$store.state.navbarToggler = false;
          // 604800秒は1週間
          const expirationDay = this.todayNumber + 604800;
          this.expirationDay = expirationDay;
          // 型推論される
          const signinData = {
            mailAdress: this.mail,
            password: this.password,
            expirationDay: this.expirationDay,
          };
          localStorage.setItem('signinData', JSON.stringify(signinData));
        },
        (err) => {
          alert(err.message);
        },
      );
    },
    testSignIn() {
      this.mail = 'matsushin@gmail.com';
      this.password = 'matsushin';
      this.signIn();
    },
    changeLanguageEn() {
      this.$i18n.locale = 'en';
    },
    changeLanguageJa() {
      this.$i18n.locale = 'ja';
    },
  },
});
</script>
