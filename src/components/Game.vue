<template>
  <div :key="Object.keys(getContainerStyles).join('')" class="container" :style="getContainerStyles" ref="containerRef">
   <img src="../assets/BoneFish.png" class="bone-fish" alt="Bonefish">
   <template v-if="!props.isLevelCompleted">
     <div v-for="(cat, index) in props.level?.cats" :key="index">
   <img  class='cat' :src="cat" :style="{ ...props.level?.levelCatStyling }" alt="Level cat" />
   </div>
   <div v-for="(box, index) in props.level?.boxes" :key="index">
   <img class='box' :src="box" :style="{...props.level?.levelBoxStyling && props.level?.levelBoxStyling[index] }" alt="Level box">
 </div>
   </template>
   <template v-else>
   <div v-for="(catInBox, index) in props.level?.catsInBoxes" :key="index">
   <img  class='catInBox' :src="catInBox" :style="{ ...props.level?.levelCatStyling }" alt="Level cat in" />
   </div>
 </template>
 </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';

const props = defineProps(['level', 'levelId', 'sharedStyles', 'isLevelCompleted', 'updateFunction' ]);
const emit = defineEmits();
const containerRef = ref(null);

const getContainerStyles = computed(() => {
  const level = props.level?.value || props.level;
  if (props.level && props.level.styles && props.level.styles.customStyle) {
    const { styles } = props.level;
    return {
      ...styles,
      ...styles.customStyle,
      ...props.sharedStyles.customStyle.value,
    };
  }
  return {};
});

onMounted(() => {
  emit('containerRef', containerRef.value);
});

watch(() => props.isLevelCompleted, (newValue) => {
  console.log('isLevelCompleted in InputField.vue:', newValue);
});


</script>


<style scoped>
.container {
  background-color: #585478;
  border-radius: 10px;
  width: 80vh;
  height: 80vh;
  padding: 20px;
  position: relative;
  display: flex;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5), inset 0 0 40px rgba(47, 46, 55, 0.638);
}

.bone-fish {
  width: 50px;
  height: 35px;
  position: absolute;
  right: 150px;
  bottom: 140px;
}

.catInBox {
  width: 90px;
  height: 130px;
  position: relative;
}

.cat {
  width: 80px;
  height: 130px;
  position: relative;
}

.box {  
  width: 90px;
  height: 56px;
  position: absolute;
}

@media (max-width: 1025px) {
  .container {
    width: 70vw;
    height: 70vw;
  }

.catInBox {
  width: 120px;
  height: 170px;
}
  .cat {
  width: 105px;
  height: 170px;
}

.box {
  width: 120px;
  height: 75px;
}
}

@media (max-width: 700px) {

  .catInBox {
  width: 105px;
  height: 150px;
}
  .cat {
  width: 95px;
  height: 155px;
}

.box {
  width: 110px;
  height: 65px;
}
}
</style>