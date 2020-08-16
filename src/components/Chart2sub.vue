<script lang ="ts">
import Vue from 'vue';
import 'firebase/firestore';
import firebase from 'firebase';
import { Line } from 'vue-chartjs';

export interface Chart2sub {
  db: any,
  fitnessCollection: any,
  userProfileCollection: any,
  number: number,
  selectedMonth: string,
  data: any,
  options: any,
}

export default Vue.extend({
  extends: Line,
  name: 'chart2sub',
  data():Chart2sub {
    return {
      db: null,
      fitnessCollection: null,
      userProfileCollection: null,
      number: 31,
      selectedMonth: '',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Change in weight for one month',
            fill: true,
            data: [],
            borderColor: '#ffd700',
            borderWidth: 1,
            backgroundColor: [
              'rgba(255, 215, 0, 0.6)',
            ],
            lineTension: 0,
          },
        ],
      },
      options: {
        scales: {
          xAxes: [{
            ticks: {
            },
            scaleLabel: {
              display: true,
              labelString: 'date',
            },
          }],
          yAxes: [{
            ticks: {
              max: null,
              min: 44,
              stepSize: 1,
            },
            scaleLabel: {
              display: true,
              labelString: 'weight',
            },
          }],
        },
      },
    };
  },
  created() {
    console.log(this.options.scales.yAxes[0].ticks.max);
    this.db = firebase.firestore();
    this.fitnessCollection = this.db.collection('My Fitness');
    this.userProfileCollection = this.db.collection('userProfile');
  },
  mounted() {
    setTimeout(() => {
      this.redraw();
    }, 1000);
  },
  methods: {
    redraw() {
      this.userProfileCollection
        .where('userId', '==', this.$store.state.auth).get()
        .then((snapshot:any) => {
          snapshot.docs.forEach((doc:any) => {
            this.options.scales.yAxes[0].ticks.max = doc.data().weight + 40;
          });
        });
      this.fitnessCollection.orderBy('date', 'desc').limit(this.number)
        .where('userId', '==', this.$store.state.auth)
        .where('month', '==', this.$store.state.selectedMonth)
        .get()
        .then((snapshot:any) => {
          const arr:any[] = snapshot.docs.map((doc:any) => doc.data());
          const dataDocs:any[] = arr.splice(0, this.number);
          this.data.datasets[0].data = [];
          this.data.labels = [];
          dataDocs.forEach((data:any) => {
            this.data.datasets[0].data.push(Number(data.weightData));
            this.data.labels.push(data.date.substring(8, 10));
          });
          this.data.labels.reverse();
          setTimeout(() => {
            this.renderChart(this.data, this.options);
          }, 1000);
        });
    },
  },
});
</script>
