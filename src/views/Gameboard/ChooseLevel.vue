

<script setup lang="ts">

import { ref, onMounted } from 'vue';
import supabase from '../../config/supabaseClient'
import { useRouter } from 'vue-router';

const levels = ref<any[] | null>(null);
  const router = useRouter();

const fetchLevels = async () => {
  try {
    const { data, error } = await supabase.from('levels').select();
    if (error) {
      throw error;
    }
    levels.value = data;
  } catch (error: any) {
    console.error('Error fetching levels:', error.message);
  }
};

onMounted(() => {
  fetchLevels();
});

const navigateToGameboard = (levelId: number) => {
  router.push({ name: 'Gameboard', params: { levelId: levelId.toString() } });
};

</script>

<template>
    <header class="header">
      <div class="left-container">
        <router-link to="/">
          <font-awesome-icon icon="fas fa-chevron-left" :style="{ fontSize: '25px', color: '#fff' }" />
        </router-link>
      </div>
      <div class="centered-container">
       <router-link to="/">
         <img src="../../assets/CatBoxLogo.png" alt="CatBoxLogo"  width="230">
       </router-link>
      </div>
      <div class="right-container"></div>
    </header>
    <body class="body">
      <div class="level-container" v-for="(level, index) in levels" :key="index" @click="() => navigateToGameboard(level.id)">
        <p>{{ level.title }}</p>
        <p>{{ level.level_name }}</p>
        <p>{{ level.learn }}</p>
      </div>
    </body>
</template>
    
    
    <style scoped>
    
.header {
    background-color: #1C0C45;
    padding: 1.3rem 5%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.right-container {
  padding: 10px;
}
.body {
  background-color: #2d1b5b;
  height: 100vh;
}
.level-container {
  border: 2px solid #cccccc;
  padding: 10px;
  text-align: center;
  background-color: #2d1b5b;
  margin: 30px;
  color: #fff;
}

@media only screen and (min-width: 768px) {
  .body {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
}

@media only screen and (max-width: 767px) {

  .level-container {
    display: block;
    margin-top: 0;
  }
}
    </style>