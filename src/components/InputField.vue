<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps(['sharedStyles']);
const emit = defineEmits();

const inputStyleText = ref('');

const handleInput = () => { 
  const styles = parseStyles(inputStyleText.value);  
  props.sharedStyles.customStyle = styles;
  emit('inputChange', styles);
};

interface Styles {
  [key: string]: string;
}

const parseStyles = (stylesString: string): Styles => {
  const styles: Styles = {};
  const stylesArray = stylesString.split(';');
  stylesArray.forEach((style) => {
    const [property, value] = style.split(':').map((s) => s.trim());
    if (property && value) {
      styles[property] = value;
    }
  });
  return styles;
};

const goToNextLevel = () => {
  emit('goToNextLevel');
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
      <textarea id="catStyleInput" v-model="inputStyleText" @input="handleInput"></textarea>
    </div>
    <button @click="goToNextLevel" class="next-level-button">Next Level</button>
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
