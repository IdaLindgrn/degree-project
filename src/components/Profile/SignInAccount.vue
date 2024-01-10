<script setup lang="ts">
import { ref } from 'vue';
import supabase from '../../config/supabaseClient'; 
import router from '../../router/routes';

const email = ref('');
const password = ref('');

const showPopup = ref(false);
const popupMessage = ref('');

const authUser = ref();

const signInUser = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (error) {
      console.error('Sign-in error:', error.message);
      showPopup.value = true;
      popupMessage.value = 'Invalid login credentials.';
    } else {
      console.log('User signed in:', data);
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select()
        .eq('email', email.value);

        if (userError) {
        console.error('Error fetching user details:', userError.message);
      } else {
        console.log('User details from the "users" table:', userData);
      }

      authUser.value = data;
      localStorage.setItem('authUser', JSON.stringify(data));
      showPopup.value = true;
      popupMessage.value = 'Login successful!';
    }
  } catch (error: any) {
    console.error('Unexpected error', error.message);
    showPopup.value = true;
    popupMessage.value = 'Unexpected error. Please try again later.';
  }
};

const closePopup = () => {
  showPopup.value = false;
  if (authUser.value) {
    router.push('/');
  }
};
</script>

<template>
   <div>
    <form @submit.prevent="signInUser" class="registration-form">
      <p style="font-size: larger;">Login to your account</p>
    <div class="form-group">
     <label for="emailOrUsername">Email:</label>
     <input id="emailOrUsername" v-model="email" type="text" placeholder="Enter your email" required />
    </div>

  <div class="form-group">
    <label for="password">Password:</label>
    <input id="password" v-model="password" type="password"  placeholder="Enter your password" required />
  </div>

    <button type="submit" class="submit-button">Login</button>
  </form>

  <div v-if="showPopup" class="popup">
      {{ popupMessage }}
      <button @click="closePopup">Close</button>
    </div>
   </div>
  </template>

<style>
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 1em;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>