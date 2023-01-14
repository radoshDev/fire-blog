<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/firebaseInit'

const userStore = useUserStore()

onMounted(() => {
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
