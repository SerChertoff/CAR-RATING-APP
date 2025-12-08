<script setup>
import { RouterLink, RouterView } from 'vue-router'
import config from '@/config'
</script>

<template>
  <div class="app-shell">
    <a class="skip-link" href="#main-content">Пропустить к основному контенту</a>
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>

    <header class="app-navbar" role="banner">
      <div class="container nav-inner">
        <RouterLink to="/" class="brand" aria-label="На главную DrivePulse">
          <span class="brand-badge">DrivePulse</span>
          <div>
            <strong>{{ config.app.name }}</strong>
            <p>Гид по проверенным площадкам</p>
          </div>
        </RouterLink>

        <nav class="nav-actions" aria-label="Основная навигация">
          <a class="nav-pill" href="#top-sites">Тренды 2025</a>
          <RouterLink class="nav-link" to="/">Каталог</RouterLink>
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
