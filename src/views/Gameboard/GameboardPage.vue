<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import supabase from '../../config/supabaseClient';
import { useRoute } from 'vue-router';
import Game from '../../components/Game.vue';
import InputField from '../../components/InputField.vue';
import router from '../../router/routes';
import CompletionModal from '../../components/CompletionModal.vue';

const level = ref<any | null>(null);
const route = useRoute();
const sharedStyles = ref({ customStyle: {} });
const showCompletionModal = ref(false);

const updateStyles = (newStyles: any) => {
  sharedStyles.value = newStyles;
};

const handleInput = (styles: any) => {
  updateStyles(styles);
};

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

const goToNextLevel = () => {
  const nextLevelId = level.value.id + 1; 
  if (nextLevelId === 7) {
    showCompletionModal.value = true;
  } else {
  router.push({ name: 'Gameboard', params: { levelId: nextLevelId.toString() } });
  }
};

onMounted(() => {
  fetchLevel();
});

watch(() => route.params.levelId, (newLevelId, oldLevelId) => {
  if (newLevelId !== oldLevelId) {
    fetchLevel();
  }
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
      <div class="level-text">
      <p>{{ level?.title }}</p>
      <p>{{ level?.level_name }}</p>
      <p>{{ level?.instructions }}</p>
    </div>
      <InputField @updateStyles="handleInput" :sharedStyles="sharedStyles" @goToNextLevel="goToNextLevel" />
    </div>
    <div>
      <Game :level="level" @updateStyles="handleInput" :levelId="route.params.levelId" :sharedStyles="sharedStyles" />
    </div>
  </div>
     
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
    <CompletionModal v-if="showCompletionModal" />
  </div>
</template>

<style scoped>
.gameboard {
    background-color: #2d1b5b;
    min-height: 100vh;
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
  width: 100%; 
}

.level-text {
  padding: 30px;
}

@media (max-width: 1025px) {
  .game-container {
    flex-direction: column-reverse;
    align-items: center;
  }

}

  .back-button {
    margin-bottom: 10px;
    cursor: pointer;
  }
</style>