<script setup lang="ts">
import { sendPasswordResetEmail, type AuthError } from 'firebase/auth'
import { useQuasar } from 'quasar'
import type { FormInput } from '@/types/Form'
import { useForm, useField } from 'vee-validate'
import TextField from './fields/TextField.vue'
import { ref } from 'vue'
import ModalBasic from '../ui/ModalBasic.vue'
import { auth } from '@/firebase/firebaseInit'
import type { ErrCode } from '@/types'
import { getErrorMessage } from '@/firebase/getErrorMessage'
import {
  resetPwdValidationScheme,
  type ResetPwdFormValues,
} from '@/schemas/validationSchemas'

const showModal = ref(false)
const isLoading = ref(false)
const $q = useQuasar()
const { handleSubmit, resetForm } = useForm<ResetPwdFormValues>({
  validationSchema: resetPwdValidationScheme,
})

const onSubmit = handleSubmit(async ({ email }) => {
  try {
    isLoading.value = true
    await sendPasswordResetEmail(auth, email)
    resetForm()
    showModal.value = true
  } catch (_error) {
    const error = _error as AuthError
    $q.notify({
      message: getErrorMessage(error.code as ErrCode),
      color: 'negative',
      position: 'top-left',
    })
  } finally {
    isLoading.value = false
  }
})

const formInputs: FormInput<ResetPwdFormValues, 'icon'> = {
  email: {
    label: 'Email',
    value: useField('email'),
    type: 'text',
    icon: 'mail',
  },
}
</script>

<template>
  <q-form @submit="onSubmit" class="form">
    <TextField
      v-for="(input, name) in formInputs"
      :key="name"
      v-model="input.value.value.value"
      :label="input.label"
      :type="input.type"
      :icon="input.icon"
      :name="name"
      :error="input.value.errorMessage.value"
      class="input-field"
    />
    <q-btn
      color="black"
      rounded
      label="Reset"
      type="submit"
      :loading="isLoading"
    />
  </q-form>
  <ModalBasic v-model="showModal">
    <div>A password reset link has been sent to your email</div>
  </ModalBasic>
</template>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  .input-field {
    max-width: 300px;
    width: 100%;
  }
}
</style>
