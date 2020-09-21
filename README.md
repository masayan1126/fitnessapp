# MyFitnessApp
- 【English】
  - This is Fitness management application
- 【日本語】
  - これはフィットネス管理アプリです

# DEMO
![appdemo](https://user-images.githubusercontent.com/67567293/89637092-a4f6c400-d8e4-11ea-92bd-0045bdb5e84b.gif)

# Features
【English】
- Easy daily fitness record from calendar and Real-time measurement of calories burned
- Supports outdoor workouts such as jogging Because it will inform you of today's weather
- You can use your youtube api to select your favorite workout music and have a full playlist function
- You can calculate your target weight when you sign up and check it from the My Data screen at any time.
- Analyze and analyze changes in calorie consumption and body weight calculated from daily fitness records with monthly line graphs

【日本語】
- カレンダーから毎日のフィットネスデータが容易に記録でき、消費カロリーのリアルタイム測定/登録も可能です
- 今日の天気を簡単に確認できるので、ジョギングなどのアウトドアトレーニングが可能かをすぐに把握できます
- YouTube APIを使用して、お気に入りのワークアウト音楽を選択してモチベーションの向上に貢献します。また、あなただけのプレイリスト機能を使用することができます
- サインアップ時に目標体重を計算して、いつでもマイデータ画面から確認できるため、あなたの目標にサポートします
- 毎月の折れ線グラフを使用して、毎日のフィットネス記録から計算された消費カロリーと体重の変化を分析し、あなたの目標改善に貢献します

# Requirement
- fontawesome 5.13.0
- fullcalendar 4.4.2
- bootstrap 4.5.0
- chart.js 2.9.3
- core-js 3.6.5
- firebase 7.15.5
- jquery" 3.5.1
- popper.js ^1.16.1
- push.js 1.0.12
- typescript ^3.9.5
- vue ^2.6.11
- vue-chartjs" ^3.5.0
- vue-class-component" ^7.2.3
- vue-loading-template" ^1.3.2
- vue-property-decorator ^8.4.2
- vue-router ^3.3.2
- vue-youtube ^1.4.0
- vuex ^3.4.0
- vue-i18n^8.21.0
- vuex-persistedstate ^3.1.0

# Installation
With node.js, npm and git installed run:

```
git clone https://github.com/masayan1126/FitnessApp
cd FitnessApp
npm install
npm run dev
```
The application can then be accessed at http://localhost:8080.

To create a production build on the gh-pages branch run:
```
npm run build
```

# Usage
【English】
- First, sign in
  - If you do not have an account, please sign up
- Record the workout content and weight of the day from the calendar
- Various functions can be used from the navigation menu
  - Choose your favorite music from the workout music menu
  - You can easily check your target weight and profile from the My Data menu
  - From the Analytics menu, you can check the changes in weight and calories burned each month.

【日本語】
- まず、サインインします
  - アカウントをお持ちでない場合は、サインアップしてください
- カレンダーから日々のワークアウトの内容とその日の体重を記録します
- ナビゲーションメニューからさまざまな機能を使用できます
  - ワークアウトの音楽メニューからお気に入りの音楽を選択します
  - My Dataメニューから目標体重とプロファイルを簡単に確認できます
  - 分析メニューから、毎月の体重と消費カロリーの変化を確認できます

- Demo user
  - name:matsushin
  - mail:matsushin@gmail.com
  - password:matsushin

- Demo data
  - Training data for August
  - August weight data

# Author
- name
  - @masayan1126
- email
  - masa199311266@gmail.com

# Test

## Layout verified browser
- Google chrome
- Safari
- Google
- Microsoft Edge
- Firefox 
- Yahoo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).