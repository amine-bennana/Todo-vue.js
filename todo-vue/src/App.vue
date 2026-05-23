<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header class="app-header">
    <div class="header-container">
      <div class="brand">
        <div class="logo-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="check-svg"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <span class="brand-name">Todo<span class="vue-accent">Vue</span></span>
      </div>
      
      <nav class="nav-links">
        <RouterLink to="/" class="nav-item">Tâches</RouterLink>
        <RouterLink to="/about" class="nav-item">À propos</RouterLink>
      </nav>
    </div>
  </header>

  <main class="app-main">
    <RouterView v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
  </main>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
  padding: 1rem 1.5rem;
}

.header-container {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-icon {
  background: linear-gradient(135deg, #42b883 0%, #35495e 100%);
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(66, 184, 131, 0.3);
}

.check-svg {
  width: 18px;
  height: 18px;
}

.brand-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  letter-spacing: -0.5px;
}

.vue-accent {
  color: #42b883;
}

.nav-links {
  display: flex;
  gap: 8px;
}

.nav-item {
  color: #64748b;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.25s ease;
}

.nav-item:hover {
  background: rgba(241, 245, 249, 0.8);
  color: #1e293b;
}

/* Vue Router Active Link Customization */
.nav-item.router-link-active {
  background: rgba(66, 184, 131, 0.1);
  color: #42b883;
}

.app-main {
  flex: 1;
}

/* Page transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
