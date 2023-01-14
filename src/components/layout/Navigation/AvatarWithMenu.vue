<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import ProfileMenu from './ProfileMenu.vue'

const userStore = useUserStore()
</script>

<template>
  <div class="avatar_with_menu" v-if="userStore.isAuth">
    <q-btn flat round size="sm">
      <q-avatar class="avatar" color="primary" text-color="white" size="md">
        {{ userStore.profile?.initials }}
      </q-avatar>
      <q-menu class="menu-avatar">
        <ProfileMenu />
      </q-menu>
    </q-btn>
  </div>
</template>

<style lang="scss">
.avatar_with_menu {
  position: relative;
  .avatar {
    .q-avatar__content {
      font-size: 1.5rem;
    }
  }
}
.menu-avatar {
  box-shadow: none;
}
</style>
