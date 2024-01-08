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
  styles: { backgroundColor: string; customStyle?: { [key: string]: string } };
  levelCatStyling?: { [key: string]: string };
  levelBoxStyling?: { [key: string]: string };
}

const currentLevel = ref<LevelData | null>(null);

const levelData: Record<string, LevelData> = {
  1: {
    cats: [BlackCat],
    boxes: [OrangeBox],
    styles: {
      backgroundColor: 'rgb(78, 73, 109)',
    },
    levelCatStyling: { top: '13px', left: '10px' },
    levelBoxStyling: { top: '80px', left: '270px' },
  },
  2: {
    cats: [BlackCat, OrangeCat, GrayCat],
    boxes: [OrangeBox, GreenBox, BlueBox],
    styles: {
      backgroundColor: 'rgb(10, 100, 60)',
    },
    levelCatStyling: { top: '10px', left: '5px' },
    levelBoxStyling: { top: '300px', left: '20px' }, 

  },
  3: {
    cats: [GrayCat, OrangeCat, BlackCat],
    boxes: [OrangeBox, GreenBox, BlueBox],
    styles: {
      backgroundColor: 'rgb(10, 100, 100)',
    },
    levelCatStyling: { top: '50px', left: '50px' },
    levelBoxStyling: { top: '100px', left: '100px' },

  },
  4: {
    cats: [BlackCat, BlackCat, OrangeCat, BlackCat, BlackCat],
    boxes: [OrangeBox, OrangeBox, GreenBox, OrangeBox, OrangeBox],
    styles: {
      backgroundColor: 'rgb(78, 73, 109)',
    },
    levelCatStyling: { top: '50px', left: '50px' },
    levelBoxStyling: { top: '100px', left: '100px' },

  },
  5: {
    cats: [BlackCat, OrangeCat, GrayCat],
    boxes: [OrangeBox, BlueBox, GreenBox],
    styles: {
      backgroundColor: 'rgb(10, 100, 60)',
    },
    levelCatStyling: { top: '50px', left: '50px' },
    levelBoxStyling: { top: '100px', left: '100px' },

  },
  6: {
    cats: [GrayCat, BlackCat, BlackCat, BlackCat, OrangeCat],
    boxes: [BlueBox, OrangeBox, OrangeBox, OrangeBox, GreenBox],
    styles: {
      backgroundColor: 'rgb(10, 100, 100)',
    },
    levelCatStyling: { top: '50px', left: '50px' },
    levelBoxStyling: { top: '100px', left: '100px' },
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

watch(() => props.sharedStyles.customStyle, (newStyles) => {
  console.log('Received updated styles in Game.vue:', newStyles);
  updateStyles(newStyles);
});

</script>

<template>
   <div :key="Object.keys(getContainerStyles).join('')" class="container" :style="getContainerStyles">
    <div v-for="(cat, index) in currentLevel?.cats" :key="index">
    <img  class='cat' :src="cat" :style="{ ...currentLevel?.levelCatStyling }" alt="Level cat" />
    </div>
    <div v-for="(box, index) in currentLevel?.boxes" :key="index">
    <img class='box' :src="box" :style="{ ...currentLevel?.levelBoxStyling }" alt="Level box">
  </div>
  </div>
</template>

<style scoped>
.container {
  background-color: rgb(78, 73, 109);
  width: 90vh;
  height: 90vh;
  padding: 20px;
  position: relative;
  display: flex;
}

.cat {
  width: 82px;
  height: 134px;
  object-fit: cover;
  position: relative;
}

.box {  
  width: 100px;
  height: 60px;
  object-fit: cover;
  position: absolute;
  top: 70px; 
  right: 15px; 
}

@media (max-width: 768px) {
  .container {
    width: 70vh;
    height: 70vh;
  }
  .cat {
  width: 70px;
  height: 120px;
}

.box {
  width: 84px;
  height: 50px;
}
}
</style>