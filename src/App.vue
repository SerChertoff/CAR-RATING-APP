<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { ref, onMounted, onUnmounted, watch } from 'vue'
import config from '@/config'
import { useSEO } from '@/composables/useSEO'

// Инициализируем SEO
useSEO()

// Mobile menu state
const isMobileMenuOpen = ref(false)
const router = useRouter()

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Close menu when clicking outside
const handleClickOutside = (event) => {
  if (isMobileMenuOpen.value && !event.target.closest('.app-navbar')) {
    closeMobileMenu()
  }
}

// Close menu on route change
watch(
  () => router.currentRoute.value.path,
  () => {
    closeMobileMenu()
  },
)

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="app-shell">
    <a class="skip-link" href="#main-content">Пропустить к основному контенту</a>
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>
    <div class="orb orb-4"></div>

    <header class="app-navbar" role="banner" itemscope itemtype="https://schema.org/WPHeader">
      <div class="container nav-inner">
        <RouterLink
          to="/"
          class="brand"
          aria-label="На главную DrivePulse"
          itemprop="url"
          @click="closeMobileMenu"
        >
          <span class="brand-badge" itemprop="name">DrivePulse</span>
          <div>
            <strong itemprop="alternateName">{{ config.app.name }}</strong>
            <p>Для настоящих автолюбителей</p>
          </div>
        </RouterLink>

        <button
          class="mobile-menu-toggle"
          @click="toggleMobileMenu"
          :aria-expanded="isMobileMenuOpen"
          aria-label="Переключить меню"
          aria-controls="main-navigation"
        >
          <span class="hamburger-icon" :class="{ active: isMobileMenuOpen }">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <nav
          class="nav-actions"
          :class="{ 'mobile-open': isMobileMenuOpen }"
          id="main-navigation"
          aria-label="Основная навигация"
        >
          <a class="nav-pill" href="#top-sites" @click="closeMobileMenu"> 🏁 Тренды 2025 </a>
          <RouterLink class="nav-link" to="/" @click="closeMobileMenu"> 📋 Каталог </RouterLink>
        </nav>
      </div>
    </header>

    <main id="main-content" class="app-main" role="main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.skip-link {
  position: absolute;
  top: -40px;
  left: 12px;
  padding: 8px 12px;
  background: #111827;
  color: #fff;
  border-radius: 6px;
  z-index: 10;
}

.skip-link:focus {
  top: 12px;
  outline: 2px solid #fbbf24;
}

/* Mobile menu toggle button */
.mobile-menu-toggle {
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 100;
  color: #fff;
}

.hamburger-icon {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 24px;
  height: 18px;
  position: relative;
}

.hamburger-icon span {
  display: block;
  width: 100%;
  height: 2px;
  background: currentColor;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.hamburger-icon.active span:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.hamburger-icon.active span:nth-child(2) {
  opacity: 0;
}

.hamburger-icon.active span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* Mobile navigation styles */
@media (max-width: 768px) {
  .mobile-menu-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav-actions {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(2, 6, 23, 0.98);
    backdrop-filter: blur(20px);
    border-top: 1px solid var(--glass-border);
    border-bottom: 1px solid var(--glass-border);
    flex-direction: column;
    padding: 1rem;
    gap: 0.75rem;
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 99;
  }

  .nav-actions.mobile-open {
    max-height: 300px;
    opacity: 1;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  }

  .nav-actions .nav-pill,
  .nav-actions .nav-link {
    width: 100%;
    text-align: center;
    padding: 0.75rem 1rem;
  }
}

@media (min-width: 769px) {
  .nav-actions {
    position: static;
    max-height: none;
    opacity: 1;
    flex-direction: row;
  }
}
</style>
