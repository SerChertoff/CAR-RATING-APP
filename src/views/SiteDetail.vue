<template>
  <div class="container mt-4" v-if="site">
    <div class="row">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header bg-white">
            <h2>{{ site.name }}</h2>
            <div class="d-flex align-items-center">
              <star-rating :rating="site.rating" />
              <span class="ms-2 text-muted">({{ site.reviews }} отзывов)</span>
            </div>
          </div>
          <div class="card-body">
            <p>{{ site.description }}</p>
            <h5>Особенности:</h5>
            <ul>
              <li v-for="(feature, index) in site.features" :key="index">{{ feature }}</li>
            </ul>
            <a :href="site.url" target="_blank" class="btn btn-primary">
              Перейти на сайт
            </a>
          </div>
        </div>
      </div>
      
      <div class="col-md-4">
        <ReviewForm :site-id="site.id" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useRatingStore } from '@/stores/ratingStore'
import ReviewForm from '@/components/ReviewForm.vue'
import StarRating from '@/components/StarRating.vue'

const route = useRoute()
const ratingStore = useRatingStore()
const site = computed(() => 
  ratingStore.sites.find(s => s.id === parseInt(route.params.id)))
</script>