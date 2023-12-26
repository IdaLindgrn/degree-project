<script setup lang="ts">
import { ref, onMounted } from 'vue';
import supabase from '../../config/supabaseClient';
// console.log(supabase)


const fetchError = ref<string | null>(null);
const users = ref<any[] | null>(null);

    onMounted(async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select();

        if (error) {
          fetchError.value = 'Could not fetch the users';
          users.value = null;
          console.error(error);
        }

        if (data) {
          users.value = data;
          fetchError.value = null;
        }
      } catch (error) {
        console.error(error);
      }
    });

</script>

<template>
     <div v-if="fetchError">{{ fetchError }}</div>
    <div v-else-if="users">
      <div v-for="user in users" :key="user.id">
        <!-- <img src="hej" alt="Profile picture"> -->
    <p>{{ user.username }}</p>
      </div>
    </div>
    <div v-else>Loading users...</div>
</template>

<style scoped>
</style>
