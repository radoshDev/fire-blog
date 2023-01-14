<script setup lang="ts">
import { RouteName } from '@/router/routes'
import { RouterLink } from 'vue-router'
import AvatarWithMenu from './AvatarWithMenu.vue'
import MenuList from './MenuList.vue'
import MobileMenu from './MobileMenu.vue'
</script>

<template>
  <header class="menu-header shadow-4">
    <nav class="container desktop-menu">
      <div class="branding">
        <RouterLink :to="{ name: RouteName.HOME }">FireBlogs</RouterLink>
      </div>
      <div class="nav-links">
        <MenuList />
        <AvatarWithMenu />
      </div>
    </nav>
    <MobileMenu />
  </header>
</template>

<style scoped lang="scss">
.menu-header {
  z-index: 99;
  background-color: white;
  position: relative;
  padding: 2.5rem 2.4rem;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  .desktop-menu {
    display: none;
    @media (min-width: $breakpoint-sm-min) {
      display: flex;
      align-items: center;
    }
    .branding {
      margin-right: auto;
      font-weight: 600;
      font-size: 2.4rem;
      & > * {
        color: inherit;
      }
    }
    .nav-links {
      display: flex;
      gap: 1rem;
    }
  }
}
</style>
