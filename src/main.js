import './assets/main.css'
import $ from 'jquery'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

//Для тех людей, кто заглянет сюда. Да, это костыль, и ещё какой. Размером, с наблюдаемую вселенную. Да, это именно что так. Но,
//по факту я не виноват. Vue 3 вообше с .env работает плохо(требует префикс и т. п.) Поэтому, ну вот так как-то.... А что поделать
// 

app.use(router)

app.mount('#app')