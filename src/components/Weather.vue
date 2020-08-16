<template>
  <div class="weather text-right m-0">
      <p class="" id="weather">{{ $t("message.weather") }} <span>
      <i class="fas" id="weather_icon"></i></span> {{ weather }} </p>
      <!-- <p class="m-0">最高気温:{{maxTemp}}°C</p>
      <p class="m-0">最低気温:{{minTemp}}°C</p> -->
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Weather extends Vue {
  weather: string = '';

  // maxTemp: number | null = 0;

  // minTemp: number | null = 0;

  async created() {
    const res = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Osaka,jp&units=metric&appid=9c9c3fd06f089fc1b1e2abd3c850a0d5');
    const json = await res.json();
    // const { main } = await json;
    const weather: string = json.weather[0].main;
    // const maxTemp: number = main.temp_max;
    // const minTemp: number = main.temp_min;
    // this.maxTemp = maxTemp;
    // this.minTemp = minTemp;
    this.weather = weather;
    const weatherIcon:HTMLElement | null = document.getElementById('weather_icon');
    if (this.weather === 'Rain' && weatherIcon !== null) {
      weatherIcon!.classList.add('fa-umbrella');
      if (this.$i18n.locale === 'ja') {
        this.weather = '雨';
      }
    } else if (this.weather === 'Mist' && weatherIcon !== null) {
      weatherIcon!.classList.add('fa-cloud-showers-heavy');
      if (this.$i18n.locale === 'ja') {
        this.weather = '霧';
      }
    } else if (this.weather === 'Clouds' && weatherIcon !== null) {
      weatherIcon!.classList.add('fa-cloud');
      if (this.$i18n.locale === 'ja') {
        this.weather = '曇り';
      }
    } else if (this.weather === 'Clear' && weatherIcon !== null) {
      weatherIcon!.classList.add('fa-sun');
      if (this.$i18n.locale === 'ja') {
        this.weather = '晴れ';
      }
    } else if (weatherIcon === null) {
      alert(this.$i18n.t('message.weather_failure'));
      this.weather = '不明';
    }
  }
}
</script>
