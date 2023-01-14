<script setup lang="ts"></script>

<template>
  <div class="auth-layout">
    <div class="skew-section">
      <div class="content">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auth-layout {
  @include mobile-min {
    background-color: #303030;
    background-image: url('../../assets/background.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
  }

  .skew-section {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    max-width: 600px;
    min-height: 100vh;
    @include mobile-min {
      margin-left: -3rem;
      transform: skewX(-3deg);
    }
    .content {
      @include mobile-min {
        transform: skewX(3deg);
      }
      margin: auto;
      padding: 2rem;
      text-align: center;
      width: 100%;
    }
  }
}
</style>
