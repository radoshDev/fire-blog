<script setup lang="ts">
import AdministrationForm from '@/components/forms/AdministrationForm.vue'
import LayoutPage from '@/components/layout/LayoutPage.vue'
</script>

<template>
  <LayoutPage>
    <main class="container q-py-xl">
      <h1 class="text-h3 text-center q-mb-lg">Administration</h1>
      <q-card class="card text-center">
        <q-card-section>
          <h3 class="text-h4">Add Admin</h3>
          <AdministrationForm />
        </q-card-section>
      </q-card>
    </main>
  </LayoutPage>
</template>

<style lang="scss" scoped>
.card {
  max-width: 400px;
  margin-inline: auto;
  background-color: #f1f1f1;
}
</style>
