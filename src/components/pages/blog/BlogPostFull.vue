<script setup lang="ts">
import { computed } from 'vue'
import { getSanitizedHtml } from '@/utils/getSanitizedHtml'

import type { BlogPost } from '@/types/Post'

const props = defineProps<{ post: BlogPost }>()

const htmlDescription = computed(() =>
  getSanitizedHtml(props.post.htmlDescription)
)
</script>

<template>
  <div class="blog-post-full q-my-lg">
    <h1 class="text-h2 text-bold q-mb-lg">{{ post.title }}</h1>
    <q-img
      v-if="post.photoPreviewUrl"
      :src="post.photoPreviewUrl"
      height="400px"
      class="main-img"
    >
      <template v-slot:error>
        <div class="absolute-full flex flex-center bg-negative text-white">
          Cannot load image
        </div>
      </template>
    </q-img>
    <div class="description reset-styles">
      <div v-html="htmlDescription"></div>
    </div>
  </div>
</template>

<style lang="scss"></style>
