<template>
  <div class="profile mx-auto mt-3">
    <h2 class="p-4 text-left">{{ $t("message.mydata_title") }}</h2>
    <div class="container text-left">
      <ul class="list-group shadow pt-4 pb-5">
        <li class="list-group-item d-flex justify-content-between align-items-center">
          {{ $t("message.mydata_username") }}
          <span class="color-green">{{ username }}</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center">
          {{ $t("message.mydata_height") }}
          <span class="color-green">{{ height }}cm</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center">
          {{ $t("message.mydata_weight") }}
          <span class="color-green">{{ weight }}kg</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center">
          {{ $t("message.mydata_suitable_weight") }}
          <span class="color-green">{{ standardWeight }}kg</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center">
          {{ $t("message.mydata_bmi") }}
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
  username: string;
  db: any;
  userProfileCollection: any;
  height: number;
  weight: number;
  standardbodyMassIndex: number;
}

export default Vue.extend({
  name: 'mydata',
  data(): Mydata {
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
      .where('userId', '==', this.$store.state.auth)
      .get()
      .then((querySnapshot: any) => {
        querySnapshot.docs.forEach((doc: any) => {
          this.username = doc.data().userName;
          this.height = doc.data().height;
          this.weight = doc.data().weight;
        });
      });
  },
  computed: {
    standardWeight(): number {
      return Math.floor((this.height * 0.01) ** 2 * this.standardbodyMassIndex);
    },
    bodyMassIndex(): number {
      return Math.floor(this.weight / (this.height * 0.01) ** 2);
    },
  },
});
</script>

<style scoped lang="scss">
li {
  background-color: #f2f3f3;
  border-top: none;
  border-left: none;
  border-right: none;
}

.profile{
  max-width: 700px;
  max-height: 700px;
}
</style>
