
<script setup lang="ts">
import { ref } from 'vue';
import supabase from '../../config/supabaseClient';

const email = ref('');
const username = ref('');
const password = ref('');
const profilePicture = ref('');

const registerUser = async () => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });

    if (error) {
      console.error('Sign-up error:', error.message);
    } else {
      console.log('User signed up:', data);
      await supabase
        .from('users')
        .upsert([
          {
            id: data?.user?.id,
            email: email.value,
            username: username.value,
            profile_picture: profilePicture.value,
          },
        ]);
        console.log('User added to the "users" table:', data);
    }
     
  } catch (error: any) {
    console.error(error.message);
  }
};
</script>

<template>
    <form @submit.prevent="registerUser">
      <label>Email:</label>
      <input v-model="email" type="email" placeholder="Enter your email" required />
  
      <label>Username:</label>
      <input v-model="username" type="text" placeholder="Enter your username" required />
  
      <label>Password:</label>
      <input v-model="password" type="password" placeholder="Enter your password" required />
  
      <label>Profile Picture URL:</label>
      <input v-model="profilePicture" type="url" placeholder="Enter the URL of your profile picture" />
  
      <button type="submit">Register</button>
    </form>
  </template>
  
  <style scoped>
  </style>
  
