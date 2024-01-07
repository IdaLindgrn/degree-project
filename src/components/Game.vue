<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

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

const props = defineProps(['level', 'levelId']);
const emit = defineEmits();

const currentLevel = ref<{ cat: any; box: any;  styles: { backgroundColor: string; customStyle?: string } } | null>({
  cat: null,
  box: null,
  styles: {
    backgroundColor: '',
    customStyle: '',
  },
});

const levelData: Record<string, { cat: any; box: any; styles: { backgroundColor: string; customStyle?: string } }> = {
  1: {
    cat: BlackCat,
    box: OrangeBox,
    styles: {
      backgroundColor: 'rgb(78, 73, 109)',
    },
  },
  2: {
    cat: OrangeCat,
    box: GreenBox,
    styles: {
      backgroundColor: 'rgb(10, 100, 60)',
    },
  },
  3: {
    cat: GrayCat,
    box: BlueBox,
    styles: {
      backgroundColor: 'rgb(10, 100, 100)',
    },
  },
  4: {
    cat: BlackCat,
    box: OrangeBox,
    styles: {
      backgroundColor: 'rgb(78, 73, 109)',
    },
  },
  5: {
    cat: OrangeCat,
    box: GreenBox,
    styles: {
      backgroundColor: 'rgb(10, 100, 60)',
    },
  },
  6: {
    cat: GrayCat,
    box: BlueBox,
    styles: {
      backgroundColor: 'rgb(10, 100, 100)',
    },
  },
};

const getContainerStyles = computed(() => {
  if (currentLevel.value) {
    const { styles } = currentLevel.value;
    return {
      ...styles,
      ...(styles.customStyle ? JSON.parse(styles.customStyle) : {}),
    };
  }
  return {};
});

const updateStyles = (newStyles?: any) => {
  const levelId = props.levelId;
  currentLevel.value = levelData[levelId];
  currentLevel.value.styles = { 
    ...currentLevel.value.styles, 
    ...newStyles,
  };
  emit('updateStyles', currentLevel.value.styles);
};

onMounted(() => {
    updateStyles();
});
</script>

<template>
   <div class="container" :style="getContainerStyles">
    <img  class='cat' :src="currentLevel?.cat" alt="Level cat" />
    <img class='box' :src="currentLevel?.box" alt="Level box">
  </div>
</template>

<style scoped>
.container {
  width: 90vh;
  height: 90vh;
  background-color: rgb(78, 73, 109);
  padding: 20px;
  position: relative;
  display: flex;
}

.cat {
  width: 82px;
  height: 134px;
  object-fit: cover;
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