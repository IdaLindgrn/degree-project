<script setup lang="ts">
import { ref, onMounted } from 'vue';

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
const currentLevel = ref<{ cat: any; box: any;  styles: { backgroundColor: string } } | null>(null);

const levelData: Record<string, { cat: any; box: any; styles: { backgroundColor: string } }> = {
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


onMounted(() => {
    const levelId = props.levelId;
    currentLevel.value = levelData[levelId];
});

</script>

<template>
   <div class="container" :style="currentLevel?.styles">
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
}

.cat {
  width: 100px;
  height: 160px;
  object-fit: cover;
}

.box {
  width: 100px;
  height: 60px;
  object-fit: cover;
  margin-bottom: 25px;
}

@media (max-width: 768px) {
  .container {
    width: 70vh;
  height: 70vh;
  }
  .cat {
  width: 70px;
  height: 120px;
  object-fit: cover;
}

.box {
  width: 80px;
  height: 50px;
  object-fit: cover;
  margin-bottom: 20px;
}
}
</style>