<script setup lang="ts">
import FooterMain from './Footer/FooterMain.vue'
import NavigationMenu from './Navigation/NavigationMenu.vue'
</script>

<template>
  <div class="wrapper">
    <NavigationMenu />
    <div class="content">
      <slot />
    </div>
    <FooterMain />
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  .content {
    flex: 1 1 auto;
  }
}
</style>
