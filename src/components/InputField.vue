<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps(['isLevelCompleted']);
//  'sharedStyles',
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
  if (props.isLevelCompleted) {
    emit('requestNextLevel');
  } else {
    console.log('Level not completed yet');
  }
};
</script>

<template>
  <div class="field">
    <div class="input-container">
      <div class="line-numbers">
        <div v-for="i in 10" :key="i" class="line-number">{{ i }}</div>
      </div>
      <div class="input">
        <p>#alley {</p>
        <p>display: flex;</p>
      <textarea id="catStyleInput" v-model="inputStyleText" @input="convertInputToCustomStyle"></textarea>
      <p>}</p>
    </div>
    <button :style="{ backgroundColor: !props.isLevelCompleted ? 'gray' : '' }" @click="goToNextLevel" class="next-level-button">Next Level</button>
    </div>
    
  </div>
</template>

<style scoped>
.field {
  margin: 2vw;
  background-color: rgb(189, 185, 213);
  display: flex;
  flex-direction: column;
  width: 40vw;
  position: relative;
}

p {
  padding-left: 15px;
  color:  #694971;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: smaller;
  padding-bottom: 10px;
  font-weight: bold;
}

.input-container {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  position: relative;
}

.line-numbers {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 12px;
  padding-top: 20px;
  gap: 13px;
  background-color: #87718d;
}

.input {
   padding-bottom: 13px;
}

.line-number {
  color: rgb(189, 185, 213);
  font-size: 0.8rem;
}

#catStyleInput {
  margin-left: 10px;
  padding-left: 5px;
  flex-grow: 1;
  border: none;
  outline: none;
  color: #694971;
}

.next-level-button {
  margin: 10px;
  padding: 10px;
  background-color: #694971;
  border-radius: 10px;
  color: white;
  border: none;
  cursor: pointer;
  position: absolute;
  bottom: 20px;
  right: 20px; 
}

@media (max-width: 1025px) {
  .field {
    width: 85vw;
  }
}
</style>