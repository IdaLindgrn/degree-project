<template>
  <header class="header">
    <div class="left-container">
      <router-link to="/">
        <font-awesome-icon icon="fas fa-chevron-left" class="back-button" :style="{ fontSize: '25px', color: '#fff' }" />
      </router-link>
    </div>
    <div class="centered-container">
     <router-link to="/">
       <img src="../../assets/cat-box-logo.png" alt="CatBox logo"  width="230">
     </router-link>
    </div>
    <div class="right-container"></div>
  </header>
  <body class="body">
    <div class="level-container" v-for="(level, index) in levels" :key="index" @click="() => navigateToGameboard(level.id)">
      <p class="level-learn">{{ level.title }}</p>
      <p class="level-title">{{ level.level_name }}</p>
      <p class="level-learn">{{ level.learn }}</p>
      <div class="start-level">BEGIN</div>
    </div>
  </body>
</template>

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
  min-height: 100vh;
  padding: 40px;
}
.level-container {
  border: 3px solid #ababab;
  padding: 35px;
  background-color: #2d1b5b;
  color: #fff;
  transition: border-color 0.7s ease;
}

.level-container:hover {
  border-color: #ffffff;
}

.level-title {
  font-size: larger;
  padding-bottom: 10px;
}

.level-learn {
  font-size: small; 
  padding-bottom: 5px;
  color: #a395c7;
}

.start-level {
  margin-top: 15px;
  background: rgb(231,159,75);
  background: linear-gradient(0deg, rgba(231,159,75,1) 0%, rgba(144,39,25,1) 100%);
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  bottom: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.7s ease;
}

.level-container:hover .start-level {
  opacity: 1;
  cursor: pointer;
}

@media only screen and (min-width: 1025px) {
  .body {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 50px;
  }
}

@media only screen and (max-width: 1025px) {
  .body {
    display: grid;
    gap: 30px;
  }
}
    </style>