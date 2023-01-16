<script setup lang="ts">
import type { BlogPost } from '@/types/Post'
import { parse } from 'node-html-parser'

defineProps<BlogPost>()
</script>

<template>
  <div class="blog-post">
    <h1>{{ title }}</h1>
    <div class="description">
      {{ parse(htmlDescription) }}
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
