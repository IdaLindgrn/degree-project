<template>
  <body>
    <div v-if="level" class="gameboard">
      <router-link to="/levels">
        <font-awesome-icon
          icon="fas fa-chevron-left"
          :style="{ fontSize: '25px', color: '#fff' }"
        />
      </router-link>
      <div class="game-container">
        <div class="level-container">
          <div class="level-text">
            <p class="level-number">{{ level?.title }}</p>
            <p class="level-title">{{ level?.level_name }}</p>
            <p class="level-description">{{ level?.instructions }}</p>
            <div class="level-acceptable_values">
              <p v-if="level?.acceptable_values">
                <span
                  v-for="(value, index) in level.acceptable_values.split('.')"
                  :key="index"
                >
                  {{ value }}
                  <br v-if="index < level.acceptable_values.split('.').length - 1" />
                </span>
              </p>
            </div>
          </div>
          <InputField
            :level="levelData[route.params.levelId as string]"
            :isLevelCompleted="isLevelCompleted"
            @requestNextLevel="goToNextLevel"
            @updateCustomStyles="handleInput"
            :sharedStyles="sharedStyles"
            @goToNextLevel="goToNextLevel"
          />
        </div>
        <div>
          <Game
            :level="levelData[route.params.levelId as string]"
            :levelId="route.params.levelId"
            :sharedStyles="toRefs(sharedStyles)"
            :isLevelCompleted="isLevelCompleted"
            :updateFunction="updateStylesAndCheckCompletion"
            @containerRef="handleContainerRef"
          />
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
    <CompletionModal v-if="showCompletionModal" />
  </body>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted,
  watch,
  reactive,
  toRefs,
  toRaw
} from 'vue';
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
const isLevelCompleted = ref(false);
const containerRef = ref(null);

const handleContainerRef = (ref: any) => {
  containerRef.value = ref;
  updateStylesAndCheckCompletion();
};

const handleInput = (newStyles: { customStyle: { [key: string]: string } }) => {
  console.log('Styles received in GameboardPage:', newStyles);
  sharedStyles.value.customStyle = newStyles.customStyle || {};
  const levelId = route.params.levelId as string;
  localStorage.setItem(
    `customStyle_${levelId}`,
    JSON.stringify(newStyles.customStyle || {})
  );
  updateStylesAndCheckCompletion(newStyles);
};

import BlackCat from '@/assets/black-cat.png';
import OrangeBox from '@/assets/orange-box.png';
import BlackCatInBox from '@/assets/black-cat-in-box.png';

import OrangeCat from '@/assets/orange-cat.png';
import GreenBox from '@/assets/green-box.png';
import OrangeCatInBox from '@/assets/orange-cat-in-box.png';

import GrayCat from '@/assets/gray-cat.png';
import BlueBox from '@/assets/blue-box.png';
import GrayCatInBox from '@/assets/gray-cat-in-box.png';


interface LevelData {
  cats: any[];
  boxes: any[];
  catsInBoxes: any[];
  styles: { customStyle: { [key: string]: string } };
  levelCatStyling?: { [key: string]: string };
  levelBoxStyling?: { [key: string]: string }[];
  completedStyling: { [key: string]: string };
}


