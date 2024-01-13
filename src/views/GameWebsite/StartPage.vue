<template>
  <Header></Header>
   <div class="banner-container">
    <div class="background-image"></div>
    <div class="start-game-button" @click="startGame">
      <img class="start-game-image" src="../../assets/start-game-button.png" alt="Start game button">
    </div>
   </div>
   <div class="current-version">
    <div>
    <img class="version-image" src="../../assets/oval-city.png" alt="Smaller oval shaped city banner">
  </div>
    <div class="version-text">
    <h1>Key Features</h1>
    <p>Version 0.01 (14.01.2024)</p>
    <br>
    <p>- Beta Release</p>
    <p>- 6 unique levels</p>
  </div>
   </div>
   <div >
    <img class="game-screens-image" src="../../assets/meet-the-cats.png" alt="Picture of the games cats">
   </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import Header from '../../components/Header.vue'

const router = useRouter();

const startGame = () => {
  router.push('/levels');
}

</script>

<style scoped>
.banner-container {
  position: relative;
}

.background-image {
  background-image: url('../../assets/city-banner.png');
  background-size: cover;
  height: 50vw;
}

.start-game-button {
  position: absolute;
  bottom: 40px; 
  left: 50%;
  transform: translateX(-50%);
}

.start-game-image {
  max-width: 25vw;
}
.current-version {
  background-color: #423162;
  height: 50vw;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10vw;
}

.version-image {
  max-width: 25vw;
}

.game-screens-image {
  max-width: 100%;
}

.version-text {
  color: #FFF1A7;
  font-size: larger;
}

@media (max-width: 700px) {
  .version-text {
    font-size: smaller;
  }
}

@media (max-width: 530px) {
  .version-text {
    font-size:x-small;
  }
}
</style>
