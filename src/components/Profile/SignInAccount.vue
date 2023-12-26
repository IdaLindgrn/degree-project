<script setup lang="ts">
import { ref } from 'vue';
import supabase from '../../config/supabaseClient'; 

const emailOrUsername = ref('');
const password = ref('');

const signInUser = async () => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select()
      .or(
        `email.eq.${emailOrUsername.value}`,
        `username.eq.${emailOrUsername.value}`
      );

    if (error) {
      console.error('Sign-in error:', error.message);
    } else {
      const user = data?.[0];
   
      if (user && user.password === password.value) {
        console.log('User signed in:', user);
      } else {
        console.error('Invalid credentials');
      }
    }
  } catch (error) {
    console.error('Unexpected error:', error.message);
  }
};
</script>

<template>
    <form @submit.prevent="signInUser">
    <label for="emailOrUsername">Email or Username:</label>
    <input id="emailOrUsername" v-model="emailOrUsername" type="text" required />

    <label for="password">Password:</label>
    <input id="password" v-model="password" type="password" required />

    <button type="submit">Sign In</button>
  </form>
  </template>

<style scoped>
/* Your styles here */
</style>