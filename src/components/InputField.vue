<script setup lang="ts">
import { ref } from 'vue';

const catStyle = ref<string>('');
</script>

<template>
  <div class="field">
    <div class="input-container">
      <div class="line-numbers">
        <div v-for="i in 10" :key="i" class="line-number">{{ i }}</div>
      </div>
      <label for="catStyleInput">#alley {</label>
      <input id="catStyleInput" v-model="catStyle" />
    </div>
  </div>
</template>

<style scoped>
.field {
  background-color: rgb(189, 185, 213);
  display: flex;
  flex-direction: column;
}

label {
  color: white;
  font-weight: bold;
}

.input-container {
  display: flex;
  align-items: baseline;
}

.line-numbers {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 12px;
  gap: 13px;
  background-color: #87718d;
}

.line-number {
  color: rgb(189, 185, 213);
  font-size: 0.8rem;
}

#catStyleInput {
  flex-grow: 1;
  border: none;
  outline: none;
  color: white;
}

/* Styling for the "outside the input" part */
#alley {
  margin-left: 10px; /* Adjust as needed */
  color: white;
  font-family: monospace;
}
</style>
