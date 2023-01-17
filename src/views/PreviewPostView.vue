<script setup lang="ts">
import { useRouter } from 'vue-router'
import LayoutPage from '@/components/layout/LayoutPage.vue'
import BlogPostFull from '@/components/pages/blog/BlogPostFull.vue'
import { usePostsStore } from '@/stores/postStore'

const postStore = usePostsStore()
const router = useRouter()

function handleBack() {
  router.go(-1)
}
</script>

<template>
  <LayoutPage>
    <div class="container">
      <q-btn
        label="Back"
        rounded
        class="q-mt-lg"
        icon="arrow_back"
        @click="handleBack"
      />
      <BlogPostFull :post="postStore.blog" />
    </div>
  </LayoutPage>
</template>

<style scoped lang="scss"></style>
