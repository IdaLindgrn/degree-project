
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
    <form @submit.prevent="registerUser" class="registration-form">
      <p style="font-size: larger;">Create your account</p>
    <div class="form-group">
      <label>Profile Picture URL:</label>
      <input v-model="profilePicture" type="url" placeholder="Profile picture" />
    </div>

    <div class="form-group">
      <label>Email:</label>
      <input v-model="email" type="email" placeholder="Enter your email" required />
    </div>
  
    <div class="form-group">
      <label>Username:</label>
      <input v-model="username" type="text" placeholder="Enter your username" required />
    </div>
  
    <div class="form-group">
      <label>Password:</label>
      <input v-model="password" type="password" placeholder="Enter your password" required />
    </div>

      <button type="submit" class="submit-button">Create account</button>
    </form>
  </template>
  
  <style>
  .registration-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  margin-bottom: 10px;
  text-align: left;
}

label {
  display: block;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 5px;
  margin-top: 2px;
  box-sizing: border-box;
  background-color: #D9D9D9;
  border: none;
  border-radius: 5px;
}

.submit-button {
  background-color: #2d1b5b;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  max-width: 170px;
}
  </style>
  
