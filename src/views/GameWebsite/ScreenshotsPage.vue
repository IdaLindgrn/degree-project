<template>
    <div>
      <Header/>
      <div class="content-container">
        <h1 class="text-screenshots">Screenshots</h1>
        <div class="image-container">
          <img class="image" src="../../assets/screenshots.png" alt="Screenshot">
        </div>
      </div>
    </div>
  </template>
  
  <style scoped lang="scss">
  @import '@/style/main';
  .content-container {
    padding: 30px;
    text-align: center;
    color: $primaryFontColor;
  }

  .text-screenshots {
    padding-bottom: 20px;
  }
  
  .image {
    max-width: 70vw; 
    margin: 0 auto;
  }
  </style>
  
  <script setup lang="ts">
  import Header from '../../components/Header.vue';
  </script>
  