
import { defineStore } from 'pinia'
import { ref } from 'vue'
import config from '@/config'

export const useRatingStore = defineStore('rating', () => {
  // Используем данные из конфига
  const sites = ref([...config.defaultSites])

  const sortByRating = () => {
    sites.value.sort((a, b) => b.rating - a.rating)
  }

  const addReview = (siteId, newRating) => {
    const site = sites.value.find(s => s.id === siteId)
    if (site) {
      // Упрощенный расчет нового рейтинга
      site.rating = ((site.rating * site.reviews) + newRating) / (site.reviews + 1)
      site.reviews++
    }
  }

  return { sites, sortByRating, addReview }
})