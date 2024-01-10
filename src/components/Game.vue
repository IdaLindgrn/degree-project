<script setup lang="ts">
import { ref, onMounted, computed, watch, reactive } from 'vue';

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


const isLevelCompleted = ref(false);
const props = defineProps(['level', 'levelId', 'sharedStyles', 'isLevelCompleted', 'updateFunction' ]);
const emit = defineEmits();

const sharedStyles = ref({ customStyle: reactive({}) });
// const currentLevel = ref<LevelData | null>(null);


// interface LevelData {
//   cats: any[];
//   boxes: any[];
//   styles: { customStyle: { [key: string]: string } };
//   levelCatStyling?: { [key: string]: string };
//   levelBoxStyling?: { [key: string]: string }[];
//   completedStyling: { [key: string]: string };
// }


// const levelData: Record<string, LevelData> = {
//   1: {
//     cats: [BlackCat],
//     boxes: [OrangeBox],
//     styles: {
//       customStyle: {},
//     },
//     levelCatStyling: { top: '10px', left: '5px' },
//     levelBoxStyling: [{ top: '85px', right: '25px' }],
//     completedStyling: { justifyContent: 'flex-end' },
//   },
//   2: {
//     cats: [BlackCat, OrangeCat, GrayCat],
//     boxes: [OrangeBox, GreenBox, BlueBox],
//     styles: {
//       customStyle: {},
//     },
//     levelCatStyling: { top: '10px', left: '5px' },
//     levelBoxStyling: [
//       { bottom: '30px', left: '20px' }, 
//       { bottom: '30px', left: '110px' }, 
//       { bottom: '30px', left: '200px' }
//     ], 
//     completedStyling: { 'align-items': 'flex-end' },
//   },
//   3: {
//     cats: [GrayCat, OrangeCat, BlackCat],
//     boxes: [OrangeBox, GreenBox, BlueBox],
//     styles: {
//       customStyle: {},
//     },
//     levelCatStyling: { top: '10px', left: '5px' },
//     levelBoxStyling: [
//       { bottom: '30px', right: '200px' }, 
//       { bottom: '30px', right: '110px' }, 
//       { bottom: '30px', right: '20px' }
//     ], 
//     completedStyling: { 'flex-direction': 'row-reverse', 'align-items': 'flex-end' },
//   },
//   4: {
//     cats: [BlackCat, BlackCat, OrangeCat, BlackCat, BlackCat],
//     boxes: [OrangeBox, OrangeBox, GreenBox, OrangeBox, OrangeBox],
//     styles: {
//       customStyle: {},
//     },
//     levelCatStyling: { top: '50px', left: '50px' },
//     levelBoxStyling: [
//       { top: '85px', left: '10px' }, 
//       { top: '85px', left: '100px' }, 
//       { bottom: '30px', right:'140px' },
//       { top: '85px', right: '100px' },
//       { top: '85px', right: '10px' },
//     ], 
//     completedStyling: { 'align-self': 'flex-end' },
//   },
//   5: {
//     cats: [BlackCat, OrangeCat, GrayCat],
//     boxes: [OrangeBox, BlueBox, GreenBox],
//     styles: {
//       customStyle: {},
//     },
//     levelCatStyling: { top: '15px', left: '10px' },
//     levelBoxStyling: [
//       { top: '85px', left: '25px' }, 
//       { top: '85px', left: '105px' }, 
//       { top: '85px', left: '180px' },
//     ], 
//     completedStyling: { order: '1' },
//   },
//   6: {
//     cats: [GrayCat, BlackCat, BlackCat, BlackCat, OrangeCat],
//     boxes: [BlueBox, OrangeBox, OrangeBox, OrangeBox, GreenBox],
//     styles: {
//       customStyle: {},
//     },
//     levelCatStyling: { top: '15px', left: '-18px' },
//     levelBoxStyling: [
//       { top: '85px', left: '1px' }, 
//       { top: '85px', left: '75px' }, 
//       { top: '85px', left: '150px' },
//       { bottom: '30px', left: '10px' },
//       { bottom: '30px', left: '95px' },
//     ], 
//         completedStyling: { 'flex-wrap': 'wrap' },
//   },
// };

const getContainerStyles = computed(() => {
  const level = props.level?.value || props.level;
  console.log('Level Data:', level);
  console.log('Cats:', level?.cats);
  console.log('Boxes:', level?.boxes);
  
  if (props.level && props.level.styles && props.level.styles.customStyle) {
    const { styles } = props.level;
    return {
      ...styles,
      ...styles.customStyle,
    };
  }
  return {};
});


// const updateStylesAndCheckCompletion = (newStyles?: { customStyle?: { [key: string]: string } }) => {
//   console.log('Styles received in Game.vue:', newStyles);
//   const levelId = props.levelId;
//   currentLevel.value = levelData[levelId];

