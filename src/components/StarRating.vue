<template>
  <div
    class="star-rating"
    :id="id"
    role="group"
    :aria-label="ariaLabel || 'Рейтинг по 5-балльной шкале'"
  >
    <button
      v-for="star in 5"
      :key="star"
      type="button"
      @click="setRating(star)"
      @keydown.enter.prevent="setRating(star)"
      @keydown.space.prevent="setRating(star)"
      :class="['star', { filled: star <= currentRating }]"
      :aria-pressed="star <= currentRating"
      :aria-label="`Оценка ${star} из 5`"
    >
      ★
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  rating: {
    type: Number,
    default: 0
  },
  ariaLabel: {
    type: String,
    default: 'Рейтинг'
  },
  id: {
    type: String,
    default: undefined
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
  display: inline-flex;
}

.star {
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: transform 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
  background: transparent;
  border: none;
  padding: 4px;
  border-radius: 6px;
}

.star:hover {
  transform: translateY(-2px) scale(1.05);
  outline: none;
}

.filled {
  color: #fbbf24;
  text-shadow: 0 0 10px rgba(251, 191, 36, 0.7);
}

.star:focus-visible {
  outline: 2px solid #fbbf24;
  box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.35);
}
</style>