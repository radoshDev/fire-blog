<script setup lang="ts">
defineProps({
  modelValue: { type: Boolean, required: true },
  hideActions: Boolean,
})
</script>

<template>
  <q-dialog
    :model-value="modelValue"
    @update:model-value="(val) => $emit('update:modelValue', val)"
  >
    <q-card>
      <q-card-section>
        <slot />
      </q-card-section>
      <q-card-actions align="center" v-if="!hideActions">
        <q-btn color="black" rounded label="Close" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped lang="scss"></style>
