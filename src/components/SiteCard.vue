<template>
  <div class="card mb-4 shadow-sm">
    <div class="card-body">
      <h5 class="card-title">{{ site.name }}</h5>
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <span class="badge bg-primary me-2">Рейтинг: {{ site.rating.toFixed(1) }}</span>
          <span class="text-muted">Отзывов: {{ site.reviews }}</span>
        </div>
        <router-link :to="`/site/${site.id}`" class="btn btn-sm btn-outline-secondary">
          Подробнее
        </router-link>
      </div>
      <p class="card-text mt-2">{{ site.description }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  site: Object
})
</script>