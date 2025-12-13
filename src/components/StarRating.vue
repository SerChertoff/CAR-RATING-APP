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
    default: 0,
  },
  ariaLabel: {
    type: String,
    default: 'Рейтинг',
  },
  id: {
    type: String,
    default: undefined,
  },
})

const emit = defineEmits(['update:rating'])

const currentRating = ref(props.rating)

watch(
  () => props.rating,
  (value) => {
    currentRating.value = value
  },
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
  transition:
    transform 0.2s ease,
    color 0.2s ease;
  background: transparent;
  border: none;
  padding: 4px;
  border-radius: 6px;
  will-change: transform;
  transform: translateZ(0);
}

.star:hover {
  transform: translate3d(0, -2px, 0) scale3d(1.05, 1.05, 1);
  outline: none;
}

.filled {
  color: #ffc107;
  text-shadow:
    0 0 15px rgba(255, 195, 7, 0.8),
    0 0 30px rgba(255, 61, 0, 0.5);
  will-change: transform;
  transform: translateZ(0);
  animation: starPulse 2s ease-in-out infinite;
}

@keyframes starPulse {
  0%,
  100% {
    transform: scale3d(1, 1, 1) translateZ(0);
  }
  50% {
    transform: scale3d(1.1, 1.1, 1) translateZ(0);
  }
}

.star:focus-visible {
  outline: 2px solid #ffc107;
  box-shadow: 0 0 0 3px rgba(255, 195, 7, 0.35);
}
</style>
