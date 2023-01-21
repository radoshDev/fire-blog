<script setup lang="ts">
import { RouteName } from '@/utils/constants'
import { useUserStore } from '@/stores/userStore'
import type { Post } from '@/types/Post'

defineProps<{ post: Post }>()

const userStore = useUserStore()
</script>

<template>
  <div class="post" :class="{ 'no-user': !userStore.isAuth }">
    <div class="post-content">
      <h2 class="q-mb-lg">{{ post.title }}</h2>
      <q-btn
        label="View The Post"
        icon-right="arrow_forward"
        flat
        :to="{ name: RouteName.VIEW_POST, params: { id: post.id } }"
      />
    </div>
    <div class="post-picture">
      <q-img :src="post.coverPhoto" :alt="post.title" height="500px" />
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
    .post-content {
      order: 0;
    }
    &:nth-child(odd) {
      .post-content {
        @include mobile-min {
          order: 2;
        }
      }
    }
  }

  .post-content {
    flex: 3;
    padding: 2rem;
    text-align: center;
  }
  .post-picture {
    flex: 4;
    display: flex;
  }
}
</style>
