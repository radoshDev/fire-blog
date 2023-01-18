<script setup lang="ts">
import { usePostsStore } from '@/stores/postStore'
import { computed } from 'vue'
import BlogCardsList from './BlogCardsList.vue'
const postStore = usePostsStore()
const posts = computed(() => postStore.posts.data.slice(2, 6))
</script>

<template>
  <div class="cards-wrapper">
    <div class="container">
      <h3 class="title">View more recent blogs</h3>
      <BlogCardsList :post-list="posts" />
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
