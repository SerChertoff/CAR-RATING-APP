import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/css/main.css'
import '@/assets/css/mobile.css'
import '@/assets/css/variables.css'

import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

// Handle GitHub Pages 404 redirects
// When GitHub Pages redirects through 404.html, it adds the path as a query parameter
// e.g., /CAR-RATING-APP/?/site/123 -> should navigate to /site/123
const pathSegmentsToKeep = 1 // Number of path segments to keep (1 = keep repository name)

if (window.location.search) {
  const params = new URLSearchParams(window.location.search)
  const redirectPath = params.get('/')

  if (redirectPath) {
    const pathArray = redirectPath.split('/').filter(Boolean)
    const newPath = '/' + pathArray.slice(pathSegmentsToKeep).join('/')
    const hash = window.location.hash
    window.history.replaceState({}, '', '/CAR-RATING-APP' + newPath + hash)
  }
}

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
