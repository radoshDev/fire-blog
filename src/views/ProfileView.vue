<script setup lang="ts">
import AccountSettingForm from '@/components/forms/AccountSettingForm.vue'
import LayoutPage from '@/components/layout/LayoutPage.vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
</script>

<template>
  <LayoutPage>
    <main class="container q-py-xl">
      <h1 class="text-h3 text-center q-mb-lg">Account Setting</h1>
      <q-card class="card">
        <q-card-section class="flex column items-center">
          <q-avatar color="primary" text-color="white" class="q-mb-sm">
            {{ userStore.profile?.initials }}
          </q-avatar>
          <q-chip
            v-if="userStore.profile?.isAdmin"
            square
            icon="admin_panel_settings"
            color="primary"
            text-color="white"
            class="q-mb-sm"
          >
            Admin
          </q-chip>
          <AccountSettingForm />
        </q-card-section>
      </q-card>
    </main>
  </LayoutPage>
</template>

<style lang="scss" scoped>
.card {
  max-width: 400px;
  margin-inline: auto;
  background-color: #f1f1f1;
}
</style>
