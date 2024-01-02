<script setup lang="ts">
import { ref, onMounted } from 'vue';
import supabase from '../../config/supabaseClient';
import { useRoute } from 'vue-router';

const level = ref<any | null>(null);
const route = useRoute();

const fetchLevel = async () => {
  try {
    const levelId = route.params.levelId;
    const { data, error } = await supabase.from('levels').select().eq('id', levelId).single();
    if (error) {
      throw error;
    }
    level.value = data;
  } catch (error: any) {
    console.error('Error fetching level:', error.message);
  }
};

onMounted(() => {
  fetchLevel();
});
</script>

<template>
  <div>
    <h1>Gameboard</h1>
    <div class="level-container">
      <p>{{ level?.title }}</p>
      <p>{{ level?.description }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>