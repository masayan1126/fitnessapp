<template>
  <div class="signup container mt-3">
    <h2 class="mb-4 mt-5">{{ $t("message.signup_title") }}</h2>
    <div class="sign-container mx-auto p-5 shadow">
      <div class="form-group mb-0 text-left">
        <input type="text" class="m-2 col-12 sign-input-layout"
        :placeholder="$t('message.signup_input_username')" v-model="username">
        <input type="email" class="m-2 col-12 sign-input-layout"
        :placeholder="$t('message.signup_input_mail')" v-model="mail">
        <input type="password" class="m-2 col-12 sign-input-layout"
        :placeholder="$t('message.signup_input_password')" v-model="password">
        <div class="row mt-1 ml-1">
          <div class="col-4">
            <label for="user-height" class="p-0 mt-2">
              {{ $t("message.signup_height") }}</label>
          </div>
          <div class="col-8 mb-1">
            <select v-model="selectedHeight" id="user-height"
              class="form-control shadow-sm">
              <option v-for="(height) in heightSelection" :key="height"
              :value="height">{{ height }}cm</option>
            </select>
          </div>
        </div>
        <div class="row mt-1 ml-1 mb-1">
          <div class="col-4">
            <label for="user-weight" class="p-0 mt-2">
              {{ $t("message.signup_weight") }}</label>
          </div>
          <div class="col-8">
            <select v-model="selectedWeight" id="user-weight"
              class="form-control shadow-sm">
              <option v-for="(weight) in weightSelection" :key="weight"
              :value="weight">{{ weight }}kg</option>
            </select>
          </div>
        </div>
        <button type="button" class="mt-3 col-12 sign-btn shadow"
        @click="addUserData()">{{ $t("message.signup_button_done") }}</button>
      </div>
    </div>
    <!-- containerここまで -->
    <p class="mt-5 mb-5"><router-link class="color-green" to="/signin">
    {{ $t("message.signin_link_signin") }}</router-link></p>
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
import 'firebase/firestore';
import Vue from 'vue';

export interface Signup {
  db: any,
  userProfileCollection: any,
  username: string,
  uid: any,
  mail: string,
  password: string,
  errorMessage: string | null,
  selectedHeight: number | null,
  selectedWeight: number | null,
  heightSelection: number[],
  weightSelection: number[],
  firstSignupDate: string,
}

export default Vue.extend({
  name: 'signup',
  data():Signup {
    return {
      db: null,
      userProfileCollection: null,
      username: '',
      uid: null,
      mail: '',
      password: '',
      errorMessage: null,
      selectedHeight: null,
      selectedWeight: null,
      heightSelection: [],
      weightSelection: [],
      firstSignupDate: '',
    };
  },
  created() {
    this.db = firebase.firestore();
    this.userProfileCollection = this.db.collection('userProfile');
    for (let h = 140; h <= 200; h += 1) {
      this.heightSelection.push(h);
    }
    for (let w = 30; w <= 100; w += 1) {
      this.weightSelection.push(w);
    }
  },
  methods: {
    signUp() {
      firebase.auth().createUserWithEmailAndPassword(this.mail, this.password)
        .then((user) => {
          alert('Success!');
          const userId = user.user.uid;
          this.$store.state.auth = userId;
          const date = new Date();
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const signupDate = `${year}-0${month}`;
          this.firstSignupDate = signupDate;
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.log(this.errorMessage);
        });
    },
    addProfile() {
      this.userProfileCollection.add({
        created: firebase.firestore.FieldValue.serverTimestamp(),
        userName: this.username,
        userId: this.$store.state.auth,
        height: this.selectedHeight,
        weight: this.selectedWeight,
        signupDate: this.firstSignupDate,
      });
    },
    async addUserData() {
      if (this.password.length < 6) {
        alert('Password must be at least 6 characters');
      } else if (!this.mail.match(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/)) {
        alert('メールアドレスが不正です');
      } else if (this.password.length < 6 && !this.mail.match(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/)) {
        alert('Password must be at least 6 characters');
        alert('メールアドレスが不正です');
      } else {
        await this.signUp();
        await setTimeout(() => {
          this.addProfile();
        }, 2000);
        await setTimeout(() => {
          this.$store.state.navbarToggler = false;
          this.$router.push('/mydata');
        }, 3000);
      }
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
