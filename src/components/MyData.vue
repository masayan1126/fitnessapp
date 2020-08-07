<template>
  <div class="profile">
    <h2 class="p-4 text-left">My Data</h2>
    <div class="container text-left">
  <ul class="list-group shadow pt-4 pb-5">
    <li class="list-group-item d-flex justify-content-between align-items-center">
      Username
      <span class="color-green">{{ username }}</span>
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-center">
     Height
      <span class="color-green">{{ height }}cm</span>
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-center">
      Weight
      <span class="color-green">{{ weight }}kg</span>
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-center">
      Suitable Weight
      <span class="color-green">{{ standardWeight }}kg</span>
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-center">
      BMI
      <span class="color-green">{{ bodyMassIndex }}</span>
    </li>
  </ul>
    </div>
    <Loading v-show="this.$store.state.loading"></Loading>
  </div>
</template>

<script lang="ts">
// import { Component, Prop, Vue } from 'vue-property-decorator';
import firebase from 'firebase';
import 'firebase/firestore';
import Vue from 'vue';

export interface Mydata {
  username: string,
  db: any,
  userProfileCollection: any,
  height: number,
  weight: number,
  standardbodyMassIndex: number,
}

export default Vue.extend({
  name: 'mydata',
  data():Mydata {
    return {
      username: '',
      db: null,
      userProfileCollection: null,
      height: 0,
      weight: 0,
      standardbodyMassIndex: 0,
    };
  },
  created() {
    this.$store.dispatch('loading');
    this.db = firebase.firestore();
    this.userProfileCollection = this.db.collection('userProfile');
    this.standardbodyMassIndex = this.$store.state.standardbodyMassIndex;
    this.userProfileCollection
      .where('userId', '==', this.$store.state.auth).get()
      .then((snapshot:any) => {
        snapshot.docs.forEach((doc:any) => {
          this.username = doc.data().userName;
          this.height = doc.data().height;
          this.weight = doc.data().weight;
        });
      });
  },
  computed: {
    standardWeight():number {
      return Math.floor(((this.height * 0.01) ** 2)
      * this.standardbodyMassIndex);
    },
    bodyMassIndex():number {
      return Math.floor(this.weight / ((this.height * 0.01) ** 2));
    },
  },
});
</script>

<style scoped lang="scss">
li {
  background-color: #f2f3f3;
  margin: 0 10px;
  border-top: none;
  border-left: none;
  border-right: none;
}
</style>
