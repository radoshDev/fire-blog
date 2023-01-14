<script setup lang="ts">
import RegisterForm from '@/components/forms/RegisterForm.vue'
import AuthLayout from '@/components/layout/AuthLayout.vue'
import { RouteName } from '@/router/routes'
</script>

<template>
  <AuthLayout>
    <div class="q-mb-sm">
      Already have an account?
      <RouterLink :to="{ name: RouteName.LOGIN }" class="underline">
        Login
      </RouterLink>
    </div>
    <h3 class="text-weight-bold q-mb-lg">Create Your FireBlog Account</h3>
    <RegisterForm />
  </AuthLayout>
</template>

<style scoped lang="scss"></style>
