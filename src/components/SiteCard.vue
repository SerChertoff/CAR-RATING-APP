<template>
  <article class="site-card">
    <div class="site-card__header">
      <div>
        <p class="eyebrow">Цифровой шоурум</p>
        <h3>{{ site.name }}</h3>
      </div>
      <div
        class="site-card__rating"
        role="img"
        :aria-label="`Рейтинг ${site.rating.toFixed(1)} из 5`"
      >
        <span>{{ site.rating.toFixed(1) }}</span>
        <small>из 5</small>
      </div>
    </div>

    <p class="site-card__description">{{ site.description }}</p>

    <div class="d-flex justify-content-between align-items-center">
      <div class="meta-pill">
        <span>Отзывы</span>
        <strong>{{ reviewCount }}</strong>
      </div>
      <div
        class="progress-bar"
        role="progressbar"
        :aria-valuenow="ratingPercent"
        aria-valuemin="0"
        aria-valuemax="100"
        :aria-label="`Оценка ${site.rating.toFixed(1)} из 5`"
      >
        <span :style="{ width: `${ratingPercent}%` }"></span>
      </div>
    </div>

    <ul v-if="featuresToShow.length" class="feature-list">
      <li v-for="feature in featuresToShow" :key="feature">
        {{ feature }}
      </li>
    </ul>

    <div class="site-card__actions">
      <router-link
        :to="`/site/${site.id}`"
        class="btn btn-glow"
        :aria-label="`Подробнее о площадке ${site.name}`"
      >
        Подробнее
      </router-link>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  site: {
    type: Object,
    required: true,
  },
})

const ratingPercent = computed(() => {
  const value = (props.site.rating / 5) * 100
  return Math.min(100, Math.max(0, Number(value.toFixed(0))))
})

const featuresToShow = computed(() => props.site.features?.slice(0, 3) ?? [])

const reviewCount = computed(() => props.site.reviews?.toLocaleString('ru-RU') ?? '0')
</script>
