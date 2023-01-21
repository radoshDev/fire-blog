<script setup lang="ts">
import { useQuasar } from 'quasar'
import { signOut } from 'firebase/auth'
import { RouteName } from '@/utils/constants'
import { useUserStore } from '@/stores/userStore'
import { auth } from '@/firebase/firebaseInit'

const $q = useQuasar()
const userStore = useUserStore()

const handleLogout = async () => {
  try {
    await signOut(auth)
    userStore.profile = null
  } catch (_error) {
    console.log(_error)

    $q.notify({
      message: 'Something went wrong. Try to reload page',
      color: 'negative',
      position: 'top-left',
    })
  }
}
</script>

<template>
  <q-card class="profile-menu-card" dark flat>
    <q-card-section class="user-info">
      <q-avatar color="white" text-color="black" size="md" class="avatar">
        {{ userStore.profile?.initials }}
      </q-avatar>
      <div class="user-info_content">
        <div class="ellipsis">
          {{ userStore.profile?.firstName }}
          {{ userStore.profile?.lastName }}
        </div>
        <div class="ellipsis">{{ userStore.profile?.userName }}</div>
        <div class="ellipsis">{{ userStore.profile?.email }}</div>
      </div>
    </q-card-section>

    <q-separator color="white" />

    <q-card-actions vertical align="left">
      <q-btn
        :to="{ name: RouteName.PROFILE }"
        label="Profile"
        icon="person"
        flat
        no-caps
        padding="2px 4px"
        :ripple="false"
      />
      <q-btn
        v-if="userStore.profile?.isAdmin"
        :to="{ name: RouteName.ADMIN }"
        label="Admin"
        icon="admin_panel_settings"
        flat
        no-caps
        padding="2px 4px"
        :ripple="false"
      />
      <q-btn
        @click="handleLogout"
        label="Sing out"
        icon="logout"
        flat
        no-caps
        padding="2px 4px"
        :ripple="false"
      />
    </q-card-actions>
  </q-card>
</template>

<style scoped lang="scss">
.profile-menu-card {
  margin-top: 1.5rem;
  @include mobile-min {
    position: relative;
    width: min-content;
    max-width: 350px;
    border-radius: 0;
    &::before {
      content: '';
      width: 0;
      height: 0;
      border: 8px solid transparent;
      border-bottom-color: #1d1d1d;
      position: absolute;
      top: -16px;
      right: 10px;
    }
  }

  .user-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    @include mobile-min {
      gap: 2rem;
      align-items: center;
      flex-direction: row;
    }
    .user-info_content {
      line-height: 1.1;
      font-size: 1.4rem;
    }
  }
}
</style>
