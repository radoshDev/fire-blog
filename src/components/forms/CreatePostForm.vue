<script setup lang="ts">
import { computed } from 'vue'
import { usePostsStore } from '@/stores/postStore'
import ImageBlock from '../pages/create-post/ImageBlock.vue'
import PostEditor from '../pages/create-post/PostEditor.vue'
import { RouteName } from '@/router/routes'

const postStore = usePostsStore()
const isPostFilled = computed(
  () => !!postStore.blog.title && !!postStore.blog.photo
)
</script>

<template>
  <q-form class="q-my-lg">
    <q-input
      v-model="postStore.blog.title"
      dense
      placeholder="Enter Blog Title"
      outlined
      class="q-mb-lg"
    />
    <ImageBlock />
    <PostEditor />
    <div class="actions">
      <q-btn
        label="Publish Blog"
        color="primary"
        rounded
        type="submit"
        :disable="!isPostFilled"
      />
      <q-btn
        label="Post Preview"
        rounded
        :to="{ name: RouteName.PREVIEW_POST }"
      />
    </div>
  </q-form>
</template>

<style scoped lang="scss">
.actions {
  display: flex;
  gap: 2rem;
}
</style>
