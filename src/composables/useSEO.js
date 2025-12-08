import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useRatingStore } from '@/stores/ratingStore'

export function useSEO() {
  const route = useRoute()
  const ratingStore = useRatingStore()

  const updateSEO = (site = null) => {
    let title = 'DrivePulse - Рейтинг автоплощадок России 2025 | Отзывы автолюбителей'
    let description =
      'Рейтинг лучших автоплощадок России 2025. Сравнение Auto.ru, Drom.ru, Avito Авто. Проверенные отзывы автолюбителей, сравнение сервисов, рейтинги площадок для покупки автомобиля.'
    let keywords =
      'рейтинг автоплощадок, автоплощадки России, Auto.ru, Drom.ru, Avito Авто, отзывы автолюбителей, где купить автомобиль, сравнение автоплощадок, лучшие автоплощадки 2025'

    if (site) {
      title = `${site.name} - Рейтинг ${site.rating.toFixed(1)}/5 | DrivePulse`
      description = `${site.description}. Рейтинг ${site.rating.toFixed(1)}/5 на основе ${site.reviews.toLocaleString('ru-RU')} отзывов автолюбителей.`
      keywords = `${site.name}, рейтинг ${site.name}, отзывы ${site.name}, ${site.name} рейтинг`
    }

    // Обновляем title
    document.title = title

    // Обновляем мета-теги
    updateMetaTag('description', description)
    updateMetaTag('keywords', keywords)
    updateMetaTag('og:title', title, 'property')
    updateMetaTag('og:description', description, 'property')
    updateMetaTag('twitter:title', title, 'property')
    updateMetaTag('twitter:description', description, 'property')

    // Обновляем canonical URL
    const baseUrl = 'https://yourdomain.com/CAR-RATING-APP'
    const canonicalUrl = site ? `${baseUrl}/site/${site.id}` : baseUrl
    updateCanonical(canonicalUrl)

    // Добавляем структурированные данные
    updateStructuredData(site)
  }

  const updateMetaTag = (name, content, attribute = 'name') => {
    let meta = document.querySelector(`meta[${attribute}="${name}"]`)
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute(attribute, name)
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', content)
  }

  const updateCanonical = (url) => {
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)
  }

  const updateStructuredData = (site) => {
    // Удаляем старые структурированные данные
    const oldScripts = document.querySelectorAll('script[type="application/ld+json"]')
    oldScripts.forEach((script) => {
      if (script.textContent.includes('"@type"')) {
        script.remove()
      }
    })

    let structuredData

    if (site) {
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: site.name,
        description: site.description,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: site.rating.toFixed(1),
          reviewCount: site.reviews,
          bestRating: '5',
          worstRating: '1',
        },
        url: `https://yourdomain.com/CAR-RATING-APP/site/${site.id}`,
        brand: {
          '@type': 'Brand',
          name: site.name,
        },
      }
    } else {
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'DrivePulse',
        alternateName: 'Рейтинг автоплощадок России',
        url: 'https://yourdomain.com/CAR-RATING-APP/',
        description:
          'Рейтинг лучших автоплощадок России. Сравнение Auto.ru, Drom.ru, Avito Авто. Отзывы автолюбителей.',
        inLanguage: 'ru-RU',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://yourdomain.com/CAR-RATING-APP/?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      }
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(structuredData)
    document.head.appendChild(script)
  }

  // Отслеживаем изменения маршрута
  watch(
    () => route.params.id,
    (id) => {
      if (id) {
        const site = ratingStore.sites.find((s) => s.id === parseInt(id))
        updateSEO(site)
      } else {
        updateSEO()
      }
    },
    { immediate: true },
  )

  return { updateSEO }
}
