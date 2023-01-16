<script setup lang="ts">
import LayoutPage from '@/components/layout/LayoutPage.vue'
import BlogPostFull from '@/components/pages/blog/BlogPostFull.vue'
import { usePostsStore } from '@/stores/postStore'

const postStore = usePostsStore()
</script>

<template>
  <LayoutPage>
    <div class="container">
      <BlogPostFull :post="postStore.blog" />
    </div>
  </LayoutPage>
</template>

<style scoped lang="scss"></style>
