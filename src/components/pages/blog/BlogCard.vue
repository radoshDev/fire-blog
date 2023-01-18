<script setup lang="ts">
import { computed } from 'vue'
import format from 'date-fns/format'
import { usePostsStore } from '@/stores/postStore'
import type { Post } from '@/types/Post'
import { RouteName } from '@/router/routes'

const props = defineProps<{ post: Post }>()

const postStore = usePostsStore()
const createdAt = computed(() =>
  format(props.post.date.toDate(), 'MMM d, yyyy')
)
</script>

<template>
  <q-card class="blog-card">
    <q-img :src="post.coverPhoto" :alt="post.title" height="200px" />
    <q-card-actions class="card-actions" v-if="postStore.isEditPost">
      <q-btn
        icon="edit"
        size="sm"
        round
        title="Edit Post"
        style="background: #fff"
      />
      <q-btn
        icon="delete_forever"
        size="sm"
        round
        style="background: #fff"
        title="Delete Post"
      />
    </q-card-actions>
    <q-card-section>
      <div class="text-h4 q-mb-sm">{{ post.title }}</div>
      <div class="text-body1 text-weight-bold">Posted on: {{ createdAt }}</div>
    </q-card-section>
    <q-card-actions class="q-px-md">
      <q-btn
        flat
        :to="{ name: RouteName.VIEW_POST, params: { id: post.id } }"
        label="View The Post"
        size="sm"
        padding="xs"
        dense
        icon-right="arrow_forward"
      />
    </q-card-actions>
  </q-card>
</template>

<style scoped lang="scss">
.blog-card {
  position: relative;
  max-width: 330px;
  width: 100%;
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
