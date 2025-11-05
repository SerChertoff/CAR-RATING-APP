import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/css/main.css'
import '@/assets/css/mobile.css'
import '@/assets/css/variables.css'

import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')