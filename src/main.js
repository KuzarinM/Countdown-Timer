import './assets/main.css'
import $ from 'jquery'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

//Для тех людей, кто заглянет сюда. Да, это костыль, и ещё какой. Размером, с наблюдаемую вселенную. Да, это именно что так. Но,
//по факту я не виноват. Vue 3 вообше с .env работает плохо(требует префикс и т. п.) Поэтому, ну вот так как-то.... А что поделать
window.process = {
env: {
    POSTGRES_URL:"postgres://default:7cUDFEjN5VtH@ep-calm-math-49465601-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb",
    POSTGRES_PRISMA_URL:"postgres://default:7cUDFEjN5VtH@ep-calm-math-49465601-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb?pgbouncer=true&connect_timeout=15",
    POSTGRES_URL_NON_POOLING:"postgres://default:7cUDFEjN5VtH@ep-calm-math-49465601.us-east-1.postgres.vercel-storage.com:5432/verceldb",
    POSTGRES_USER:"default",
    POSTGRES_HOST:"ep-calm-math-49465601-pooler.us-east-1.postgres.vercel-storage.com",
    POSTGRES_PASSWORD:"7cUDFEjN5VtH",
    POSTGRES_DATABASE:"verceldb",
}
}

app.use(router)

app.mount('#app')