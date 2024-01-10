

<script setup lang="ts">
import { ref } from 'vue'
import SignInAccount from '../../components/Profile/SignInAccount.vue';
import CreateAccount from '../../components/Profile/CreateAccount.vue';

const isSignIn = ref(true);

</script>

    <template>
   <div class="profile-page">
    <router-link to="/" class="back-arrow">
          <font-awesome-icon icon="fas fa-chevron-left" :style="{ fontSize: '25px', color: '#fff' }" />
        </router-link>
 
    <div class="white-box">
    <SignInAccount v-if="isSignIn" />
    <CreateAccount v-else />
    <p class="auth-text" v-if="isSignIn">
      <span>Don't have an account? </span>
      <span @click="isSignIn = false"  class="auth-action">Register</span>
    </p>
    <p class="auth-text" v-else>
      <span>Already have an account? </span>
      <span @click="isSignIn = true" class="auth-action">Sign In</span>
    </p>
    </div>
  </div>
    </template>
    
    
    <style scoped>
    .profile-page {
      background-color: #2d1b5b;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh; 
      padding: 40px;
}

.back-arrow {
  align-self: flex-start;
}

.white-box {
  background-color: white;
  height: 80vh;
  width: 80vh;
  padding: 20px;
  border-radius: 10px;
}

.auth-text {

  text-align: center;
  margin: 10px 0;
}

.auth-action {
  cursor: pointer;
  font-weight: bold;
  margin-left: 10px;
}
    </style>