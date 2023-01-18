<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import LayoutPage from '@/components/layout/LayoutPage.vue'
import BlogPostFull from '@/components/pages/blog/BlogPostFull.vue'
import { usePostsStore } from '@/stores/postStore'
import type { Post } from '@/types/Post'
import { useUserStore } from '@/stores/userStore'

const postStore = usePostsStore()
const userStore = useUserStore()
const router = useRouter()

const post = computed<Post>(() => ({
  coverPhoto: postStore.blog.photoPreviewUrl,
  date: new Date().toISOString(),
  descriptionHtml: postStore.blog.htmlDescription,
  id: '1',
  profileId: userStore.profile?.id || '1',
  title: postStore.blog.title,
}))

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
      <BlogPostFull :post="post" />
    </div>
  </LayoutPage>
</template>

<style scoped lang="scss"></style>
