<script setup lang="ts">
import { usePostsStore } from '@/stores/postStore'
import BlogCardsList from './BlogCardsList.vue'
const store = usePostsStore()
</script>

<template>
  <div class="cards-wrapper">
    <div class="container">
      <h3 class="title">View more recent blogs</h3>
      <BlogCardsList :post-list="store.postsCard" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.cards-wrapper {
  background-color: rgba(0 0 0/0.1);
  padding: 2.5rem;
  .title {
    font-size: 2.8rem;
    font-weight: 300;
    margin-bottom: 3.2rem;
  }
}
</style>
