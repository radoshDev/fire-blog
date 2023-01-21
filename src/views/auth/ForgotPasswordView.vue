<script setup lang="ts">
import ResetPasswordForm from '@/components/forms/ResetPasswordForm.vue'
import AuthLayout from '@/components/layout/AuthLayout.vue'
import { RouteName } from '@/utils/constants'
</script>

<template>
  <AuthLayout>
    <p class="q-mb-sm">
      Back to
      <RouterLink :to="{ name: RouteName.LOGIN }" class="underline">
        Login
      </RouterLink>
    </p>
    <h3 class="text-weight-bold q-mb-sm">Reset Password</h3>
    <p>Forgot your password? Enter your email to reset it</p>
    <ResetPasswordForm />
  </AuthLayout>
</template>

<style scoped lang="scss"></style>
