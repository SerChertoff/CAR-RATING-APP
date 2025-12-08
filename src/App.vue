<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue'
import config from '@/config'
import { useSEO } from '@/composables/useSEO'

// Инициализируем SEO
useSEO()
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
        <RouterLink to="/" class="brand" aria-label="На главную DrivePulse" itemprop="url">
          <span class="brand-badge" itemprop="name">DrivePulse</span>
          <div>
            <strong itemprop="alternateName">{{ config.app.name }}</strong>
            <p>Для настоящих автолюбителей</p>
          </div>
        </RouterLink>

        <nav class="nav-actions" aria-label="Основная навигация">
          <a class="nav-pill" href="#top-sites">🏁 Тренды 2025</a>
          <RouterLink class="nav-link" to="/">📋 Каталог</RouterLink>
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
</style>
