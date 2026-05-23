<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useTaskStore } from '@/stores/tasks';
import TodoItem from '@/components/TodoItem.vue';

const store = useTaskStore();
const newTitle = ref('');
const filter = ref<'all' | 'pending' | 'completed'>('all');

onMounted(() => store.fetchTasks());

function handleAdd() {
  if (!newTitle.value.trim()) return;
  store.addTask(newTitle.value);
  newTitle.value = '';
}

const completedCount = computed(() => {
  return store.tasks.filter(t => t.done).length;
});

const filteredTasks = computed(() => {
  if (filter.value === 'pending') {
    return store.tasks.filter(t => !t.done);
  }
  if (filter.value === 'completed') {
    return store.tasks.filter(t => t.done);
  }
  return store.tasks;
});
</script>

<template>
  <div class="home-container">
    <div class="header-card">
      <h1 class="title">Mes Tâches</h1>
      <p class="subtitle" v-if="store.tasks.length > 0">
        {{ completedCount }} sur {{ store.tasks.length }} tâches complétées
      </p>
      <p class="subtitle" v-else>Prêt à commencer votre journée ?</p>
      
      <!-- Progress Bar -->
      <div class="progress-bar-wrapper" v-if="store.tasks.length > 0">
        <div 
          class="progress-bar-fill" 
          :style="{ width: `${(completedCount / store.tasks.length) * 100}%` }"
        ></div>
      </div>
    </div>

    <!-- Input Form -->
    <div class="input-card">
      <div class="input-group">
        <input 
          v-model="newTitle" 
          placeholder="Ajouter une nouvelle tâche..." 
          @keyup.enter="handleAdd"
          class="task-input"
        />
        <button @click="handleAdd" class="add-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Ajouter
        </button>
      </div>
    </div>

    <!-- Filter Controls -->
    <div class="filter-controls" v-if="store.tasks.length > 0">
      <button 
        :class="['filter-btn', { active: filter === 'all' }]" 
        @click="filter = 'all'"
      >
        Toutes
      </button>
      <button 
        :class="['filter-btn', { active: filter === 'pending' }]" 
        @click="filter = 'pending'"
      >
        En cours ({{ store.tasks.filter(t => !t.done).length }})
      </button>
      <button 
        :class="['filter-btn', { active: filter === 'completed' }]" 
        @click="filter = 'completed'"
      >
        Terminées ({{ completedCount }})
      </button>
    </div>

    <!-- Error State -->
    <div v-if="store.error" class="error-state">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
      <p>{{ store.error }}</p>
      <button @click="store.fetchTasks()" class="retry-btn">Réessayer</button>
    </div>

    <!-- Loading State -->
    <div v-if="store.loading && store.tasks.length === 0" class="loading-state">
      <div class="spinner"></div>
      <p>Chargement de vos tâches...</p>
    </div>

    <!-- Tasks List -->
    <div v-else class="tasks-wrapper">
      <p v-if="filteredTasks.length === 0" class="empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="empty-icon"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
        <span>Aucune tâche trouvée.</span>
      </p>
      
      <ul v-else class="tasks-list">
        <TodoItem 
          v-for="task in filteredTasks" 
          :key="task.id" 
          :task="task"
          @toggle="store.toggleTask" 
          @delete="store.deleteTask"
        />
      </ul>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  padding: 2.5rem 1.5rem;
  max-width: 600px;
  margin: 0 auto;
}

.header-card {
  margin-bottom: 2rem;
  text-align: center;
}

.title {
  color: #1e293b;
  font-size: 2.25rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #42b883 0%, #35495e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  color: #64748b;
  font-size: 0.95rem;
  margin-bottom: 1.25rem;
  font-weight: 500;
}

.progress-bar-wrapper {
  height: 6px;
  background: #e2e8f0;
  border-radius: 9999px;
  overflow: hidden;
  max-width: 300px;
  margin: 0 auto;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #42b883 0%, #22c55e 100%);
  border-radius: 9999px;
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.input-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 14px;
  padding: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
  margin-bottom: 1.5rem;
}

.input-group {
  display: flex;
  gap: 8px;
}

.task-input {
  flex: 1;
  border: 1px solid transparent;
  background: rgba(241, 245, 249, 0.7);
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 0.95rem;
  color: #1e293b;
  transition: all 0.2s ease;
  font-weight: 500;
}

.task-input:focus {
  outline: none;
  background: #ffffff;
  border-color: #42b883;
  box-shadow: 0 0 0 3px rgba(66, 184, 131, 0.15);
}

.add-button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #42b883;
  color: white;
  border: none;
  padding: 0 20px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-button:hover {
  background: #33a06f;
  transform: translateY(-1px);
}

.add-button:active {
  transform: translateY(0);
}

/* Filter buttons */
.filter-controls {
  display: flex;
  gap: 8px;
  margin-bottom: 1.5rem;
  justify-content: center;
}

.filter-btn {
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(226, 232, 240, 0.8);
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  background: #ffffff;
  color: #42b883;
  border-color: rgba(66, 184, 131, 0.3);
}

.filter-btn.active {
  background: #42b883;
  color: white;
  border-color: #42b883;
  box-shadow: 0 4px 10px rgba(66, 184, 131, 0.2);
}

.tasks-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* States styling */
.loading-state, .error-state, .empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  color: #64748b;
  font-weight: 500;
  text-align: center;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 16px;
  border: 1px dashed rgba(226, 232, 240, 0.8);
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid rgba(66, 184, 131, 0.1);
  border-radius: 50%;
  border-top-color: #42b883;
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 12px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-state {
  color: #ef4444;
  border-color: rgba(239, 68, 68, 0.2);
  background: rgba(254, 242, 242, 0.4);
  gap: 8px;
}

.retry-btn {
  margin-top: 8px;
  background: #ef4444;
  color: white;
  border: none;
  padding: 6px 16px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.retry-btn:hover {
  background: #dc2626;
}

.empty-icon {
  color: #94a3b8;
  margin-bottom: 12px;
}

.empty-state span {
  font-size: 0.95rem;
  color: #94a3b8;
}
</style>
