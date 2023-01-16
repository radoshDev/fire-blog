<script setup lang="ts">
import { signInWithEmailAndPassword } from 'firebase/auth'
import type { AuthError } from 'firebase/auth'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import type { ErrCode } from '@/types'
import { auth } from '@/firebase/firebaseInit'
import { getErrorMessage } from '@/firebase/getErrorMessage'
import type { FormInput } from '@/types/Form'
import { RouteName } from '@/router/routes'
import { useForm, useField } from 'vee-validate'
import TextField from './fields/TextField.vue'
import { ref } from 'vue'
import {
  loginValidationScheme,
  type LoginFormValues,
} from '@/schemas/validationSchemas'

const $q = useQuasar()
const router = useRouter()
const { handleSubmit, resetForm } = useForm<LoginFormValues>({
  validationSchema: loginValidationScheme,
})

const isLoading = ref(false)

const onSubmit = handleSubmit(async ({ email, password }) => {
  try {
    isLoading.value = true
    await signInWithEmailAndPassword(auth, email, password)
    resetForm()
    router.push({ name: RouteName.HOME })
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

const formInputs: FormInput<LoginFormValues, 'icon'> = {
  email: {
    label: 'Email',
    value: useField('email'),
    type: 'email',
    icon: 'mail',
  },
  password: {
    label: 'Password',
    value: useField('password'),
    type: 'password',
    icon: 'lock',
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
    <RouterLink :to="{ name: RouteName.FORGOT_PASSWORD }" class="underline">
      Forgot your password?
    </RouterLink>
    <q-btn
      color="black"
      rounded
      label="Sign In"
      type="submit"
      :loading="isLoading"
    />
  </q-form>
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
