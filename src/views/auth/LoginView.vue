<script setup lang="ts">
import LoginForm from '@/components/forms/LoginForm.vue'
import AuthLayout from '@/components/layout/AuthLayout.vue'
import { RouteName } from '@/router/routes'
</script>

<template>
  <AuthLayout>
    <div class="q-mb-sm">
      Don't have an account?
      <RouterLink :to="{ name: RouteName.REGISTER }" class="underline">
        Register
      </RouterLink>
    </div>
    <h3 class="text-weight-bold q-mb-lg">Login to FireBlog</h3>
    <LoginForm />
  </AuthLayout>
</template>
