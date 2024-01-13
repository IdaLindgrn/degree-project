<template>
  <header class="header">
    <div class="logo">
      <router-link to="/">
        <img src="../assets/cat-box-logo.png" alt="CatBox logo"  width="230">
      </router-link>
    </div>
    <div class="hamburger-menu" @click="toggleMenu">
      <font-awesome-icon icon="fas fa-bars" :style="{ fontSize: iconSize }" />
    </div>
    <nav class="nav"  :class="{ 'nav-open': isMenuOpen }">
      <router-link to="/" class="nav-link" @click="closeMenu">Home</router-link>
      <router-link to="/about" class="nav-link" @click="closeMenu">About</router-link>
      <router-link to="/profile" class="nav-link" >
        <OverviewAccount/>
      </router-link>
    </nav>
  </header>
  </template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import OverviewAccount from '../components/Profile/OverviewAccount.vue';

const isMenuOpen = ref(false);
const currentRoute = useRoute();

const iconSize = ref('30px')

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

watch(() => currentRoute.path, () => {
  closeMenu();
});

onMounted(() => {
  if (window.innerWidth <= 768) {
    closeMenu();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    closeMenu();
  }
});


</script>

<style scoped lang="scss">
@import '@/style/main';

.header {
    background-color: $secondaryColor;
    display: flex;
    justify-content: space-between;
}

.logo {
  padding: 1rem;
    display: flex;
    align-items: center;
}
.nav {
  padding: 2.3rem 5%;
  display: flex;
  align-items: center;
}

.nav a {
  text-decoration: none;
  color: $primaryFontColor;
  margin: 0 1rem;
}

.hamburger-menu {
  display: none;

}

@media only screen and (max-width: 768px) {
  .hamburger-menu {
    display: flex;
    flex-direction:row;
    cursor: pointer;
    color: $primaryFontColor;
    align-items: center;
    padding: 37px;
  }

  .nav {
    flex-direction: column;
    position: absolute;
    top: 80px;
    left: 0;
    background-color: $secondaryColor;
    width: 100%;
    z-index: 1;
    display: none;
  }

  .nav-open {
    display: flex;
  }
}

</style>


