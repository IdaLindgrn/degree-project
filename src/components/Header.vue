<template>
  <header class="header">
    <div class="logo">
      <router-link to="/">
        <img src="../assets/cat-box-logo.png" alt="CatBox logo">
      </router-link>
    </div>
    <div class="hamburger-menu" @click="toggleMenu">
      <font-awesome-icon icon="fas fa-bars" :style="{ fontSize: iconSize }" />
    </div>
    <nav class="nav" :class="{ 'nav-open': isMenuOpen }">
      <router-link to="/" class="nav-link" @click="closeMenu">Home</router-link>
      <router-link to="/tutorial" class="nav-link" @click="closeMenu">Tutorial</router-link>
      <router-link to="/screenshots" class="nav-link" @click="closeMenu">Screenshots</router-link>
    </nav>
  </header>
</template>


<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute, RouterLink } from 'vue-router';

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
  if (window.innerWidth <= 610) {
    closeMenu();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 610) {
    closeMenu();
  }
});


</script>

<style lang="scss">
@import '@/style/main';

.nav {
  display: flex;
  align-items: center;
}

.nav a {
  text-decoration: none;
  color: $teritaryFontColor;
  margin: 0 1rem;
}

.nav :hover {
  color: $primaryFontColor;
}

.hamburger-menu {
  display: none;
}

@include mobile-large {
  .hamburger-menu {
    display: flex;
    flex-direction:row;
    cursor: pointer;
    color: $teritaryFontColor;
    align-items: center;
    padding-right: 20px;
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


