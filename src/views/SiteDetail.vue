<template>
  <div class="container mt-4 detail-view" v-if="site">
    <section class="detail-hero">
      <div>
        <p class="eyebrow">Штаб-квартира — {{ site.details?.headquarters || 'Россия' }}</p>
        <h2 class="mb-2">{{ site.name }}</h2>
        <p class="text-muted mb-3">{{ site.description }}</p>
        <div class="filter-chips" v-if="site.features?.length">
          <span v-for="feature in site.features" :key="feature" class="chip">
            {{ feature }}
          </span>
        </div>
      </div>
      <div class="detail-hero__rating">
        <span>{{ site.rating.toFixed(1) }}</span>
        <small>на основе {{ site.reviews.toLocaleString('ru-RU') }} отзывов</small>
        <a
          :href="site.url"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-primary mt-3"
          :aria-label="`Перейти на сайт ${site.name} в новой вкладке`"
        >
          Перейти на сайт
        </a>
      </div>
    </section>

    <div class="row">
      <div class="col-md-8">
        <div class="card mb-4">
          <div class="card-header bg-white">
            <h2 class="mb-1">{{ site.name }}</h2>
            <div class="d-flex align-items-center flex-wrap gap-2">
              <star-rating :rating="site.rating" />
              <span class="text-muted">({{ site.reviews }} отзывов)</span>
            </div>
          </div>
          <div class="card-body">
            <p class="lead">{{ site.description }}</p>

            <div class="row g-3 mb-4" v-if="site.details">
              <div class="col-md-3 col-6" v-if="site.details.founded">
                <div class="border rounded-3 p-3 text-center bg-light">
                  <small class="text-muted text-uppercase">Год запуска</small>
                  <div class="fw-semibold fs-5">{{ site.details.founded }}</div>
                </div>
              </div>
              <div class="col-md-3 col-6" v-if="site.details.headquarters">
                <div class="border rounded-3 p-3 text-center bg-light">
                  <small class="text-muted text-uppercase">Штаб-квартира</small>
                  <div class="fw-semibold fs-5">{{ site.details.headquarters }}</div>
                </div>
              </div>
              <div class="col-md-3 col-6" v-if="site.details.dailyVisitors">
                <div class="border rounded-3 p-3 text-center bg-light">
                  <small class="text-muted text-uppercase">Аудитория</small>
                  <div class="fw-semibold fs-6">{{ site.details.dailyVisitors }}</div>
                </div>
              </div>
              <div class="col-md-3 col-6" v-if="site.details.uniqueListings">
                <div class="border rounded-3 p-3 text-center bg-light">
                  <small class="text-muted text-uppercase">Объявления</small>
                  <div class="fw-semibold fs-6">{{ site.details.uniqueListings }}</div>
                </div>
              </div>
            </div>

            <div class="mb-4">
              <h5>Особенности площадки</h5>
              <ul class="mb-3">
                <li v-for="(feature, index) in site.features" :key="index">{{ feature }}</li>
              </ul>
              <a
                :href="site.url"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-primary"
                :aria-label="`Перейти на сайт ${site.name} в новой вкладке`"
              >
                Перейти на сайт
              </a>
            </div>

            <div v-if="site.details">
              <div class="row g-4">
                <div class="col-md-6" v-if="site.details.offerTypes?.length">
                  <h6 class="text-uppercase text-muted">Типы предложений</h6>
                  <ul class="list-unstyled mb-0">
                    <li
                      v-for="type in site.details.offerTypes"
                      :key="type"
                      class="d-flex align-items-center mb-2"
                    >
                      <span class="badge bg-light text-secondary border me-2">●</span>
                      <span>{{ type }}</span>
                    </li>
                  </ul>
                </div>
                <div class="col-md-6" v-if="site.details.verification">
                  <h6 class="text-uppercase text-muted">Проверка и безопасность</h6>
                  <p class="mb-0">{{ site.details.verification }}</p>
                </div>
              </div>

              <div class="mt-4" v-if="site.details.services?.length">
                <h5>Ключевые сервисы</h5>
                <div class="row g-3">
                  <div
                    class="col-md-4"
                    v-for="service in site.details.services"
                    :key="service.title"
                  >
                    <div class="border rounded-3 h-100 p-3">
                      <h6 class="fw-semibold">{{ service.title }}</h6>
                      <p class="mb-0 text-muted">{{ service.description }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="row g-4 mt-1"
                v-if="site.details.pros?.length || site.details.cons?.length"
              >
                <div class="col-md-6" v-if="site.details.pros?.length">
                  <div class="border rounded-3 p-3 h-100">
                    <h6 class="text-success">Преимущества</h6>
                    <ul class="mb-0">
                      <li v-for="pro in site.details.pros" :key="pro">{{ pro }}</li>
                    </ul>
                  </div>
                </div>
                <div class="col-md-6" v-if="site.details.cons?.length">
                  <div class="border rounded-3 p-3 h-100">
                    <h6 class="text-danger">Ограничения</h6>
                    <ul class="mb-0">
                      <li v-for="con in site.details.cons" :key="con">{{ con }}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="card mt-4" v-if="site.details.contacts">
                <div class="card-body">
                  <h5>Как связаться</h5>
                  <div class="row">
                    <div class="col-md-4" v-if="site.details.contacts.phone">
                      <small class="text-muted text-uppercase">Телефон</small>
                      <div class="fw-semibold">{{ site.details.contacts.phone }}</div>
                    </div>
                    <div class="col-md-4" v-if="site.details.contacts.support">
                      <small class="text-muted text-uppercase">Поддержка</small>
                      <div class="fw-semibold">{{ site.details.contacts.support }}</div>
                    </div>
                    <div class="col-md-4" v-if="site.details.contacts.offices">
                      <small class="text-muted text-uppercase">Офисы</small>
                      <div class="fw-semibold">{{ site.details.contacts.offices }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
const site = computed(() => ratingStore.sites.find((s) => s.id === parseInt(route.params.id)))
</script>
