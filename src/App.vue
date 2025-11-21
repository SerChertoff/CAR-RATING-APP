<script setup>
import { RouterLink, RouterView } from 'vue-router'
import config from '@/config'
</script>

<template>
  <div class="app-shell">
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>

    <header class="app-navbar">
      <div class="container nav-inner">
        <RouterLink to="/" class="brand">
          <span class="brand-badge">DrivePulse</span>
          <div>
            <strong>{{ config.app.name }}</strong>
            <p>Гид по проверенным площадкам</p>
          </div>
        </RouterLink>

        <div class="nav-actions">
          <a class="nav-pill" href="#top-sites">Тренды 2025</a>
          <RouterLink class="nav-link" to="/">Каталог</RouterLink>
        </div>
      </div>
    </header>

    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>
