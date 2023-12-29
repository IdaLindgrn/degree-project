

<script setup lang="ts">
import { ref } from 'vue'
import SignInAccount from '../../components/Profile/SignInAccount.vue';
import CreateAccount from '../../components/Profile/CreateAccount.vue';

const isSignIn = ref(true);

</script>

    <template>
   <div>
    <h1>Profile Page</h1>
    <SignInAccount v-if="isSignIn" />
    <CreateAccount v-else />
    <p v-if="isSignIn">
      Don't have an account? 
      <button @click="isSignIn = false">Register</button>
    </p>
    <p v-else>
      Already have an account? 
      <button @click="isSignIn = true">Sign In</button>
    </p>
  </div>
    </template>
    
    
    <style scoped>
    </style>