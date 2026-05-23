<script setup lang="ts">
import { RouterLink } from 'vue-router';
import type { Task } from '@/stores/tasks';

defineProps<{ task: Task }>();

const emit = defineEmits<{
  toggle: [task: Task];
  delete: [id: string];
}>();
</script>

<template>
  <li class="task-item">
    <label class="checkbox-container">
      <input 
        type="checkbox" 
        :checked="task.done" 
        @change="emit('toggle', task)" 
      />
      <span class="checkmark"></span>
    </label>
    
    <span :class="['task-title', { 'task-done': task.done }]">
      {{ task.title }}
    </span>
    
    <div class="actions">
      <RouterLink :to="'/tasks/' + task.id" class="details-link">
        Détails
      </RouterLink>
      <button @click="emit('delete', task.id)" class="delete-btn" title="Supprimer">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
      </button>
    </div>
  </li>
</template>

<style scoped>
.task-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  margin-bottom: 12px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.task-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
  background: rgba(255, 255, 255, 0.9);
  border-color: rgba(66, 184, 131, 0.3);
}

.task-title {
  flex: 1;
  font-size: 1rem;
  color: #2c3e50;
  transition: all 0.3s ease;
  font-weight: 500;
}

.task-done {
  text-decoration: line-through;
  color: #94a3b8;
  font-weight: 400;
}

.actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.details-link {
  color: #42b883;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.875rem;
  padding: 4px 10px;
  border-radius: 6px;
  background: rgba(66, 184, 131, 0.1);
  transition: all 0.2s ease;
}

.details-link:hover {
  background: #42b883;
  color: white;
}

.delete-btn {
  background: transparent;
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.delete-btn:hover {
  background: rgba(239, 68, 68, 0.1);
  transform: scale(1.05);
}

/* Custom Checkbox */
.checkbox-container {
  position: relative;
  display: block;
  width: 20px;
  height: 20px;
  cursor: pointer;
  user-select: none;
}

.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #fff;
  border: 2px solid #cbd5e1;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.checkbox-container:hover input ~ .checkmark {
  border-color: #42b883;
}

.checkbox-container input:checked ~ .checkmark {
  background-color: #42b883;
  border-color: #42b883;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

.checkbox-container .checkmark:after {
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
</style>
