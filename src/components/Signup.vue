<template>
  <div class="signup mt-5">
    <h2 class="mb-4">Sign up</h2>
    <div class="sign-container p-5 shadow">
      <div class="form-group mb-0 text-left">
        <input type="text" class="col-12 sign-input-layout"
        placeholder="username" v-model="username">
        <input type="email" class="col-12 sign-input-layout"
        placeholder="e-mail" v-model="mail">
        <input type="password" class="col-12 sign-input-layout"
        placeholder="Password" v-model="password">
        <div class="row mb-2 mt-2">
          <div class="col-4">
            <label for="user-height" class="p-0 mt-2">Height</label>
          </div>
          <div class="col-8 mb-2">
            <select v-model="selectedHeight" id="user-height"
              class="form-control shadow-sm">
              <option v-for="(height) in heightSelection" :key="height"
              :value="height">{{ height }}cm</option>
            </select>
          </div>
        </div>
        <div class="row mb-3 mt-2">
          <div class="col-4">
            <label for="user-weight" class="p-0 mt-2">Weight</label>
          </div>
          <div class="col-8">
            <select v-model="selectedWeight" id="user-weight"
              class="form-control shadow-sm">
              <option v-for="(weight) in weightSelection" :key="weight"
              :value="weight">{{ weight }}kg</option>
            </select>
          </div>
        </div>
        <button type="button" class="col-12 sign-btn shadow" @click="addUserData()">Done</button>
      </div>
    </div>
    <!-- containerここまで -->
    <p class="mt-3">Do you have an account?</p>
    <router-link class="color-green" to="/signin">Sign in now!!</router-link>
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
  },
});
</script>
