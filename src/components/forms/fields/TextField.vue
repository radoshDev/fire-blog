<script setup lang="ts">
import type { PropType } from 'vue'
import type { InputType } from '@/types/Form'
import { ref } from 'vue'

const props = defineProps({
  modelValue: { type: String, required: true, default: '' },
  name: { type: String, required: true },
  label: { type: String, required: true },
  type: { type: String as PropType<InputType>, required: true },
  icon: { type: String, required: true },
  error: String,
})
const isPasswordField = props.type === 'password'
const isPwd = ref(true)
</script>

<template>
  <q-input
    :model-value="modelValue"
    @update:model-value="(val) => $emit('update:modelValue', val)"
    :name="name"
    :label="label"
    :type="isPasswordField ? (isPwd ? type : 'text') : type"
    filled
    dense
    :error="!!error"
    :error-message="error"
  >
    <template v-slot:prepend>
      <q-icon :name="icon" size="2rem" />
    </template>
    <template v-slot:append v-if="isPasswordField">
      <q-icon
        :name="isPwd ? 'visibility_off' : 'visibility'"
        class="cursor-pointer"
        @click="isPwd = !isPwd"
      />
    </template>
  </q-input>
</template>

<style lang="scss"></style>
