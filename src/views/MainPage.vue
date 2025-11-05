<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1>Рейтинг автоплощадок России</h1>
      <button @click="sortByRating" class="btn btn-primary">
        Сортировать по рейтингу
      </button>
    </div>

    <div class="row">
      <div v-for="site in sites" :key="site.id" class="col-md-6 col-lg-4 mb-4">
        <SiteCard :site="site" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useRatingStore } from '@/stores/ratingStore'
import SiteCard from '@/components/SiteCard.vue'

const ratingStore = useRatingStore()
const { sites } = storeToRefs(ratingStore)
const { sortByRating } = ratingStore
</script>