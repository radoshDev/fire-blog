<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import { RouteName } from '@/utils/constants'

const userStore = useUserStore()
</script>

<template>
  <ul class="menu-list">
    <RouterLink :to="{ name: RouteName.HOME }" class="link">Home</RouterLink>
    <RouterLink :to="{ name: RouteName.BLOGS }" class="link">Blogs</RouterLink>
    <RouterLink
      v-if="userStore.profile?.isAdmin"
      :to="{ name: RouteName.CREATE_POST }"
      class="link"
    >
      Create Post
    </RouterLink>
    <RouterLink
      :to="{ name: RouteName.LOGIN }"
      class="link"
      v-if="!userStore.isAuth"
    >
      Login/Register
    </RouterLink>
  </ul>
</template>

<style scoped lang="scss">
.menu-list {
  display: flex;
  gap: 2rem;
  flex-direction: column;
  @media (min-width: $breakpoint-sm-min) {
    flex-direction: row;
    align-items: center;
  }
  .link {
    font-weight: 500;
    padding: 0 0.8rem;
    @media (min-width: $breakpoint-sm-min) {
      transition: 0.3s color ease;
      &:hover {
        color: $secondary;
      }
    }
  }
}
</style>
