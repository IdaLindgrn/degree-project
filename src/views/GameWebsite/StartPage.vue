

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const startGame = () => {
  router.push('/levels');
}

</script>

<template>
   <div class="banner-container">
    <div class="background-image"></div>

    <div class="centered-text">
      <h1>Your Centered Text</h1>
    </div>

    <div class="start-game-button" @click="startGame">
      <img src="../../assets/startgamebutton.png" alt="Start Game Button" width="300">
    </div>

   </div>
 
</template>

<style scoped>
.banner-container {
  position: relative;
}

.background-image {
  background-image: url('../../assets/CityBanner.png');
  background-size: cover;
  height: 700px;
}

.centered-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #fff; /* Set the color of the text */
}

.start-game-button {
  position: absolute;
  bottom: 40px; 
  left: 50%;
  transform: translateX(-50%);
}
</style>
