

<script setup lang="ts">
import { ref } from 'vue'
import SignInAccountVue from '../../components/Profile/SignInAccount.vue';
import CreateAccountVue from '../../components/Profile/CreateAccount.vue';


const isSignIn = ref(true);

const switchToRegistration = () => {
  isSignIn.value = false;
};

const switchToSignIn = () => {
  isSignIn.value = true;
};
</script>

    <template>
     <div>
    <h1>Profile Page</h1>
    <div v-if="isSignIn">
      <SignInAccount />
      <p>
        Don't have an account? 
        <button @click="switchToRegistration">Register</button>
      </p>
    </div>
    <div v-else>
      <CreateAccount />
      <p>
        Already have an account? 
        <button @click="switchToSignIn">Sign In</button>
      </p>
    </div>
  </div>
    </template>
    
    
    <style scoped>
    </style>