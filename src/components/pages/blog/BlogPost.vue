<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import type { Post } from '@/types/Post'

defineProps<{ post: Post }>()

const userStore = useUserStore()
</script>

<template>
  <div class="post" :class="{ 'no-user': !userStore.isAuth }">
    <div class="post-content">
      <h2 class="title">{{ post.title }}</h2>
    </div>
    <div class="post-picture">
      <img
        :src="`/src/assets/blogPhotos/${post.coverPhoto}.jpg`"
        :alt="post.title"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.post {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  @include mobile-min {
    flex-direction: row;
  }
  &:nth-child(even) {
    .post-content {
      @include mobile-min {
        order: 2;
      }
    }
  }
  &.no-user {
    &:nth-child(odd) {
      .post-content {
        @include mobile-min {
          order: 2;
        }
      }
    }
  }

  .post-content {
    flex: 2;
    padding: 2rem;
    .title,
    .post-text {
      max-width: 400px;
      margin: 1.5rem auto;
    }
  }
  .post-picture {
    flex: 3;
    display: flex;
  }
}
</style>
