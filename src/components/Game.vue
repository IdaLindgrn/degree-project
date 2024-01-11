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

<template>
   <div :key="Object.keys(getContainerStyles).join('')" class="container" :style="getContainerStyles" ref="containerRef">
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

<style scoped>
.container {
  background-color: rgb(78, 73, 109);
  width: 80vh;
  height: 80vh;
  padding: 20px;
  position: relative;
  display: flex;
}

.catInBox {
  width: 105px;
  height: 170px;
  position: relative;
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

.catInBox {
  width: 90px;
  height: 145px;
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

  .catInBox {
  width: 43px;
  height: 70px;
}
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