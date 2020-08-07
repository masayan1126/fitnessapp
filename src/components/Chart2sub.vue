<script lang ="ts">
import Vue from 'vue';
import 'firebase/firestore';
import firebase from 'firebase';
import { Line } from 'vue-chartjs';

export interface Chart2sub {
  db: any,
  fitnessCollection: any,
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
              beginAtZero: true,
              max: 100,
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
    this.db = firebase.firestore();
    this.fitnessCollection = this.db.collection('My Fitness');
  },
  mounted() {
    setTimeout(() => {
      this.redraw();
    }, 1000);
  },
  methods: {
    redraw() {
      this.fitnessCollection.orderBy('date', 'desc').limit(this.number)
        .where('userId', '==', this.$store.state.auth)
        .where('month', '==', this.$store.state.selectedMonth)
        .get()
        .then((snapshot:any) => {
          const arr:any[] = snapshot.docs.map((doc:any) => doc.data());
          const dataDocs:any[] = arr.splice(0, this.number);
          console.log(dataDocs.reverse());
          this.data.datasets[0].data = [];
          this.data.labels = [];
          dataDocs.forEach((data:any) => {
            this.data.datasets[0].data.push(Number(data.weightData));
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
