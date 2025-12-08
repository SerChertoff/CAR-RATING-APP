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

    // Определяем базовый URL и canonical URL перед использованием
    const baseUrl = 'https://yourdomain.com/CAR-RATING-APP'
    const canonicalUrl = site ? `${baseUrl}/site/${site.id}` : baseUrl

    // Обновляем title
    document.title = title

    // Обновляем мета-теги
    updateMetaTag('description', description)
    updateMetaTag('keywords', keywords)
    updateMetaTag('og:title', title, 'property')
    updateMetaTag('og:description', description, 'property')
    updateMetaTag('og:url', canonicalUrl, 'property')
    updateMetaTag('og:image', `${baseUrl}/og-image.jpg`, 'property')
    updateMetaTag('twitter:title', title, 'property')
    updateMetaTag('twitter:description', description, 'property')
    updateMetaTag('twitter:image', `${baseUrl}/og-image.jpg`, 'property')
    updateMetaTag('twitter:url', canonicalUrl, 'property')

    // Обновляем canonical URL
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
    // Удаляем старые структурированные данные (кроме статических из index.html)
    const oldScripts = document.querySelectorAll('script[type="application/ld+json"]')
    oldScripts.forEach((script) => {
      // Удаляем только динамические скрипты, не статические из head
      if (
        script.textContent.includes('"@type"') &&
        !script.textContent.includes('"@type": "WebSite"') &&
        !script.textContent.includes('"@type": "Organization"')
      ) {
        script.remove()
      }
    })

    const baseUrl = 'https://yourdomain.com/CAR-RATING-APP'
    const scripts = []

    if (site) {
      // Product schema для страницы площадки
      scripts.push({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: site.name,
        description: site.description,
        url: `${baseUrl}/site/${site.id}`,
        image: `${baseUrl}/og-image.jpg`,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: site.rating.toFixed(1),
          reviewCount: site.reviews,
          bestRating: '5',
          worstRating: '1',
        },
        brand: {
          '@type': 'Brand',
          name: site.name,
        },
        offers: {
          '@type': 'Offer',
          url: site.url || `${baseUrl}/site/${site.id}`,
          availability: 'https://schema.org/InStock',
        },
      })

      // BreadcrumbList для навигации
      scripts.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Главная',
            item: baseUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: site.name,
            item: `${baseUrl}/site/${site.id}`,
          },
        ],
      })

      // WebPage для страницы
      scripts.push({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: `${site.name} - Рейтинг ${site.rating.toFixed(1)}/5`,
        description: site.description,
        url: `${baseUrl}/site/${site.id}`,
        mainEntity: {
          '@type': 'Product',
          name: site.name,
        },
      })
    } else {
      // ItemList для главной страницы со списком площадок
      const sitesList = ratingStore.sites.map((s, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: s.name,
          description: s.description,
          url: `${baseUrl}/site/${s.id}`,
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: s.rating.toFixed(1),
            reviewCount: s.reviews,
          },
        },
      }))

      scripts.push({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Рейтинг автоплощадок России',
        description: 'Список лучших автоплощадок России с рейтингами и отзывами',
        numberOfItems: sitesList.length,
        itemListElement: sitesList,
      })

      // BreadcrumbList для главной
      scripts.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Главная',
            item: baseUrl,
          },
        ],
      })
    }

    // Добавляем все структурированные данные
    scripts.forEach((data) => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(data)
      document.head.appendChild(script)
    })
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
