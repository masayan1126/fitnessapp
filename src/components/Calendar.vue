<template>
<transition appear>
  <div class="calendar p-3" @click = "showModal($event)">
    <p class="text-right mb-1">{{ $t("message.explanation") }}<span>
      <router-link class="color-green" to="/mydata">{{ userName }}</router-link></span> !!</p>
    <Weather/>
    <FullCalendar :height="440" defaultView="dayGridMonth" :plugins="calendarPlugins" />
    <div class="container container-fluid mt-2">
      <div class = "modal text-left fade" id= "exampleModalCenter" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalCenterTitle" aria-hidden="false">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header pl-0 pt-2 pb-2 adjustment-width">
              <h4 class="date modal-title" id="exampleModalCenterTitle">
              {{ date }}</h4>
            </div>
            <div class="row">
              <div class="col">
                <div class="modal-body p-4">
                  <label for="weight"><h5>WEIGHT</h5></label>
                  <select v-model.number="weight" class="form-control col-5 mb-4 shadow-sm"
                  id="weight"><span>kg</span>
                    <option disabled value="">Unselected</option>
                    <option v-for="(weight) in weightSelect" :key="weight.value"
                    :value="weight.value">{{ weight.number }}</option>
                  </select>
                  <h5 class="mt-4" id="performance">WORKOUT</h5>
                  <!-- pushup -->
                  <label class="" for="pushup">Pushup</label>
                  <img class="img-resize" src=@/assets/pushup.png alt="">
                  <select v-model.number="pushUpSelected"
                  class="form-control col-5 mb-4 shadow-sm" name="" id="pushup">
                    <option disabled value="">Unselected</option>
                    <option v-for="(pushup) in pushUpSelect" :key="pushup.value"
                    :value="pushup.value">{{ pushup.number }}</option>
                  </select>
                  <!-- pushup -->
                  <!-- shoulder -->
                  <label class="" for="shoulder">Shoulder</label>
                  <img class="img-resize" src=@/assets/shoulder.png alt="">
                  <select v-model.number="shoulderSelected"
                  class="form-control col-5 mb-4 shadow-sm"
                    name="" id="shoulder">
                    <option disabled value="">Unselected</option>
                    <option v-for="(shoulder) in shoulderSelect" :key="shoulder.value"
                    :value="shoulder.value">{{ shoulder.number }}</option>
                  </select>
                  <!-- shoulder -->
                  <!-- abs -->
                  <label class="" for="abs">Abs</label>
                  <img class="img-resize" src=@/assets/abs.png alt="">
                  <select v-model.number="absSelected"
                  class="form-control col-5 mb-4 shadow-sm"  name="" id="abs">
                    <option disabled value="">Unselected</option>
                    <option v-for="(abs) in absSelect" :key="abs.value"
                    :value="abs.value">{{ abs.number }}</option>
                  </select>
                  <!-- abs -->
                  <!-- absroller -->
                  <label class="" for="absroller">AbsRoller</label>
                  <img class="img-resize" src=@/assets/absroller.png alt="">
                  <select v-model.number="absrollerSelected"
                  class="form-control col-5 mb-4 shadow-sm"  name="" id="absroller">
                    <option disabled value="">Unselected</option>
                    <option v-for="(absRoller) in absRollerSelect" :key="absRoller.value"
                    :value="absRoller.value">{{ absRoller.number }}</option>
                  </select>
                  <!-- absroller -->
                  <!-- elliptical -->
                  <label class="" for="elliptical">Elliptical</label>
                  <img class="img-resize" src=@/assets/elliptical.png alt="">
                  <select v-model.number="ellipticalSelected"
                  class="form-control col-5 mb-4 shadow-sm"  name="" id="elliptical">
                    <option disabled value="">Unselected</option>
                    <option v-for="(elliptical) in ellipticalSelect" :key="elliptical.value"
                    :value="elliptical.value">{{ elliptical.number }}</option>
                  </select>
                  <p class="text-right">
                    Calories burned:<b>{{ totalBurnedCalories }}</b>kcal</p>
                  <!-- elliptical -->
                <div class="modal-footer">
                  <button type="button" @click="closeModal()"
                  class="btn btn-secondary shadow" data-dismiss="modal">Close</button>
                  <button @click ='addData()' type="button" id="addData"
                  class="btn shadow btn-primary change-btn-color" data-dismiss="modal">Done</button>
                  <button @click ='updateData()' type="button" id="updateData"
                  class="btn shadow btn-primary hide change-btn-color"
                  data-dismiss="modal">Update</button>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<script lang="ts">
import Vue from 'vue';
import firebase from 'firebase';
import 'firebase/firestore';
import FullCalendar from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import Weather from './Weather.vue';

export interface DataSelection {
  number: string,
  value: number,
}

