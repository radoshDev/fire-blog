<script setup lang="ts">
import { computed } from 'vue'
import { usePostsStore } from '@/stores/postStore'
import BlogPost from './BlogPost.vue'
const postStore = usePostsStore()
const firstTwoPosts = computed(() => postStore.posts.data.slice(0, 2))
</script>

<template>
  <div class="posts-list">
    <BlogPost v-for="post in firstTwoPosts" :post="post" :key="post.id" />
  </div>
</template>

<style scoped lang="scss"></style>
