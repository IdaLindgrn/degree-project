<template>
  <div class="tutorial-container">
    <Header/>
    <div class="tutorial-text">
    <h1>Tutorial</h1>
    <div class="instructions">
      <p>Move the cats to their boxes using Flexbox!</p>
    </div>
   </div>
  </div>
</template>

<style scoped lang="scss">
  @import '@/style/main';
.tutorial-container {
  text-align: center;
}

.tutorial-text {
  padding: 30px;
  color: $primaryFontColor;
}

.instructions {
  max-width: 600px;
  margin: 0 auto;
}

</style>

<script setup lang="ts">
import Header from '../../components/Header.vue';
</script>
