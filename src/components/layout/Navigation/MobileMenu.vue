<script setup lang="ts">
import { roundMenu } from '@quasar/extras/material-icons-round'
import { ref, onMounted } from 'vue'
import MenuList from './MenuList.vue'
import ProfileMenu from './ProfileMenu.vue'

const isMobile = ref(false)

const checkScreen = () => {
  const windowWidth = window.innerWidth
  if (windowWidth > 600) {
    isMobile.value = false
  }
}

const toggleMobileNav = () => {
  isMobile.value = !isMobile.value
}
onMounted(() => {
  window.addEventListener('resize', checkScreen)
  checkScreen()
})
</script>

<template>
  <div class="mobile-menu">
    <q-btn
      @click="toggleMobileNav"
      class="menu-burger q-pa-none"
      flat
      :icon="roundMenu"
      size="lg"
      dense
      :ripple="false"
    />
    <Transition name="slide">
      <div class="mobile-menu-nav" v-if="isMobile">
        <MenuList />
        <ProfileMenu />
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.mobile-menu {
  @include mobile-min {
    display: none;
  }
  .menu-burger {
    position: absolute;
    right: 2.5rem;
    top: 0.5rem;
  }
  .mobile-menu-nav {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 70%;
    max-width: 25rem;
    background-color: #303030;
    color: #fff;
    padding: 1.5rem;
  }
  .slide-enter-active,
  .slide-leave-active {
    transition: all 1s ease;
  }
  .slide-enter-from,
  .slide-leave-to {
    transform: translateX(-250px);
  }
  .slide-enter-to {
    transform: translateX(0);
  }
}
</style>