export interface FitnessData {
  db: any,
  fitnessCollection: any,
  userProfileCollection: any,
  userName: string,
  targetDay: string,
  date: string,
  month: string,
  weight: number,
  pushUpSelected: number | null,
  shoulderSelected: number | null,
  absSelected: number | null,
  absrollerSelected: number | null,
  ellipticalSelected: number | null,
  weightSelect: DataSelection[],
  pushUpSelect: DataSelection[],
  shoulderSelect: DataSelection[],
  absSelect: DataSelection[],
  absRollerSelect: DataSelection[],
  ellipticalSelect: DataSelection[],
  pushupBurnedCaloriesOnce: number,
  shoulderBurnedCaloriesOnce: number,
  absBurnedCaloriesOnce: number,
  absrollerBurnedCaloriesOnce: number,
  ellipticalBurnedCaloriesOnce: number,
  calendarPlugins: any,
}

export default Vue.extend({
  components: {
    FullCalendar,
    Weather,
  },
  data():FitnessData {
    return {
      db: null,
      fitnessCollection: null,
      userProfileCollection: null,
      userName: '',
      targetDay: '',
      date: '',
      month: '',
      weight: 0,
      pushUpSelected: 0,
      shoulderSelected: 0,
      absSelected: 0,
      absrollerSelected: 0,
      ellipticalSelected: 0,
      weightSelect: [],
      pushUpSelect: [],
      shoulderSelect: [],
      absSelect: [],
      absRollerSelect: [],
      ellipticalSelect: [],
      pushupBurnedCaloriesOnce: 0.42,
      shoulderBurnedCaloriesOnce: 0.3,
      absBurnedCaloriesOnce: 0.7,
      absrollerBurnedCaloriesOnce: 0.7,
      ellipticalBurnedCaloriesOnce: 0.1,
      calendarPlugins: [dayGridPlugin],
    };
  },
  created() {
    this.db = firebase.firestore();
    this.fitnessCollection = this.db.collection('My Fitness');
    this.userProfileCollection = this.db.collection('userProfile');
    this.userProfileCollection
      .where('userId', '==', this.$store.state.auth).get()
      .then((snapshot:any) => {
        snapshot.docs.forEach((doc:any) => {
          this.userName = doc.data().userName;
        });
      });
    for (let i = 10; i <= 160; i += 10) {
      const traningValueOne = {
        number: `${i}回`, value: i,
      };
      this.pushUpSelect.push(traningValueOne);
      this.shoulderSelect.push(traningValueOne);
      this.absSelect.push(traningValueOne);
      this.absRollerSelect.push(traningValueOne);
    }
    for (let i = 100; i <= 1000; i += 100) {
      const traningValueTwo = {
        number: `${i}回`, value: i,
      };
      this.ellipticalSelect.push(traningValueTwo);
    }
    for (let i = 40; i <= 100; i += 1) {
      const weightValue = {
        number: `${i}kg`, value: i,
      };
      this.weightSelect.push(weightValue);
    }
  },
  computed: {
    pushupBurnedCalories(): number {
      return Number(this.pushUpSelected) * Number(this.pushupBurnedCaloriesOnce);
    },
    shoulderBurnedCalories(): number {
      return Number(this.shoulderSelected) * Number(this.shoulderBurnedCaloriesOnce);
    },
    absBurnedCalories() : number {
      return Number(this.absSelected) * Number(this.absBurnedCaloriesOnce);
    },
    absrollerBurnedCalories():number {
      return Number(this.absrollerSelected) * Number(this.absrollerBurnedCaloriesOnce);
    },
    ellipticalBurnedCalories():number {
      return Number(this.ellipticalSelected) * Number(this.ellipticalBurnedCaloriesOnce);
    },
    totalBurnedCalories():number {
      return Math.floor(this.pushupBurnedCalories + this.shoulderBurnedCalories
      + this.absBurnedCalories + this.ellipticalBurnedCalories + this.absrollerBurnedCalories);
    },
  },
  methods: {
    updateData() {
      this.fitnessCollection.where('userId', '==', this.$store.state.auth)
        .where('date', '==', this.targetDay).get()
        .then((querySnapshot:any) => {
          const docId = querySnapshot.docs[0].id;
          this.fitnessCollection.doc(`${docId}`).update({ weightData: this.weight });
          this.weight = querySnapshot.docs[0].data().weightData;
          // pushUpSelected
          this.fitnessCollection.doc(`${docId}`).update({ 'workoutData.pushupData': this.pushUpSelected });
          this.pushUpSelected = querySnapshot.docs[0].data().pushupData;
          // absSelected
          this.fitnessCollection.doc(`${docId}`).update({ 'workoutData.absData': this.absSelected });
          this.absSelected = querySnapshot.docs[0].data().absData;
          // shoulderSelected
          this.fitnessCollection.doc(`${docId}`).update({ 'workoutData.shoulderData': this.shoulderSelected });
          this.shoulderSelected = querySnapshot.docs[0].data().shoulderData;
          // absrollerSelected
          this.fitnessCollection.doc(`${docId}`).update({ 'workoutData.absrollerData': this.absrollerSelected });
          this.absrollerSelected = querySnapshot.docs[0].data().absrollerData;
          // ellipticalSelected
          this.fitnessCollection.doc(`${docId}`).update({ 'workoutData.ellipticalData': this.ellipticalSelected });
          this.ellipticalSelected = querySnapshot.docs[0].data().ellipticalData;
        });
    },
    showModal(event: any) {
      const addBtn = document.getElementById('addData');
      const updBtn = document.getElementById('updateData');
      if (event.target.classList.contains('fc-day')) {
        const targetDay = event.target.dataset.date;
        this.targetDay = targetDay;
        event.target.setAttribute('data-toggle', 'modal');
        event.target.setAttribute('data-target', '#exampleModalCenter');
        this.date = this.targetDay;
        this.month = this.targetDay.substring(0, 7);
        this.fitnessCollection.where('userId', '==', this.$store.state.auth)
          .where('date', '==', this.targetDay).onSnapshot((snapshot: any) => {
            snapshot.docChanges().forEach((change: any) => {
              this.weight = change.doc.data().weightData;
              this.absSelected = change.doc.data().workoutData.absData;
              this.absrollerSelected = change.doc.data().workoutData.absrollerData;
              this.ellipticalSelected = change.doc.data().workoutData.ellipticalData;
              this.pushUpSelected = change.doc.data().workoutData.pushupData;
              this.shoulderSelected = change.doc.data().workoutData.shoulderData;
            });
            if (this.weight !== 0) {
              addBtn!.classList.remove('btn');
              addBtn!.classList.add('hide');
              updBtn!.classList.remove('hide');
              updBtn!.classList.add('btn');
            } else if (this.weight === 0) {
              addBtn!.classList.remove('hide');
              addBtn!.classList.add('btn');
              updBtn!.classList.remove('btn');
              updBtn!.classList.add('hide');
            }
          });
      }
    },
    addData() {
      this.fitnessCollection.add({
        created: firebase.firestore.FieldValue.serverTimestamp(),
        date: this.date,
        month: this.month,
        burnedCalories: this.totalBurnedCalories,
        userId: this.$store.state.auth,
        userName: this.userName,
        weightData: this.weight,
        workoutData: {
          pushupData: this.pushUpSelected,
          shoulderData: this.shoulderSelected,
          absData: this.absSelected,
          absrollerData: this.absrollerSelected,
          ellipticalData: this.ellipticalSelected,
        },
      });
      setTimeout(() => {
        this.weight = 0;
        this.absSelected = null;
        this.absrollerSelected = null;
        this.ellipticalSelected = null;
        this.pushUpSelected = null;
        this.shoulderSelected = null;
      }, 1000);
    },
    closeModal() {
      const addBtn = document.getElementById('addData');
      const updBtn = document.getElementById('updateData');
      addBtn!.classList.add('btn');
      addBtn!.classList.add('hide');
      updBtn!.classList.add('hide');
      updBtn!.classList.remove('btn');
      this.weight = 0;
      this.absSelected = null;
      this.absrollerSelected = null;
      this.ellipticalSelected = null;
      this.pushUpSelected = null;
      this.shoulderSelected = null;
    },
    initWindow() {
      const fcRow = document.getElementsByClassName('fc-week');
      const fcRowArray = Array.from(fcRow);
      fcRowArray.forEach((element) => {
        const row = element;
        row.style.minHeight = '3.5em';
      });
      const calendarFlameBorder = document.getElementsByClassName('fc-view-container');
      calendarFlameBorder[0].classList.add('shadow');
      const calendarHeader = document.getElementsByClassName('fc-head');
      calendarHeader[0].style.color = 'white';
      calendarHeader[0].style.backgroundColor = '#3c5064';
      const fcToday = document.getElementsByClassName('fc-today-button');
      fcToday[0].style.display = 'none';
      const fcRight = document.getElementsByClassName('fc-right');
      fcRight[0].style.display = 'none';
      const addBtn = document.getElementById('addData');
      const updBtn = document.getElementById('updateData');
      addBtn!.style.backgroundColor = '#d46937';
      addBtn!.style.borderColor = '#d46937';
      updBtn!.style.backgroundColor = '#f3c623';
      updBtn!.style.borderColor = '#f3c623';
    },
  },
  mounted() {
    this.initWindow();
  },
});
</script>

<style scoped lang='scss'>
@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';

.adjustment-width{
  width: 85%;
  margin: 0 auto;
}

.img-resize{
  width: 12%;
  height: 12%;
}

.row-height {
  height: 3em !important;
  height: 3em !important;
  background: orange;
}

</style>
