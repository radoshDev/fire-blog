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
  <div class="blog-post">
    <h1>{{ post.title }}</h1>
    <div class="description">
      <div v-html="htmlDescription"></div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
