<template>
  <div class="star-rating">
    <span v-for="star in 5" :key="star" 
          @click="setRating(star)"
          :class="['star', { 'filled': star <= currentRating }]">
      ★
    </span>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  rating: Number
})

const currentRating = ref(props.rating)

const setRating = (value) => {
  currentRating.value = value
  emit('update:rating', value)
}
</script>

<style scoped>
.star {
  font-size: 1.5rem;
  color: #ccc;
  cursor: pointer;
  transition: color 0.2s;
}
.filled {
  color: #ffc107;
}
</style>