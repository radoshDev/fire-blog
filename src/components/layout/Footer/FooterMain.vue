<script setup lang="ts">
import { RouterLink } from 'vue-router'
import MenuList from '../Navigation/MenuList.vue'
import SocialIconsList from './SocialIconsList.vue'
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-nav">
        <div class="social">
          <RouterLink class="logo" :to="{ name: 'home' }">
            FireBlogs
          </RouterLink>
          <SocialIconsList />
        </div>
        <MenuList />
      </div>
      <p class="copyright">Copyright 2021 All Rights Reserved</p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  padding: 3rem 2.5rem 1rem;
  background-color: #303030;
  color: #fff;
  .footer-nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    @media (min-width: $breakpoint-sm-min) {
      flex-direction: row;
      justify-content: space-between;
    }
    gap: 1.5rem;
    flex-wrap: wrap;
    font-size: 1.4rem;
    .social {
      .logo {
        font-weight: bold;
        font-size: 2rem;
        display: inline-block;
        margin-bottom: 1.5rem;
      }
    }
  }
  .copyright {
    margin-top: 2rem;
    margin: 2rem 0 0;
    text-align: center;
    font-size: 1.4rem;
  }
}
</style>
