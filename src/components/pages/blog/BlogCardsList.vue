<script setup lang="ts">
import type { Post } from '@/types/Post'
import BlogCard from './BlogCard.vue'

defineProps<{ postList: Post[] }>()
</script>

<template>
  <div class="cards-list">
    <BlogCard v-for="card in postList" :key="card.id" :post="card" />
  </div>
</template>

<style scoped lang="scss">
.cards-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
}
</style>