const levelData: Record<string, LevelData> = {
  1: {
    cats: [BlackCat],
    boxes: [OrangeBox],
    catsInBoxes: [BlackCatInBox],
    styles: {
      customStyle: {},
    },
    levelCatStyling: { top: '10px' },
    levelBoxStyling: [{ top: '90px', right: '25px' }],
    completedStyling: { "justify-content": "flex-end" },
  },
  2: {
    cats: [BlackCat, OrangeCat, GrayCat],
    boxes: [OrangeBox, GreenBox, BlueBox],
    catsInBoxes: [BlackCatInBox, OrangeCatInBox, GrayCatInBox],
    styles: {
      customStyle: {},
    },
    levelCatStyling: { top: '10px', left: '5px' },
    levelBoxStyling: [
      { bottom: '30px', left: '20px' }, 
      { bottom: '30px', left: '110px' }, 
      { bottom: '30px', left: '200px' }
    ], 
    completedStyling: { "align-items": "flex-end" },
  },
  3: {
    cats: [GrayCat, OrangeCat, BlackCat],
    boxes: [OrangeBox, GreenBox, BlueBox],
    catsInBoxes: [GrayCatInBox, OrangeCatInBox, BlackCatInBox],
    styles: {
      customStyle: {},
    },
    levelCatStyling: { top: '10px', left: '5px' },
    levelBoxStyling: [
      { bottom: '30px', right: '200px' }, 
      { bottom: '30px', right: '110px' }, 
      { bottom: '30px', right: '20px' }
    ], 
    completedStyling: { "flex-direction": "row-reverse", "align-items": "flex-end" },
  },
  4: {
    cats: [BlackCat, BlackCat, OrangeCat, BlackCat, BlackCat],
    boxes: [OrangeBox, OrangeBox, GreenBox, OrangeBox, OrangeBox],
    catsInBoxes: [BlackCatInBox, BlackCatInBox, OrangeCatInBox, BlackCatInBox, BlackCatInBox],
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
    completedStyling: { "align-self": "flex-end" },
  },
  5: {
    cats: [BlackCat, OrangeCat, GrayCat],
    boxes: [OrangeBox, BlueBox, GreenBox],
    catsInBoxes: [BlackCatInBox, OrangeCatInBox, GrayCatInBox],
    styles: {
      customStyle: {},
    },
    levelCatStyling: { top: '15px', left: '10px' },
    levelBoxStyling: [
      { top: '85px', left: '25px' }, 
      { top: '85px', left: '105px' }, 
      { top: '85px', left: '180px' },
    ], 
    completedStyling: { "order": "1" },
  },
  6: {
    cats: [GrayCat, BlackCat, BlackCat, BlackCat, OrangeCat],
    boxes: [BlueBox, OrangeBox, OrangeBox, OrangeBox, GreenBox],
    catsInBoxes: [GrayCatInBox, BlackCatInBox, BlackCatInBox, BlackCatInBox, OrangeCatInBox ],
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
        completedStyling: { "flex-wrap": "wrap" },
  },
};

const currentLevel = ref<LevelData | null>(null);

const updateStylesAndCheckCompletion = (newStyles?: { customStyle?: { [key: string]: string } }) => {
  const levelId = route.params.levelId as string;          
  currentLevel.value = levelData[levelId];                 

  const localStorageKey = `customStyle_${levelId}`;
  console.log("Local storage current style key:", localStorageKey);

  const savedStyling = localStorage.getItem(localStorageKey);
  console.log("Local storage current style value:", savedStyling);

  if (savedStyling) {
    currentLevel.value!.styles.customStyle = reactive(JSON.parse(savedStyling));
  }

  if (newStyles?.customStyle) {
    currentLevel.value!.styles.customStyle = reactive({
      ...(currentLevel.value!.styles.customStyle || {}),
      ...newStyles.customStyle,
    });
  }
  
  // Check completion based on customStyle in localStorage
  if (currentLevel.value && currentLevel.value.completedStyling && containerRef.value) {

      const completedStyling = currentLevel.value.completedStyling;
      const completedStylingPlain = toRaw(completedStyling);

      console.log("savedStyling:", savedStyling)
      console.log("completedStyling:", completedStylingPlain)

      let savedStylingObject: { [key: string]: string } | null = null;

      try {
    savedStylingObject = savedStyling ? JSON.parse(savedStyling) : null;
  } catch (error) {
    console.error('Error parsing savedStyling:', error);
  }

  const areObjectsEqual = compareObjects(savedStylingObject, completedStylingPlain);


  if (areObjectsEqual) {
      isLevelCompleted.value = true;
      console.log('Level completed');
      sharedStyles.value.customStyle = currentLevel.value!.styles.customStyle;
      
      console.log("Skickat värde:", sharedStyles.value.customStyle);
  } else {
      isLevelCompleted.value = false;
      console.log('Level not completed');
  }
}


function compareObjects(obj1: { [key: string]: string } | null, obj2: { [key: string]: string }): boolean {
  if (!obj1) return false;

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
}
  
};

onMounted(() => {
  fetchLevel();
  updateStylesAndCheckCompletion();
});

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
      sharedStyles.value.customStyle = "";
      isLevelCompleted.value = false;
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

<style scoped lang="scss">
@import '@/style/main';

.gameboard {
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.level-text {
  padding-left: 50px;
  padding-right: 80px;
  margin-top: -10px;
}

.level-number {
  padding-bottom: 10px;
  font-size: smaller;
  color: #a395c7;
}

.level-title {
  padding-bottom: 10px;
  font-size: x-large;
}

.level-description {
  padding-bottom: 10px;
  color: #a395c7;
  font-size: medium;
}

.level-acceptable_values {
  font-size: smaller;
  color: #ffffff;
}

@media (max-width: 1025px) {
  .game-container {
    flex-direction: column-reverse;
    align-items: center;
  }

  .level-text {
    margin-top: 30px;
  }
}

.back-button {
  margin-bottom: 10px;
  cursor: pointer;
}
</style>