<template>
  <div class="container mt-4 detail-view" v-if="site">
    <!-- Breadcrumbs для SEO -->
    <nav aria-label="Хлебные крошки" class="mb-3">
      <ol class="breadcrumb" itemscope itemtype="https://schema.org/BreadcrumbList">
        <li
          class="breadcrumb-item"
          itemprop="itemListElement"
          itemscope
          itemtype="https://schema.org/ListItem"
        >
          <router-link to="/" itemprop="item">
            <span itemprop="name">Главная</span>
          </router-link>
          <meta itemprop="position" content="1" />
        </li>
        <li
          class="breadcrumb-item active"
          itemprop="itemListElement"
          itemscope
          itemtype="https://schema.org/ListItem"
        >
          <span itemprop="name">{{ site.name }}</span>
          <meta itemprop="position" content="2" />
        </li>
      </ol>
    </nav>

    <article itemscope itemtype="https://schema.org/Product">
      <section class="detail-hero">
        <div>
          <p class="eyebrow">📍 Штаб-квартира — {{ site.details?.headquarters || 'Россия' }}</p>
          <h1 class="mb-2" itemprop="name">{{ site.name }}</h1>
          <meta itemprop="brand" :content="site.name" />
          <p class="text-muted mb-3" itemprop="description">{{ site.description }}</p>
          <div class="filter-chips" v-if="site.features?.length">
            <span v-for="feature in site.features" :key="feature" class="chip">
              {{ feature }}
            </span>
          </div>
        </div>
        <div
          class="detail-hero__rating"
          itemprop="aggregateRating"
          itemscope
          itemtype="https://schema.org/AggregateRating"
        >
          <span itemprop="ratingValue">{{ site.rating.toFixed(1) }}</span>
          <meta itemprop="bestRating" content="5" />
          <meta itemprop="worstRating" content="1" />
          <meta itemprop="ratingCount" :content="site.reviews" />
          <small
            >⭐ на основе {{ site.reviews.toLocaleString('ru-RU') }} отзывов автолюбителей</small
          >
          <a
            :href="site.url"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-primary mt-3"
            :aria-label="`Перейти на сайт ${site.name} в новой вкладке`"
            @click="handleExternalLink($event, site.url)"
          >
            🚀 Перейти на сайт
          </a>
        </div>
      </section>

      <div class="row">
        <div class="col-12 col-md-8">
          <div class="card mb-4">
            <div class="card-header bg-white">
              <h2 class="mb-1 visually-hidden" itemprop="name">{{ site.name }}</h2>
              <div
                class="d-flex align-items-center flex-wrap gap-2"
                itemprop="aggregateRating"
                itemscope
                itemtype="https://schema.org/AggregateRating"
              >
                <star-rating :rating="site.rating" />
                <meta itemprop="ratingValue" :content="site.rating.toFixed(1)" />
                <meta itemprop="bestRating" content="5" />
                <meta itemprop="worstRating" content="1" />
                <meta itemprop="ratingCount" :content="site.reviews" />
                <span class="text-muted">({{ site.reviews }} отзывов)</span>
              </div>
            </div>
            <div class="card-body">
              <p class="lead" itemprop="description">{{ site.description }}</p>

              <div class="row g-3 mb-4" v-if="site.details">
                <div class="col-6 col-md-3" v-if="site.details.founded">
                  <div class="border rounded-3 p-3 text-center bg-light">
                    <small class="text-muted text-uppercase">Год запуска</small>
                    <div class="fw-semibold fs-5">{{ site.details.founded }}</div>
                  </div>
                </div>
                <div class="col-6 col-md-3" v-if="site.details.headquarters">
                  <div class="border rounded-3 p-3 text-center bg-light">
                    <small class="text-muted text-uppercase">Штаб-квартира</small>
                    <div class="fw-semibold fs-5">{{ site.details.headquarters }}</div>
                  </div>
                </div>
                <div class="col-6 col-md-3" v-if="site.details.dailyVisitors">
                  <div class="border rounded-3 p-3 text-center bg-light">
                    <small class="text-muted text-uppercase">Аудитория</small>
                    <div class="fw-semibold fs-6">{{ site.details.dailyVisitors }}</div>
                  </div>
                </div>
                <div class="col-6 col-md-3" v-if="site.details.uniqueListings">
                  <div class="border rounded-3 p-3 text-center bg-light">
                    <small class="text-muted text-uppercase">Объявления</small>
                    <div class="fw-semibold fs-6">{{ site.details.uniqueListings }}</div>
                  </div>
                </div>
              </div>

              <div class="mb-4">
                <h5>Особенности площадки</h5>
                <ul class="mb-3" itemprop="features">
                  <li v-for="(feature, index) in site.features" :key="index">{{ feature }}</li>
                </ul>
                <a
                  :href="site.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn btn-primary"
                  :aria-label="`Перейти на сайт ${site.name} в новой вкладке`"
                  itemprop="url"
                  @click="handleExternalLink($event, site.url)"
                >
                  Перейти на сайт
                </a>
              </div>

              <div v-if="site.details">
                <div class="row g-4">
                  <div class="col-12 col-md-6" v-if="site.details.offerTypes?.length">
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
                  <div class="col-12 col-md-6" v-if="site.details.verification">
                    <h6 class="text-uppercase text-muted">Проверка и безопасность</h6>
                    <p class="mb-0">{{ site.details.verification }}</p>
                  </div>
                </div>

                <div class="mt-4" v-if="site.details.services?.length">
                  <h5>Ключевые сервисы</h5>
                  <div class="row g-3">
                    <div
                      class="col-12 col-md-4"
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
                  <div class="col-12 col-md-6" v-if="site.details.pros?.length">
                    <div class="border rounded-3 p-3 h-100">
                      <h6 class="text-success">Преимущества</h6>
                      <ul class="mb-0">
                        <li v-for="pro in site.details.pros" :key="pro">{{ pro }}</li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-12 col-md-6" v-if="site.details.cons?.length">
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
                      <div class="col-12 col-md-4" v-if="site.details.contacts.phone">
                        <small class="text-muted text-uppercase">Телефон</small>
                        <div class="fw-semibold">{{ site.details.contacts.phone }}</div>
                      </div>
                      <div class="col-12 col-md-4" v-if="site.details.contacts.support">
                        <small class="text-muted text-uppercase">Поддержка</small>
                        <div class="fw-semibold">{{ site.details.contacts.support }}</div>
                      </div>
                      <div class="col-12 col-md-4" v-if="site.details.contacts.offices">
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

        <div class="col-12 col-md-4">
          <ReviewForm :site-id="site.id" />
        </div>
      </div>
    </article>
  </div>
