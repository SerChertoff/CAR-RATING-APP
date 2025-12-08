<template>
  <div class="container page">
    <article itemscope itemtype="https://schema.org/WebPage">
      <section class="hero-panel" aria-labelledby="hero-title" itemprop="mainEntity">
        <div class="hero-content">
          <p class="eyebrow">🏁 Для настоящих автолюбителей</p>
          <h1 id="hero-title" itemprop="headline">Рейтинг автоплощадок России</h1>
          <p>
            Мы собрали лучшие площадки, где автолюбители получают прозрачные сделки, проверенную
            историю авто и сервис на уровне премиум-дилеров. Выбирайте с умом — ваша мечта
            заслуживает лучшего.
          </p>

          <div class="hero-actions">
            <button type="button" @click="sortByRating" class="btn btn-primary">
              🏆 Топ по рейтингу
            </button>
            <router-link v-if="topSite" :to="`/site/${topSite.id}`" class="btn btn-ghost">
              🚗 Узнать о лидере
            </router-link>
          </div>

          <div class="hero-highlight">
            <span class="eyebrow">⚡ Фокус недели</span>
            <p>{{ highlightMessage }}</p>
          </div>
        </div>

        <div class="hero-stats">
          <div class="stat-card">
            <small>⭐ Средний рейтинг</small>
            <strong>{{ averageRating }}</strong>
            <span>по {{ sites.length }} площадкам</span>
          </div>
          <div class="stat-card">
            <small>💬 Отзывы автолюбителей</small>
            <strong>{{ totalReviews }}</strong>
            <span>реальных отзывов</span>
          </div>
        </div>
      </section>

      <div class="filter-chips" role="group" aria-label="Фильтр по типу площадки">
        <button
          v-for="filter in vibeFilters"
          :key="filter"
          class="chip"
          :class="{ active: selectedFilter === filter }"
          type="button"
          :aria-pressed="selectedFilter === filter"
          @click="selectFilter(filter)"
        >
          {{ filter }}
        </button>
      </div>

      <section class="insight-card" v-if="topSite" aria-labelledby="flagship-title">
        <div class="insight-card__copy">
          <p class="eyebrow">🏆 Флагман недели</p>
          <h2 id="flagship-title">{{ topSite.name }}</h2>
          <p class="text-muted">{{ topSite.description }}</p>
          <p class="text-muted" style="margin-top: 0.5rem; font-size: 0.9rem">
            Выбор автолюбителей этой недели — проверенная площадка с отличной репутацией
          </p>
        </div>
        <div class="insight-card__spotlight">
          <div>
            <small class="eyebrow">⭐ Рейтинг</small>
            <strong style="font-size: 2rem">{{ topSite.rating.toFixed(1) }}</strong>
          </div>
          <div>
            <small class="eyebrow">💬 Отзывы</small>
            <strong style="font-size: 2rem">{{ topSite.reviews.toLocaleString('ru-RU') }}</strong>
          </div>
          <router-link class="btn btn-glow" :to="`/site/${topSite.id}`">
            <span>🚀 Открыть профиль</span>
          </router-link>
        </div>
      </section>

      <section id="top-sites" aria-label="Топ автоплощадок">
        <h2 class="visually-hidden">Рейтинг автоплощадок</h2>
        <div v-if="sites.length" class="grid" role="list">
          <SiteCard
            v-for="site in sites"
            :key="site.id"
            :site="site"
            role="listitem"
            itemscope
            itemtype="https://schema.org/Product"
          />
        </div>
        <div v-else class="glass-panel p-4 text-center">
          <p style="font-size: 3rem; margin-bottom: 1rem">🚗</p>
          <p>Данными пока делятся не все площадки. Попробуйте обновить страницу чуть позже.</p>
          <p class="text-muted" style="margin-top: 0.5rem; font-size: 0.9rem">
            Мы постоянно обновляем информацию для автолюбителей
          </p>
        </div>
      </section>
    </article>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRatingStore } from '@/stores/ratingStore'
import SiteCard from '@/components/SiteCard.vue'
import { useSEO } from '@/composables/useSEO'

// Инициализируем SEO для главной страницы
const { updateSEO } = useSEO()
onMounted(() => {
  updateSEO()
})

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
    'Онлайн-сделки':
      '🚀 Выбирайте площадки, которые полностью ведут оформление и бронирование онлайн. Экономия времени и прозрачность сделки — это то, что нужно каждому автолюбителю.',
    'Глубокая проверка':
      '🔍 Строгая модерация объявлений и детальные отчеты по VIN экономят часы проверки. Узнайте всю историю авто до покупки — как настоящий профессионал.',
    Комьюнити:
      '👥 Мощные сообщества владельцев помогают узнать реальную историю владения. Общайтесь с теми, кто уже прошел этот путь — их опыт бесценен.',
    'Trade-in':
      '🔄 Площадки с прозрачным обменом старого авто на новое и понятной доплатой. Обновите свой гараж без лишних хлопот — быстро и честно.',
    Премиум:
      '💎 Для тех, кто ищет свежие топовые комплектации и сервис уровня премиум-дилеров. Ваша мечта заслуживает лучшего.',
  }
  return (
    copy[selectedFilter.value] ||
    '⚡ Выберите фокус, чтобы найти идеальную площадку для вашей мечты.'
  )
})

const selectFilter = (filter) => {
  selectedFilter.value = filter
}
</script>
