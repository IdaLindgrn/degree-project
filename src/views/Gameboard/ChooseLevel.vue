<template>
  <header class="header">
    <div class="left-container">
      <router-link to="/">
        <font-awesome-icon icon="fas fa-chevron-left" class="back-button" :style="{ fontSize: '25px', color: '#fff' }" />
      </router-link>
    </div>
    <div class="centered-container">
      <div class="logo">    
          <img src="../../assets/cat-box-logo.png" alt="CatBox logo">
      </div> 
    </div>
    <div class="right-container"></div>
  </header>
  <body class="body">
    <div class="level-container" v-for="(level, index) in levels" :key="index" @click="() => navigateToGameboard(level.id)">
      <p class="level-number">{{ level.title }}</p>
      <p class="level-title">{{ level.level_name }}</p>
      <p class="level-learn">{{ level.learn }}</p>
      <div class="start-level">BEGIN</div>
    </div>
  </body>
</template>

<script setup lang="ts">

import { ref, onMounted } from 'vue';
import supabase from '../../config/supabaseClient'
import { useRouter } from 'vue-router';

const levels = ref<any[] | null>(null);
  const router = useRouter();

const fetchLevels = async () => {
  try {
    const { data, error } = await supabase.from('levels').select();
    if (error) {
      throw error;
    }
    levels.value = data;
  } catch (error: any) {
    console.error('Error fetching levels:', error.message);
  }
};

onMounted(() => {
  fetchLevels();
});

const navigateToGameboard = (levelId: number) => {
  router.push({ name: 'Gameboard', params: { levelId: levelId.toString() } });
};

</script>
    
<style scoped lang="scss">
@import '@/style/main';

.right-container {
  padding: 10px;
}
.body {
  padding: 40px;
}
.level-container {
  border: 3px solid $secondaryFontColor;
  padding: 35px;
  background-color: $primaryColor;
  color: $primaryFontColor;
  transition: border-color 0.7s ease;
}

.level-container:hover {
  border-color: $primaryFontColor;
}


.level-number {
  font-size: smaller; 
  padding-bottom: 5px;
  color: $secondaryFontColor;
}

.level-title {
  font-size: larger;
  padding-bottom: 10px;
}

.level-learn {
  font-size: small; 
  color: $secondaryFontColor;
}

.start-level {
  margin-top: 15px;
  background: $primaryButtonColor;
  padding: 8px;
  border-radius: 5px;
  text-align: center;
  bottom: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.7s ease;
}

.level-container:hover .start-level {
  opacity: 1;
  cursor: pointer;
}

@include desktop-small {
  .body {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 50px;
  }
}

@include mobile-small {
  .body {
    display: grid;
    gap: 30px;
  }
}
    </style>