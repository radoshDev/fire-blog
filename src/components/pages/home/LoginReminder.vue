<script setup lang="ts">
import { RouteName } from '@/router/routes'
import { outlinedArrowForward } from '@quasar/extras/material-icons-outlined'
</script>

<template>
  <div class="login-reminder">
    <div class="container wrapper">
      <h2 class="title">
        Never miss a post. Register for your free account today!
      </h2>
      <q-btn
        :to="{ name: RouteName.REGISTER }"
        label="Register for FireBlogs"
        :icon-right="outlinedArrowForward"
        color="black"
        rounded
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-reminder {
  padding: 3rem 2rem;
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    .title {
      text-align: center;
      max-width: 600px;
      line-height: 1.3;
    }
  }
}
</style>
