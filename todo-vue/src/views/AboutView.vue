<template>
  <div class="container">
    <div class="about-card">
      <h1 class="title">À propos de TodoVue</h1>
      <p class="intro">
        Cette application a été développée dans le cadre du TP de Développement Front-End. 
        L'objectif est d'explorer <strong>Vue 3</strong> (Composition API, TypeScript, Pinia, Vue Router) 
        et de comparer ses concepts clés avec ceux de <strong>React</strong>.
      </p>

      <div class="comparison-section">
        <h2>Comparaison Rapide</h2>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Concept</th>
                <th>React</th>
                <th>Vue 3</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Fichier principal</strong></td>
                <td><code>App.tsx</code> (HTML + JS mélangé)</td>
                <td><code>App.vue</code> (script + template + style)</td>
              </tr>
              <tr>
                <td><strong>State local</strong></td>
                <td><code>useState()</code> (Immutabilité)</td>
                <td><code>ref()</code> (Réactivité via Proxy)</td>
              </tr>
              <tr>
                <td><strong>Liaison de donnée</strong></td>
                <td>Unidirectionnelle (value + onChange)</td>
                <td>Bidirectionnelle (<code>v-model</code>)</td>
              </tr>
              <tr>
                <td><strong>State Global</strong></td>
                <td>Redux Toolkit (Slices, Dispatch, Selectors)</td>
                <td>Pinia (Store simple réactif)</td>
              </tr>
              <tr>
                <td><strong>Routage</strong></td>
                <td>React Router (Déclaratif JSX)</td>
                <td>Vue Router (Configuration centralisée)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="info-footer">
        <p>EMSI — 4DSIO — Dev Front End (React Js, Next Js, Vue Js)</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 3rem 1.5rem;
  max-width: 700px;
  margin: 0 auto;
}

.about-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
}

.title {
  color: #1e293b;
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #42b883 0%, #35495e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.intro {
  color: #475569;
  font-size: 1.05rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.comparison-section h2 {
  color: #1e293b;
  font-size: 1.35rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.table-wrapper {
  overflow-x: auto;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.9rem;
}

th, td {
  padding: 12px 16px;
  border-bottom: 1px solid #e2e8f0;
}

th {
  background-color: #f8fafc;
  color: #475569;
  font-weight: 600;
}

td {
  color: #334155;
}

tr:last-child td {
  border-bottom: none;
}

code {
  background: #f1f5f9;
  color: #0f172a;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.85rem;
}

.info-footer {
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(226, 232, 240, 0.6);
  text-align: center;
  color: #94a3b8;
  font-size: 0.85rem;
  font-weight: 500;
}
</style>
