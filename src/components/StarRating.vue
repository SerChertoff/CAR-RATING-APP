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
import { ref, watch } from 'vue'

const props = defineProps({
  rating: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['update:rating'])

const currentRating = ref(props.rating)

watch(
  () => props.rating,
  (value) => {
    currentRating.value = value
  }
)

const setRating = (value) => {
  currentRating.value = value
  emit('update:rating', value)
}
</script>

<style scoped>
.star-rating {
  gap: 0.4rem;
}

.star {
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.25);
  cursor: pointer;
  transition: transform 0.2s ease, color 0.2s ease;
}

.star:hover {
  transform: translateY(-2px) scale(1.05);
}

.filled {
  color: #fbbf24;
  text-shadow: 0 0 10px rgba(251, 191, 36, 0.7);
}
</style>