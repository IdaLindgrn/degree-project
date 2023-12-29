<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import supabase from '../../config/supabaseClient';


const fetchError = ref<string | null>(null);
const users = ref<any[] | null>(null);
const authUser = ref<string | null>(JSON.parse(localStorage.getItem('authUser') || 'null'));
const isLoggedIn = ref<boolean>(false);

const handleLoginStatusChange = () => {
  const session = supabase.auth.getSession();
  console.log('Session:', session)
  isLoggedIn.value = session !== null;

  if (isLoggedIn.value) {
    fetchUserData();
  }
};

const fetchUserData = async () => {
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
};

onMounted(() => {
  handleLoginStatusChange(); 
  window.addEventListener('storage', handleLoginStatusChange);
});
  

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
          const { error: authError } = await supabase.auth.getUser();
    if (authError) {
      console.error(authError);
    }

      
  } catch (error) {
    console.error(error);
  }
    });

    const loggedInUser = computed(() => {
  return authUser.value ? users.value?.[0] : null;
});

</script>

<template>
  <div>
     <div v-if="fetchError">{{ fetchError }}</div>

    <div v-else-if="isLoggedIn && loggedInUser">
      <div v-for="user in loggedInUser" :key="user.id">
        <p>{{ user.username }}</p>
      </div>
    </div>

    <div v-else>
      <router-link to="/profile">Profile</router-link>
    </div>
  </div>
</template>

<style scoped>
</style>
