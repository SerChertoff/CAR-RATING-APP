import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/views/MainPage.vue'
import SiteDetail from '@/views/SiteDetail.vue'

const routes = [
  { path: '/', component: MainPage },
  { path: '/site/:id', component: SiteDetail, props: true },
]

const router = createRouter({
  history: createWebHistory('/car-rating-app/'),
  routes,
})

export default router
