<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/firebaseInit'
import { usePostsStore } from './stores/postStore'

const userStore = useUserStore()
const postStore = usePostsStore()

onMounted(() => {
  if (postStore.posts.data.length === 0) {
    postStore.getPosts()
  }

  onAuthStateChanged(auth, (user) => {
    console.log('user', user)

    userStore.isAuth = !!user

    if (user) {
      userStore.getCurrentUser()
    }
  })
})
</script>

<template>
  <router-view />
</template>

<style scoped lang="scss"></style>
