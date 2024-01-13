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
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: white;
  padding: 80px;
  border-radius: 8px;
  max-width: 400px;
  text-align: center;
}

button {
  margin-top: 20px;
  padding: 10px;
  background-color: #694971;
  color: white;
  border: none;
  cursor: pointer;
}

</style>
