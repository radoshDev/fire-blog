<script setup lang="ts">
import { usePostsStore } from '@/stores/postStore'
import type { Post } from '@/types/Post'
import {
  outlinedArrowForward,
  outlinedDelete,
} from '@quasar/extras/material-icons-outlined'
import { symOutlinedEditSquare } from '@quasar/extras/material-symbols-outlined'

defineProps<{ post: Post }>()

const postStore = usePostsStore()
</script>

<template>
  <q-card class="blog-card">
    <img
      :src="`/src/assets/blogCards/${post.coverPhoto}.jpg`"
      :alt="post.title"
    />
    <q-card-actions class="card-actions" v-if="postStore.isEditPost">
      <q-btn
        :icon="symOutlinedEditSquare"
        size="sm"
        round
        style="background: #fff"
      />
      <q-btn :icon="outlinedDelete" size="sm" round style="background: #fff" />
    </q-card-actions>
    <q-card-section>
      <div class="text-h4 q-mb-sm">{{ post.title }}</div>
      <div class="text-body1 text-weight-bold">Posted on: {{ post.date }}</div>
    </q-card-section>
    <q-card-actions>
      <q-btn flat to="#" size="sm" padding="xs" dense>
        <span>View The Post</span>
        <q-icon :name="outlinedArrowForward" size="1.2rem" />
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<style scoped lang="scss">
.blog-card {
  position: relative;
  max-width: 300px;
  &:hover {
    .card-actions {
      opacity: 1;
    }
  }
  .card-actions {
    opacity: 0;
    position: absolute;
    top: 0;
    right: 0;
    transition: opacity 0.3s ease;
  }
}
</style>
