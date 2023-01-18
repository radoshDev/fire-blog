<script setup lang="ts">
import { useRoute } from 'vue-router'
import { getDoc, doc } from 'firebase/firestore'
import LayoutPage from '@/components/layout/LayoutPage.vue'
import BlogPostFull from '@/components/pages/blog/BlogPostFull.vue'
import { usePostsStore } from '@/stores/postStore'
import { ref, onMounted } from 'vue'
import type { Post } from '@/types/Post'
import db from '@/firebase/firebaseInit'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const postStore = usePostsStore()
const route = useRoute()
const isLoading = ref(true)
const post = ref<Post | null>(null)

onMounted(async () => {
  try {
    const postId = route.params['id']
    if (typeof postId !== 'string') return
    const postInStore = postStore.posts.find((item) => item.id === postId)
    if (postInStore) {
      post.value = postInStore
      return
    }
    const docRef = doc(db.blogPosts, postId)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      post.value = docSnap.data()
    }
  } catch (_error) {
    const error = _error as Error
    console.log(error.message)

    $q.notify({
      message: 'Something went wrong. Try to reload page',
      color: 'negative',
      position: 'top',
    })
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <LayoutPage>
    <div class="container">
      <div v-if="isLoading">Loading...</div>
      <div v-else-if="post === null">No such post...</div>
      <BlogPostFull v-else :post="post" />
    </div>
  </LayoutPage>
</template>

<style scoped lang="scss"></style>
