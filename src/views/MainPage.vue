<template>
  <div class="container page">
    <section class="hero-panel">
      <div class="hero-content">
        <p class="eyebrow">Собрали то, что проверено</p>
        <h1>Рейтинг автоплощадок России</h1>
        <p>
          Мы отслеживаем площадки, где покупатели действительно получают прозрачные сделки,
          проверенную историю авто и сервис на уровне топовых дилеров.
        </p>

        <div class="hero-actions">
          <button @click="sortByRating" class="btn btn-primary">
            Топ по рейтингу
          </button>
          <router-link v-if="topSite" :to="`/site/${topSite.id}`" class="btn btn-ghost">
            Узнать о лидере
          </router-link>
        </div>

        <div class="hero-highlight">
          <span class="eyebrow">Фокус недели</span>
          <p>{{ highlightMessage }}</p>
        </div>
      </div>

      <div class="hero-stats">
        <div class="stat-card">
          <small>Средний рейтинг</small>
          <strong>{{ averageRating }}</strong>
          <span>по {{ sites.length }} площадкам</span>
        </div>
        <div class="stat-card">
          <small>Отзывы пользователей</small>
          <strong>{{ totalReviews }}</strong>
          <span>в совокупности</span>
        </div>
      </div>
    </section>

    <div class="filter-chips">
      <button
        v-for="filter in vibeFilters"
        :key="filter"
        class="chip"
        :class="{ active: selectedFilter === filter }"
        @click="selectFilter(filter)"
      >
        {{ filter }}
      </button>
    </div>

    <section class="insight-card" v-if="topSite">
      <div class="insight-card__copy">
        <p class="eyebrow">Флагман недели</p>
        <h3>{{ topSite.name }}</h3>
        <p class="text-muted">{{ topSite.description }}</p>
      </div>
      <div class="insight-card__spotlight">
        <div>
          <small class="eyebrow">Рейтинг</small>
          <strong>{{ topSite.rating.toFixed(1) }}</strong>
        </div>
        <div>
          <small class="eyebrow">Отзывы</small>
          <strong>{{ topSite.reviews.toLocaleString('ru-RU') }}</strong>
        </div>
        <router-link class="btn btn-glow" :to="`/site/${topSite.id}`">
          Открыть профиль
        </router-link>
      </div>
    </section>

    <section id="top-sites">
      <div v-if="sites.length" class="grid">
        <SiteCard v-for="site in sites" :key="site.id" :site="site" />
      </div>
      <div v-else class="glass-panel p-3 text-center">
        Данными пока делятся не все площадки. Попробуйте обновить страницу чуть позже.
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRatingStore } from '@/stores/ratingStore'
import SiteCard from '@/components/SiteCard.vue'

const ratingStore = useRatingStore()
const { sites } = storeToRefs(ratingStore)
const { sortByRating } = ratingStore

const vibeFilters = ['Онлайн-сделки', 'Глубокая проверка', 'Комьюнити', 'Trade-in', 'Премиум']
const selectedFilter = ref(vibeFilters[0])

const totalReviews = computed(() => {
  const total = sites.value.reduce((sum, site) => sum + site.reviews, 0)
  return total.toLocaleString('ru-RU')
})

const averageRating = computed(() => {
  if (!sites.value.length) return '0.0'
  const total = sites.value.reduce((sum, site) => sum + site.rating, 0)
  return (total / sites.value.length).toFixed(1)
})

const topSite = computed(() => {
  if (!sites.value.length) return null
  return [...sites.value].sort((a, b) => b.rating - a.rating)[0]
})

const highlightMessage = computed(() => {
  const copy = {
    'Онлайн-сделки': 'Выбирайте площадки, которые полностью ведут оформление и бронирование онлайн.',
    'Глубокая проверка': 'Строгая модерация объявлений и отчеты по VIN экономят часы проверки.',
    Комьюнити: 'Мощные сообщества владельцев помогают узнать реальную историю владения.',
    'Trade-in': 'Площадки с прозрачным обменом старого авто на новое и понятной доплатой.',
    Премиум: 'Для тех, кто ищет свежие топовые комплектации и сервис уровня дилеров.'
  }
  return copy[selectedFilter.value] || 'Выберите фокус, чтобы ускорить подбор.'
})

const selectFilter = (filter) => {
  selectedFilter.value = filter
}
</script>