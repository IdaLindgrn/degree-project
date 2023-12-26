
<script setup lang="ts">
import { ref } from 'vue';
import supabase from '../../config/supabaseClient';

const email = ref('');
const username = ref('');
const password = ref('');
const profilePicture = ref('');

const registerUser = async () => {
  try {
    const { user, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });

    if (error) {
      console.error(error.message);
    } else {
      // User is registered, add additional information to the user table
      await supabase
        .from('users')
        .upsert([
          {
            id: user?.id,
            email: email.value,
            username: username.value,
            profile_picture: profilePicture.value,
          },
        ]);

      // You can redirect to another page or show a success message
    }
  } catch (error) {
    console.error(error.message);
  }
};
</script>


<!-- RegistrationForm.vue -->
<template>
    <form @submit.prevent="registerUser">
      <label>Email:</label>
      <input v-model="email" type="email" required />
  
      <label>Username:</label>
      <input v-model="username" type="text" required />
  
      <label>Password:</label>
      <input v-model="password" type="password" required />
  
      <label>Profile Picture URL:</label>
      <input v-model="profilePicture" type="url" />
  
      <button type="submit">Register</button>
    </form>
  </template>
  
  <style scoped>
  /* Your styles here */
  </style>
  
