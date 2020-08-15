<script lang="ts">
import Vue from 'vue';
import 'firebase/firestore';
import firebase from 'firebase';
import { Line } from 'vue-chartjs';

export interface Chart1sub {
  db: any,
  fitnessCollection: any,
  number: number,
  selectedMonth: string,
  data: any,
  options: any,
}

export default Vue.extend({
  extends: Line,
  name: 'chart1sub',
  data():Chart1sub {
    return {
      db: null,
      fitnessCollection: null,
      number: 31,
      selectedMonth: '',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Changes in calorie consumption per month',
            fill: true,
            data: [],
            borderColor: '#127681',
            borderWidth: 1,
            backgroundColor: [
              'rgba(18, 118, 129, 0.8)',
            ],
            lineTension: 0,
          },
        ],
      },
      options: {
        scales: {
          xAxes: [{
            ticks: {
              stepSize: 0,
            },
            scaleLabel: {
              display: true,
              labelString: 'date',
            },
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              max: 500,
              min: 100,
              stepSize: 2,
            },
            scaleLabel: {
              display: true,
              labelString: 'calorie',
            },
          }],
        },
      },
    };
  },
  created() {
    this.db = firebase.firestore();
    this.fitnessCollection = this.db.collection('My Fitness');
    this.redraw();
  },
  mounted() {
    // setTimeout(() => {
    //   this.renderChart(this.data, this.options);
    // }, 1000);
  },
  methods: {
    redraw() {
      this.fitnessCollection.orderBy('date', 'desc').limit(this.number)
        .where('userId', '==', this.$store.state.auth)
        .where('month', '==', this.$store.state.selectedMonth)
        .get()
        .then((snapshot:any) => {
          const arr = snapshot.docs.map((doc:any) => doc.data());
          const dataDocs = arr.splice(0, this.number);
          this.data.datasets[0].data = [];
          this.data.labels = [];
          dataDocs.forEach((data:any) => {
            this.data.datasets[0].data.push(Number(data.burnedCalories));
            this.data.labels.push(data.date.substring(8, 10));
          });
          setTimeout(() => {
            this.renderChart(this.data, this.options);
          }, 1000);
        });
    },
  },
});
</script>