//   currentLevel.value.styles.customStyle = {
//     ...(currentLevel.value.styles.customStyle || {}),
//     ...(newStyles?.customStyle || {}),
//   };

//   // Check completion
//   if (currentLevel.value && currentLevel.value.completedStyling) {
//     const catPosition = currentLevel.value.levelCatStyling;

//     if (catPosition) {
//       const completionStyling = currentLevel.value.completedStyling;
//       let isLevelCompleted = true;

//       for (const [property, value] of Object.entries(completionStyling)) {
//         const catPropertyValue = catPosition[property];
//         const completionThreshold = 10;

//         if (!catPropertyValue || Math.abs(parseInt(catPropertyValue) - parseInt(value)) >= completionThreshold) {
//           isLevelCompleted = false;
//           console.log('Level not completed');
//           break;
//         }
//       }

      // If the level is completed, emit an event
//       if (isLevelCompleted) {
//         console.log('Level completed');
//         emit('levelCompletedChanged', true);
//       }
//     }
//   }

//   emit('updateStyles', { customStyle: getContainerStyles.value });
// };

// onMounted(() => {
//   updateStylesAndCheckCompletion();
// });

// watch(() => props.levelId, (newLevelId, oldLevelId) => {
//   if (newLevelId !== oldLevelId) {
//     updateStylesAndCheckCompletion();
//   }
// });

// watch(() => isLevelCompleted.value, (newValue) => {
//   console.log('isLevelCompleted changed in Game.vue:', newValue);
//   emit('levelCompletedChanged', newValue);
// });

// watch(() => sharedStyles.value.customStyle, (newStyles) => {
//   console.log('hjälp')
//   updateStylesAndCheckCompletion({ customStyle: newStyles });
// });

</script>

<template>
   <div :key="Object.keys(getContainerStyles).join('')" class="container" :style="getContainerStyles">
    <div v-for="(cat, index) in props.level?.cats" :key="index">
    <img  class='cat' :src="cat" :style="{ ...props.level?.levelCatStyling }" alt="Level cat" />
    </div>
    <div v-for="(box, index) in props.level?.boxes" :key="index">
    <img class='box' :src="box" :style="{...props.level?.levelBoxStyling && props.level?.levelBoxStyling[index] }" alt="Level box">
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

// const updateStyles = (newStyles?: { customStyle?: { [key: string]: string } }) => {
  //   console.log('Styles received in Game.vue:');
  //   console.log('Styles received in Game.vue:', newStyles);
  //   const levelId = props.levelId;
  //   currentLevel.value = levelData[levelId];
  
  //   if (newStyles && newStyles.customStyle) {
  //     currentLevel.value.styles.customStyle = newStyles.customStyle;
  //     console.log('Styles updated in Game.vue:', newStyles.customStyle);
  //   }
  //   emit('updateStyles', { customStyle: getContainerStyles.value });
  // };
  
  // onMounted(() => {
  //     updateStyles();
  // });
  
  
  // watch(() => props.levelId, (newLevelId, oldLevelId) => {
  //   if (newLevelId !== oldLevelId) {
  //     updateStyles();
  //   }
  // });
  
  
  // //Level completion
  
  // const isLevelCompleted = ref(false);
  
  // const checkCompletion = () => {
  //   if (currentLevel.value && currentLevel.value.completedStyling) {
  //     const catPosition = currentLevel.value.levelCatStyling;
  
  //     if (catPosition) {
  //       const completionStyling = currentLevel.value.completedStyling;
  //       let isLevelCompleted = true;
  
  //       for (const [property, value] of Object.entries(completionStyling)) {
  //         const catPropertyValue = catPosition[property];
  //         const completionThreshold = 10;
  
  //         if (!catPropertyValue || Math.abs(parseInt(catPropertyValue) - parseInt(value)) >= completionThreshold) {
  //           isLevelCompleted = false;
  //           console.log('Level not completed');
  //           break;
  //         }
  //       }
  //       if (isLevelCompleted) {
  //         console.log('Level completed');
  //         emit('levelCompletedChanged', true);
  //       }
  //     }
  //   }
  // };
  
  
  // watch(() => currentLevel.value?.levelCatStyling, checkCompletion);
  
  // // listen for a input from the textarea
  // // watch(() => sharedStyles.value.customStyle, (newStyles) => {
  // //   updateStyles(newStyles);
  // //   checkCompletion(); 
  // // });
  
  // watch(() => isLevelCompleted.value, (newValue) => {
  //   console.log('isLevelCompleted changed in Game.vue:', newValue);
  //   emit('levelCompletedChanged', newValue);
  // });
  