</template>

<script setup>
import { computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useRatingStore } from '@/stores/ratingStore'
import ReviewForm from '@/components/ReviewForm.vue'
import StarRating from '@/components/StarRating.vue'
import { useSEO } from '@/composables/useSEO'

const route = useRoute()
const ratingStore = useRatingStore()
const site = computed(() => ratingStore.sites.find((s) => s.id === parseInt(route.params.id)))

const handleExternalLink = (event, url) => {
  if (!url) {
    alert('URL не указан для сайта')
    event.preventDefault()
    return false
  }
  
  // Убеждаемся, что URL полный
  let fullUrl = url
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    fullUrl = `https://${url}`
  }
  
  // Открываем ссылку в новой вкладке
  const newWindow = window.open(fullUrl, '_blank', 'noopener,noreferrer')
  
  // Если открытие заблокировано (например, блокировщиком рекламы), показываем предупреждение
  if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
    // Если не удалось открыть, пробуем через location
    if (confirm('Не удалось открыть ссылку в новой вкладке. Открыть в текущей вкладке?')) {
      window.location.href = fullUrl
    }
    event.preventDefault()
    return false
  }
  
  // Предотвращаем стандартное поведение только если открытие прошло успешно
  event.preventDefault()
  return false
}

// Обновляем SEO при изменении сайта
const { updateSEO } = useSEO()
watch(
  () => site.value,
  (newSite) => {
    if (newSite) {
      updateSEO(newSite)
    }
  },
  { immediate: true },
)

onMounted(() => {
  if (site.value) {
    updateSEO(site.value)
  }
})
</script>
