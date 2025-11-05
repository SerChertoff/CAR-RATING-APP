
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRatingStore = defineStore('rating', () => {
  const sites = ref([
    {
      id: 1,
      name: 'Auto.ru',
      rating: 4.8,
      reviews: 12500,
      description: 'Крупнейшая площадка с проверенными автомобилями',
      features: ['Проверка истории', 'Онлайн-кредит', 'Trade-in'],
      url: 'https://auto.ru'
    },
    {
      id: 2,
      name: 'Drom.ru',
      rating: 4.6,
      reviews: 9800,
      description: 'Один из старейших автомобильных порталов России',
      features: ['Частные объявления', 'Форумы', 'Отзывы'],
      url: 'https://drom.ru'
    },
    {
      id: 3,
      name: 'Avito Авто',
      rating: 4.3,
      reviews: 21000,
      description: 'Секция автомобилей на крупнейшем маркетплейсе',
      features: ['Все категории', 'Простой интерфейс', 'Мобильное приложение'],
      url: 'https://avito.ru/avtomobili'
    }
  ])

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