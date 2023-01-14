<script setup lang="ts">
import WelcomeHero from '@/components/pages/home/WelcomeHero.vue'
import LoginReminder from '@/components/pages/home/LoginReminder.vue'
import LayoutPage from '@/components/layout/LayoutPage.vue'
import BlogPostsList from '@/components/pages/blog/BlogPostsList.vue'
import RecentBlogs from '@/components/pages/blog/RecentBlogs.vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
</script>

<template>
  <LayoutPage>
    <main>
      <WelcomeHero v-if="!userStore.isAuth" />
      <BlogPostsList />
      <RecentBlogs />
      <LoginReminder v-if="!userStore.isAuth" />
    </main>
  </LayoutPage>
</template>

<style lang="scss" scoped></style>
