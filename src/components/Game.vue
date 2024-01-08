<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';

// images
import BlackCat from '@/assets/BlackCat.png';
import OrangeBox from '@/assets/OrangeBox.png';
import BlackCatInBox from '@/assets/BlackCatInBox.png';

import OrangeCat from '@/assets/OrangeCat.png';
import GreenBox from '@/assets/GreenBox.png';
import OrangeCatInBox from '@/assets/OrangeCatInBox.png';

import GrayCat from '@/assets/GrayCat.png';
import BlueBox from '@/assets/BlueBox.png';
import GrayCatInBox from '@/assets/GrayCatInBox.png';
import { faLineChart } from '@fortawesome/free-solid-svg-icons';

const props = defineProps(['level', 'levelId', 'sharedStyles']);
const emit = defineEmits();

interface LevelData {
  cats: any[];
  boxes: any[];
  styles: { customStyle?: { [key: string]: string } };
  levelCatStyling?: { [key: string]: string };
  levelBoxStyling?: { [key: string]: string }[];
  completedStyling?: { [key: string]: string };
}

const currentLevel = ref<LevelData | null>(null);

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

const getContainerStyles = computed(() => {
  if (currentLevel.value) {
    const { styles } = currentLevel.value;
    return {
      ...styles,
      ...styles.customStyle,
    };
  }
  return {};
});

const updateStyles = (newStyles?: { customStyle?: { [key: string]: string } }) => {
  const levelId = props.levelId;
  currentLevel.value = levelData[levelId];

  if (newStyles && newStyles.customStyle) {
    currentLevel.value.styles.customStyle = newStyles.customStyle;
  }
  emit('updateStyles', getContainerStyles.value);
};

onMounted(() => {
    updateStyles();
});

// watch(() => props.sharedStyles.customStyle, (newStyles) => {
//   console.log('Received updated styles in Game.vue:', newStyles);
//   updateStyles(newStyles);
// });

watch(() => props.levelId, (newLevelId, oldLevelId) => {
  if (newLevelId !== oldLevelId) {
    updateStyles();
  }
});



//Level completion
const checkCompletion = () => {
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
          break;
        }
      }

      if (isLevelCompleted) {
        console.log('Level Completed!');
      }
    }
  }
};

watch(() => currentLevel.value?.levelCatStyling, checkCompletion);





const isLevelCompleted = ref(false);

</script>

<template>
   <div :key="Object.keys(getContainerStyles).join('')" class="container" :style="getContainerStyles">
    <div v-for="(cat, index) in currentLevel?.cats" :key="index">
    <img  class='cat' :src="cat" :style="{ ...currentLevel?.levelCatStyling }" alt="Level cat" />
    </div>
    <div v-for="(box, index) in currentLevel?.boxes" :key="index">
    <img class='box' :src="box" :style="{...currentLevel?.levelBoxStyling && currentLevel?.levelBoxStyling[index] }" alt="Level box">
  </div>
  </div>
</template>

<style scoped>
.container {
  background-color: rgb(78, 73, 109);
  width: 80vh;
  height: 80vh;
  padding: 20px;
  position: relative;
  display: flex;
}

.cat {
  width: 105px;
  height: 170px;
  position: relative;
}

.box {  
  width: 110px;
  height: 65px;
  position: absolute;
}

@media (max-width: 1025px) {
  .container {
    width: 70vw;
    height: 70vw;
  }
  .cat {
  width: 90px;
  height: 145px;
}

.box {
  width: 80px;
  height: 50px;
}
}

@media (max-width: 700px) {
  .cat {
  width: 43px;
  height: 70px;
}

.box {
  width: 47px;
  height: 25px;
}
}
</style>