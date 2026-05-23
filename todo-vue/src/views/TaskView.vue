<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import type { Task } from '@/stores/tasks';

const route = useRoute();
const router = useRouter();
const task = ref<Task | null>(null);
const loading = ref(true);

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:4000/tasks/' + route.params.id);
    if (!res.ok) {
      router.push('/');
      return;
    }
    task.value = await res.json();
  } catch (err) {
    router.push('/');
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="container">
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Chargement des détails de la tâche...</p>
    </div>
    
    <div v-else-if="task" class="task-card">
      <h1 class="task-title">{{ task.title }}</h1>
      
      <div class="task-info">
        <span class="info-label">Statut :</span>
        <span :class="['status-badge', task.done ? 'status-completed' : 'status-pending']">
          {{ task.done ? 'Terminée' : 'En cours' }}
        </span>
      </div>

      <div class="task-meta">
        <span class="info-label">ID de la tâche :</span>
        <code class="task-id">#{{ task.id }}</code>
      </div>

      <div class="actions">
        <RouterLink to="/" class="back-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Retour à la liste
        </RouterLink>
      </div>
    </div>

    <div v-else class="error-card">
      <p>Tâche introuvable.</p>
      <RouterLink to="/" class="back-link">Retour</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 3rem 1.5rem;
  max-width: 600px;
  margin: 0 auto;
}

.task-card, .loading-state, .error-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.task-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
}

.task-title {
  color: #1e293b;
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 1.5rem 0;
  line-height: 1.3;
}

.task-info, .task-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1.25rem;
  font-size: 1rem;
}

.info-label {
  color: #64748b;
  font-weight: 500;
}

.status-badge {
  padding: 6px 12px;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 0.85rem;
  letter-spacing: 0.3px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
}

.status-completed {
  background: rgba(66, 184, 131, 0.15);
  color: #15803d;
  border: 1px solid rgba(66, 184, 131, 0.25);
}

.status-pending {
  background: rgba(245, 158, 11, 0.15);
  color: #b45309;
  border: 1px solid rgba(245, 158, 11, 0.25);
}

.task-id {
  background: #f1f5f9;
  color: #475569;
  padding: 4px 8px;
  border-radius: 6px;
  font-family: monospace;
  font-size: 0.9rem;
  border: 1px solid #e2e8f0;
}

.actions {
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(226, 232, 240, 0.6);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #42b883;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.back-link:hover {
  transform: translateX(-4px);
  color: #33a06f;
}

/* Loading State styles */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #64748b;
  gap: 16px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(66, 184, 131, 0.1);
  border-radius: 50%;
  border-top-color: #42b883;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
