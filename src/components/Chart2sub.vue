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
            label: this.$i18n.t('message.weight_analytics_label'),
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
              labelString: this.$i18n.t('message.weight_analytics_date'),
            },
          }],
          yAxes: [{
            ticks: {
              max: null,
              min: null,
              stepSize: 1,
            },
            scaleLabel: {
              display: true,
              labelString: this.$i18n.t('message.weight_analytics_weight'),
            },
          }],
        },
      },
    };
  },
  created() {
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
        .then((querySnapshot:any) => {
          querySnapshot.docs.forEach((doc:any) => {
            this.options.scales.yAxes[0].ticks.max = doc.data().weight + 20;
            this.options.scales.yAxes[0].ticks.min = doc.data().weight - 20;
          });
        });
      this.fitnessCollection.orderBy('date', 'desc').limit(this.number)
        .where('userId', '==', this.$store.state.auth)
        .where('month', '==', this.$store.state.selectedMonth)
        .get()
        .then((querySnapshot:any) => {
          const arr:any[] = querySnapshot.docs.map((doc:any) => doc.data());
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
