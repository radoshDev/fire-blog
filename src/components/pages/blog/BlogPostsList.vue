<script setup lang="ts">
import { usePostsStore } from '@/stores/postStore'
import BlogPost from './BlogPost.vue'
const store = usePostsStore()
</script>

<template>
  <div class="posts-list">
    <BlogPost v-for="post in store.posts" :post="post" :key="post.id" />
  </div>
</template>

<style scoped lang="scss"></style>
