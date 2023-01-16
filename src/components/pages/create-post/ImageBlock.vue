<script setup lang="ts">
import { ref } from 'vue'
import { handlerRejectFile } from '@/utils/handlerRejectFile'
import { usePostsStore } from '@/stores/postStore'
import PreviewImage from './PreviewImage.vue'

const postStore = usePostsStore()
const fileError = ref('')

const onReject = handlerRejectFile(fileError)

function onFileUpdate(file: File | null) {
  console.log('added file', file)
  if (file) {
    postStore.blog.photoPreviewUrl = URL.createObjectURL(file)
  } else {
    postStore.blog.photoPreviewUrl = ''
  }
  if (fileError.value) {
    fileError.value = ''
  }
}
</script>

<template>
  <div class="image-block">
    <q-file
      v-model="postStore.blog.photo"
      :label="postStore.blog.photo ? undefined : 'Select Blog Image'"
      clearable
      dense
      outlined
      dark
      rounded
      bg-color="dark"
      label-color="white"
      accept=".png, .jpg, .jpeg"
      :error="fileError.length > 0"
      :error-message="fileError"
      @rejected="onReject"
      @update:model-value="onFileUpdate"
    />
    <PreviewImage />
  </div>
</template>

<style scoped lang="scss">
.image-block {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  margin-bottom: 2rem;
}
</style>
