<template>
  <div class="modal-background">
    <div class="modal-content">
      <p>Congratulations! You have completed the game.</p>
      <button @click="goToHome">Go to Home</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goToHome = () => {
  router.push('/');
};

</script>


<style scoped lang="scss">
@import '@/style/main';
.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $primaryTransparentColor;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: $primaryFontColor;
  padding: 80px;
  border-radius: 8px;
  max-width: 400px;
  text-align: center;
}

button {
  margin-top: 20px;
  padding: 10px;
  background-color: $primaryButtonColor;
  color: $primaryFontColor;
  border: none;
  cursor: pointer;
}

</style>
