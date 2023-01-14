<script setup lang="ts">
import {
  TwitterIcon,
  YoutubeIcon,
  InstagramIcon,
  LinkedinIcon,
} from '@/components/Icons'
</script>

<template>
  <ul class="social-icons">
    <li>
      <a href="#"><YoutubeIcon :width="24" /></a>
    </li>
    <li>
      <a href="#"><TwitterIcon :width="24" /></a>
    </li>
    <li>
      <a href="#"><InstagramIcon :width="24" /></a>
    </li>
    <li>
      <a href="#"><LinkedinIcon :width="24" /></a>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.social-icons {
  display: flex;
  gap: 1rem;
}
</style>
