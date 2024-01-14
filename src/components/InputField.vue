<template>
  <div class="field">
    <div class="input-container">
      <div class="line-numbers">
        <div v-for="i in 10" :key="i" class="line-number">{{ i }}</div>
      </div>
      <div class="input">
        <p class="input-ground">#alley {</p>
        <p class="input-ground">display: flex;</p>
        <textarea id="catStyleInput" v-model="inputStyleText" @input="convertInputToCustomStyle"></textarea>
        <p>}</p>
      </div>
    </div>
    <button
      :style="{ backgroundColor: !props.isLevelCompleted ? '#5e5e5f' : '' }"
      @click="goToNextLevel"
      class="next-level-button"
    >
      Next Level
    </button>
  </div>
</template>


<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

const props = defineProps(['isLevelCompleted', 'levelId', 'sharedStyles']);
const emit = defineEmits();

const inputStyleText = ref('');

watch(() => props.isLevelCompleted, (newValue) => {
  console.log('isLevelCompleted in InputField.vue:', newValue);
});

const convertInputToCustomStyle = () => {
  const userInput = inputStyleText.value;
  try {
    const customStyle = JSON.parse(`{ ${userInput} }`);
    emit('updateCustomStyles', { customStyle });
  } catch (error) {
    const keyValuePairs = userInput.split(';')
      .map(pair => pair.trim())
      .filter(pair => pair.length > 0)
      .map(pair => {
        const [property, value] = pair.split(':').map(part => part.trim());
        return { [property]: value };
      });
      const customStyle = Object.assign({}, ...keyValuePairs);
      emit('updateCustomStyles', { customStyle });
  }
};

const goToNextLevel = () => {
  inputStyleText.value = '';
  if (props.isLevelCompleted) {
    emit('requestNextLevel');
  } else {
    console.log('Level not completed yet');
  }
};
</script>

<style scoped lang="scss">
@import '@/style/main';

.field {
  margin-top: 20px;
  background-color: $secondaryFontColor;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  margin-left: -30px;
  width: 80%;
  position: relative;
}

p {
  padding-left: 15px;
  color:  $primaryColor;
  font-family: $secondaryFontFamily;
  font-size: medium;
  font-weight: bold;
  padding-bottom: 7px;
}

.input-container {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  position: relative;
}

.line-numbers {
  border-bottom-left-radius: 12px;
  border-top-left-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 12px;
  padding-top: 20px;
  gap: 10px;
  background-color: #53417f;
}

.input {
   padding-bottom: 13px;
}

#catStyleInput {
  margin-left: 10px;
  padding-left: 5px;
  height: 25px;
  flex-grow: 1;
  border: none;
  outline: none;
  color: $primaryColor;
  resize: none; 
  background-color: $primaryFontColor;
}

.line-number {
  color: $secondaryColor;
  font-size: 0.8rem;
  font-weight: bold;
}

.next-level-button {
  margin: 10px;
  padding: 10px;
  background: $primaryButtonColor;
  border-radius: 10px;
  color: $primaryFontColor;
  border: none;
  cursor: pointer;
  position: absolute;
  bottom: 20px;
  right: 20px; 
}

@include tablet-large {
  .field {
    margin-left: 1.5%;
    width: 100%;
  }
}
</style>