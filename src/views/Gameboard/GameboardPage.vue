<script setup lang="ts">
import { ref, onMounted, watch, reactive } from 'vue';
import supabase from '../../config/supabaseClient';
import { useRoute } from 'vue-router';
import Game from '../../components/Game.vue';
import InputField from '../../components/InputField.vue';
import router from '../../router/routes';
import CompletionModal from '../../components/CompletionModal.vue';

const level = ref<any | null>(null);
const route = useRoute();
const sharedStyles = ref({ customStyle: reactive({}) });
const showCompletionModal = ref(false);
const isLevelCompleted = ref();

const handleInput = (newStyles: any) => {
  console.log('Styles received in GameboardPage:', newStyles);
  sharedStyles.value.customStyle = newStyles.customStyle || {};
  updateStylesAndCheckCompletion();
  console.log(sharedStyles.value.customStyle)
};

// added
import BlackCat from '@/assets/BlackCat.png';
import OrangeBox from '@/assets/OrangeBox.png';
import BlackCatInBox from '@/assets/BlackCatInBox.png';

import OrangeCat from '@/assets/OrangeCat.png';
import GreenBox from '@/assets/GreenBox.png';
import OrangeCatInBox from '@/assets/OrangeCatInBox.png';

import GrayCat from '@/assets/GrayCat.png';
import BlueBox from '@/assets/BlueBox.png';
import GrayCatInBox from '@/assets/GrayCatInBox.png';


interface LevelData {
  cats: any[];
  boxes: any[];
  styles: { customStyle: { [key: string]: string } };
  levelCatStyling?: { [key: string]: string };
  levelBoxStyling?: { [key: string]: string }[];
  completedStyling: { [key: string]: string };
}


const levelData: Record<string, LevelData> = {
  1: {
    cats: [BlackCat],
    boxes: [OrangeBox],
    styles: {
      customStyle: {},
    },
    levelCatStyling: { top: '10px', left: '5px' },
    levelBoxStyling: [{ top: '85px', right: '25px' }],
    completedStyling: { justifyContent: 'flex-end' },
  },
  2: {
    cats: [BlackCat, OrangeCat, GrayCat],
    boxes: [OrangeBox, GreenBox, BlueBox],
    styles: {
      customStyle: {},
    },
    levelCatStyling: { top: '10px', left: '5px' },
    levelBoxStyling: [
      { bottom: '30px', left: '20px' }, 
      { bottom: '30px', left: '110px' }, 
      { bottom: '30px', left: '200px' }
    ], 
    completedStyling: { 'align-items': 'flex-end' },
  },
  3: {
    cats: [GrayCat, OrangeCat, BlackCat],
    boxes: [OrangeBox, GreenBox, BlueBox],
    styles: {
      customStyle: {},
    },
    levelCatStyling: { top: '10px', left: '5px' },
    levelBoxStyling: [
      { bottom: '30px', right: '200px' }, 
      { bottom: '30px', right: '110px' }, 
      { bottom: '30px', right: '20px' }
    ], 
    completedStyling: { 'flex-direction': 'row-reverse', 'align-items': 'flex-end' },
  },
  4: {
    cats: [BlackCat, BlackCat, OrangeCat, BlackCat, BlackCat],
    boxes: [OrangeBox, OrangeBox, GreenBox, OrangeBox, OrangeBox],
    styles: {
      customStyle: {},
    },
    levelCatStyling: { top: '50px', left: '50px' },
    levelBoxStyling: [
      { top: '85px', left: '10px' }, 
      { top: '85px', left: '100px' }, 
      { bottom: '30px', right:'140px' },
      { top: '85px', right: '100px' },
      { top: '85px', right: '10px' },
    ], 
    completedStyling: { 'align-self': 'flex-end' },
  },
  5: {
    cats: [BlackCat, OrangeCat, GrayCat],
    boxes: [OrangeBox, BlueBox, GreenBox],
    styles: {
      customStyle: {},
    },
    levelCatStyling: { top: '15px', left: '10px' },
    levelBoxStyling: [
      { top: '85px', left: '25px' }, 
      { top: '85px', left: '105px' }, 
      { top: '85px', left: '180px' },
    ], 
    completedStyling: { order: '1' },
  },
  6: {
    cats: [GrayCat, BlackCat, BlackCat, BlackCat, OrangeCat],
    boxes: [BlueBox, OrangeBox, OrangeBox, OrangeBox, GreenBox],
    styles: {
      customStyle: {},
    },
    levelCatStyling: { top: '15px', left: '-18px' },
    levelBoxStyling: [
      { top: '85px', left: '1px' }, 
      { top: '85px', left: '75px' }, 
      { top: '85px', left: '150px' },
      { bottom: '30px', left: '10px' },
      { bottom: '30px', left: '95px' },
    ], 
        completedStyling: { 'flex-wrap': 'wrap' },
  },
};


const currentLevel = ref<LevelData | null>(null);

const updateStylesAndCheckCompletion = (newStyles?: { customStyle?: { [key: string]: string } }) => {
  console.log('Styles received in Game.vue:', newStyles);
  const levelId = route.params.levelId as string;
  currentLevel.value = levelData[levelId];
  console.log(route.params.level);
  currentLevel.value!.styles.customStyle = {
    ...(currentLevel.value!.styles.customStyle || {}),
    ...(newStyles?.customStyle || {}),
  };

  // Check completion
  if (currentLevel.value && currentLevel.value.completedStyling) {
    const catPosition = currentLevel.value.levelCatStyling;

    if (catPosition) {
      const completionStyling = currentLevel.value.completedStyling;
      let isLevelCompleted = true;

      for (const [property, value] of Object.entries(completionStyling)) {
        const catPropertyValue = catPosition[property];
        const completionThreshold = 10;

        if (!catPropertyValue || Math.abs(parseInt(catPropertyValue) - parseInt(value)) >= completionThreshold) {
          isLevelCompleted = false;
          console.log('Level not completed');
          break;
        }
      }
      if (isLevelCompleted) {
        console.log('Level completed');
      }
    }
  }

  sharedStyles.value.customStyle = currentLevel.value!.styles.customStyle;
};

onMounted(() => {
  updateStylesAndCheckCompletion();
});
//



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
    if (isLevelCompleted.value) {
      router.push({ name: 'Gameboard', params: { levelId: nextLevelId.toString() } });
    }
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
      <InputField @updateCustomStyles="handleInput" :sharedStyles="sharedStyles" @goToNextLevel="goToNextLevel" :isLevelCompleted="isLevelCompleted"/>
    </div>
    <div>
      <Game :level="levelData[route.params.levelId as string]" :levelId="route.params.levelId" :sharedStyles="sharedStyles" :isLevelCompleted="isLevelCompleted" :updateFunction="updateStylesAndCheckCompletion"/>
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