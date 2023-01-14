<script setup lang="ts">
import LayoutPage from '@/components/layout/LayoutPage.vue'
import BlogCardsList from '@/components/pages/blog/BlogCardsList.vue'
import { usePostsStore } from '@/stores/postStore'
import { onUnmounted } from 'vue'

const store = usePostsStore()

onUnmounted(() => {
  store.isEditPost = false
})
</script>

<template>
  <LayoutPage>
    <div class="blogs">
      <div class="container">
        <div class="toggle-wrapper">
          <span>Toggle Edit Posts</span>
          <q-toggle v-model="store.isEditPost" />
        </div>
        <BlogCardsList :post-list="store.postsCard" />
      </div>
    </div>
  </LayoutPage>
</template>

<style scoped lang="scss">
.blogs {
  padding: 3rem 0;
  .toggle-wrapper {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 1rem;
  }
}
</style>
