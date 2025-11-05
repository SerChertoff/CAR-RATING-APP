<template>
  <div class="card">
    <div class="card-header">Оставить отзыв</div>
    <div class="card-body">
      <div class="mb-3">
        <label class="form-label">Ваша оценка:</label>
        <StarRating v-model:rating="userRating" />
      </div>
      <div class="mb-3">
        <label class="form-label">Комментарий:</label>
        <textarea v-model="comment" class="form-control" rows="3"></textarea>
      </div>
      <button @click="submitReview" class="btn btn-primary">Отправить</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRatingStore } from '@/stores/ratingStore'
import StarRating from '@/components/StarRating.vue'

const props = defineProps({
  siteId: Number
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