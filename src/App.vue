<script setup lang="ts">
import Header from './components/Header.vue';
</script>

<template>
  <div>
  <Header></Header>
  <router-view></router-view>
  </div>

</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Jua', sans-serif;
}
</style>
