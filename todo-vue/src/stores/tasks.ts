import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface Task {
  id: string;
  title: string;
  done: boolean;
}

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);

  async function fetchTasks() {
    loading.value = true;
    try {
      const res = await fetch('http://localhost:4000/tasks');
      if (!res.ok) throw new Error('Failed to fetch');
      tasks.value = await res.json();
      error.value = null;
    } catch (err) {
      error.value = 'Erreur de chargement des tâches';
    } finally {
      loading.value = false;
    }
  }

  async function addTask(title: string) {
    try {
      const res = await fetch('http://localhost:4000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, done: false }),
      });
      if (!res.ok) throw new Error('Failed to add');
      const newTask = await res.json();
      tasks.value.push(newTask);
    } catch (err) {
      error.value = "Erreur lors de l'ajout de la tâche";
    }
  }

  async function deleteTask(id: string) {
    try {
      const res = await fetch(`http://localhost:4000/tasks/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete');
      tasks.value = tasks.value.filter((t) => t.id !== id);
    } catch (err) {
      error.value = 'Erreur lors de la suppression de la tâche';
    }
  }

  async function toggleTask(task: Task) {
    try {
      const res = await fetch(`http://localhost:4000/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...task, done: !task.done }),
      });
      if (!res.ok) throw new Error('Failed to toggle');
      const data = await res.json();
      const i = tasks.value.findIndex((t) => t.id === data.id);
      if (i !== -1) {
        tasks.value[i] = data;
      }
    } catch (err) {
      error.value = 'Erreur lors de la modification de la tâche';
    }
  }

  return { tasks, loading, error, fetchTasks, addTask, deleteTask, toggleTask };
});
