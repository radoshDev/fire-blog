<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import { httpsCallable } from 'firebase/functions'
import type { MessageResponse } from '@/types'
import { functions } from '@/firebase/firebaseInit'
import type { FirebaseError } from '@firebase/util'
import { useQuasar } from 'quasar'
import {
  adminValidationScheme,
  type AdminFormValues,
} from '@/schemas/validationSchemas'

const { handleSubmit } = useForm<AdminFormValues>({
  validationSchema: adminValidationScheme,
})
const $q = useQuasar()
const email = useField<string>('email')

const onSubmit = handleSubmit(async ({ email }) => {
  try {
    console.log(email)
    const addAdminRole = httpsCallable<{ email: string }, MessageResponse>(
      functions,
      'addAdminRole'
    )
    const result = await addAdminRole({ email })
    $q.notify({
      message: result.data.message,
      color: 'positive',
      position: 'top',
    })
  } catch (_error) {
    const error = _error as FirebaseError
    $q.notify({
      message: error.message,
      color: 'negative',
      position: 'top',
    })
  }
})
</script>

<template>
  <q-form @submit="onSubmit" class="q-mt-md">
    <q-input
      v-model="email.value.value"
      type="email"
      placeholder="Enter user email to make them an admin"
      :error="!!email.errorMessage.value"
      :error-message="email.errorMessage.value"
      dense
    />
    <q-btn
      label="Submit"
      color="primary"
      rounded
      type="submit"
      class="q-mt-md"
    />
  </q-form>
</template>

<style scoped lang="scss"></style>
