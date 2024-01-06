<script setup lang="ts">
import { ref, onMounted } from 'vue';
import supabase from '../../config/supabaseClient';
import { useRoute } from 'vue-router';
import Game from '../../components/Game.vue';

const level = ref<any | null>(null);
const route = useRoute();

const fetchLevel = async () => {
  try {
    const levelId = route.params.levelId;
    const { data, error } = await supabase.from('levels').select().eq('id', levelId).single();
    if (error) {
      throw error;
    }
    level.value = data;
  } catch (error: any) {
    console.error('Error fetching level:', error.message);
  }
};

onMounted(() => {
  fetchLevel();
});
</script>

<template>
  <div>
    <div v-if="level" class="gameboard">
      <router-link to="/levels">
          <font-awesome-icon icon="fas fa-chevron-left" :style="{ fontSize: '25px', color: '#fff' }" />
        </router-link>
        <div class="game-container">
    <div class="level-container">
      <p>{{ level?.title }}</p>
      <p>{{ level?.level_name }}</p>
      <p>{{ level?.instructions }}</p>
    </div>
    <div class="gameboard-container">
      <Game :level="level" :levelId="route.params.levelId" />
    </div>
  </div>
     
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<style scoped>
.gameboard {
    background-color: #2d1b5b;
    height: 100vh;
    text-align: left;
    color: white; 
    padding: 30px;
 
  }

  .game-container {
   display: flex;
   flex-direction: row;
   justify-content: space-around;
  }
  .level-container {
   
  }

  .back-button {
    margin-bottom: 10px;
    cursor: pointer;
  }
</style>