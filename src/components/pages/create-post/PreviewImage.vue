<script setup lang="ts">
import ModalBasic from '@/components/ui/ModalBasic.vue'
import { usePostsStore } from '@/stores/postStore'
import { ref } from 'vue'
const showModal = ref(false)
const postStore = usePostsStore()
</script>

<template>
  <q-btn
    label="Preview Image"
    rounded
    color="primary"
    no-wrap
    @click="showModal = true"
    :disable="!postStore.blog.photoPreviewUrl"
  />
  <ModalBasic v-model="showModal" hide-actions>
    <q-img
      :src="postStore.blog.photoPreviewUrl"
      alt="preview"
      width="400px"
      :ratio="2 / 1"
    />
  </ModalBasic>
</template>

<style scoped lang="scss"></style>
