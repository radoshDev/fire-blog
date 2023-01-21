<script setup lang="ts">
import LayoutPage from '@/components/layout/LayoutPage.vue'
import CreatePostForm from '@/components/forms/CreatePostForm.vue'
import { useRoute } from 'vue-router'

const { query } = useRoute()
const isEdit = !!query['edit']
</script>

<template>
  <LayoutPage>
    <div class="container">
      <h1 class="text-h2 text-bold q-my-lg">
        {{ isEdit ? 'Edit Post' : 'Create Post' }}
      </h1>
      <CreatePostForm />
    </div>
  </LayoutPage>
</template>

<style scoped lang="scss"></style>
