<template>
<transition appear>
  <div class="weight-analytics mt-4 mx-auto">
    <h3 class="text-left ml-3 mb-4">{{ $t("message.weight_analytics_title") }}</h3>
    <div class="form-group">
      <select v-model="selectedMonth" @change="changeMonth(selectedMonth)"
      class="form-control float-right col-4 mr-4 p-1" name="" id="exampleFormControlSelect1">
        <option :value="defaultMonth">{{defaultMonth}}</option>
        <option v-for="(month) in months" :key="month.value"
        :value="month.value">{{ month.value }}</option>
      </select>
    </div>
    <Chart2sub ref="methods" class="ml-3 mr-3 shadow"></Chart2sub>
  </div>
</transition>
</template>

<script lang ="ts">
import firebase from 'firebase';
import 'firebase/firestore';
import Vue from 'vue';
import Chart2sub from './Chart2sub.vue';

interface MonthSelection {
  value: string,
}

export interface WeightAnalytics {
  db: any,
  userProfileCollection: any,
  months: MonthSelection[],
  selectedMonth: string,
  defaultMonth: string,
  signupYear: string,
  signupMonth: string,
}

export default Vue.extend({
  name: 'weightanalytics',
  components: {
    Chart2sub,
  },
  data():WeightAnalytics {
    return {
      db: null,
      userProfileCollection: null,
      months: [],
      selectedMonth: '',
      defaultMonth: '',
      signupYear: '',
      signupMonth: '',
    };
  },
  async created() {
    this.db = firebase.firestore();
    console.log(this.db);
    this.userProfileCollection = this.db.collection('userProfile');
    await this.userProfileCollection
      .where('userId', '==', this.$store.state.auth).get()
      .then((querySnapshot:any) => {
        console.log(querySnapshot);
        querySnapshot.docs.forEach((doc:any) => {
          const signupYear = doc.data().signupDate.substr(0, 4);
          this.signupYear = signupYear;
          const signupMonth = doc.data().signupDate.substr(-2, 2);
          if (signupMonth.substr(0, 1) === '0') {
            this.signupMonth = signupMonth.substr(-1, 1);
          } else {
            this.signupMonth = signupMonth.substr(-2, 2);
          }
        });
      });
    this.makeSelect();
  },
  mounted() {
  },
  methods: {
    changeMonth(selectedMonth:string) {
      this.$store.state.selectedMonth = selectedMonth;
      this.$refs.methods.redraw();
    },
    loading() {
      this.$store.state.loading = true;
    },
    makeSelect() {
      this.months = [];
      // const dataObj = new Date();
      let year = Number(this.signupYear);
      let month = Number(this.signupMonth);
      this.$store.state.selectedMonth = `${year}-0${month}`;
      this.defaultMonth = `${year}-0${month}`;
      this.selectedMonth = `${year}-0${month}`;
      for (let i = 1; i <= 1000; i += 1) {
        if (month > 11) {
          year += 1;
          month = 1;
          const now:string = `${year}-0${month}`;
          const monthSelection:MonthSelection = {
            value: now,
          };
          this.months.push(monthSelection);
        } else {
          month += 1;
          if (String(month).length === 1) {
            const now:string = `${year}-0${month}`;
            const monthSelection:MonthSelection = {
              value: now,
            };
            this.months.push(monthSelection);
          } else {
            const now:string = `${year}-${month}`;
            const monthSelection:MonthSelection = {
              value: now,
            };
            this.months.push(monthSelection);
          }
        }
      }
    },
  },
});
</script>

<style lang ="scss">
.weight-analytics,.burned-calories-analytics{
  max-width: 700px;
  max-height: 700px;
}
</style>
