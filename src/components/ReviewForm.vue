<template>
  <div class="card review-card glass-panel">
    <div class="card-header">
      <div>
        <span>Оставить отзыв</span>
        <p class="text-muted mb-0">Поделитесь опытом и помогите другим выбрать площадку</p>
      </div>
    </div>
    <div class="card-body">
      <div class="mb-3">
        <label class="form-label">Ваша оценка</label>
        <StarRating v-model:rating="userRating" />
      </div>
      <div class="mb-3">
        <label class="form-label">Комментарий</label>
        <textarea
          v-model="comment"
          class="form-control"
          rows="4"
          placeholder="Что понравилось или хотелось бы улучшить?"
        ></textarea>
      </div>
      <button @click="submitReview" class="btn btn-primary w-100">
        Отправить отзыв
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRatingStore } from '@/stores/ratingStore'
import StarRating from '@/components/StarRating.vue'

const props = defineProps({
  siteId: {
    type: Number,
    required: true
  }
})

const userRating = ref(0)
const comment = ref('')
const ratingStore = useRatingStore()

const submitReview = () => {
  if (userRating.value > 0) {
    ratingStore.addReview(props.siteId, userRating.value)
    userRating.value = 0
    comment.value = ''
    alert('Спасибо за ваш отзыв!')
  } else {
    alert('Пожалуйста, выберите оценку')
  }
}
</script>
