<script setup lang="ts">
import { outlinedArrowForward } from '@quasar/extras/material-icons-outlined'
</script>

<template>
  <div class="hero">
    <div class="hero-content">
      <div class="text-block">
        <h2 class="title q-mb-lg">Welcome!</h2>
        <p class="text-content q-mb-lg">
          Weekly blog articles with all things programming including HTML, CSS,
          JavaScript and more. Register today to never miss a posts.
        </p>
        <RouterLink :to="{ name: 'login' }" class="link">
          Login/Register <q-icon :name="outlinedArrowForward" />
        </RouterLink>
      </div>
    </div>
    <div class="hero-photo">
      <img src="@/assets/blogPhotos/coding.jpg" alt="Coding view" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.hero {
  display: flex;
  align-items: center;
  flex-direction: column-reverse;
  background-color: #303030;
  color: #fff;

  @media (min-width: $breakpoint-sm-min) {
    padding-top: 0;
    flex-direction: row;
  }
  .hero-content {
    padding: 2.5rem;
    flex: 2;

    .text-block {
      max-width: 400px;
      margin-inline: auto;
    }
  }
  .hero-photo {
    display: flex;
    height: 600px;
    flex: 3;
    img {
      height: 100%;
    }
  }
}
</style>
