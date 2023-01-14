<script setup lang="ts">
import {
  getAuth,
  createUserWithEmailAndPassword,
  type AuthError,
} from 'firebase/auth'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import db from '@/firebase/firebaseInit'
import { doc, setDoc } from 'firebase/firestore'
import { useForm, useField } from 'vee-validate'
import { registerValidationScheme } from '../../schemas/validationSchemasationSchemas'
import type { RegisterFormValues } from '../../schemas/validationSchemasationSchemas'
import type { FormInput } from '@/types/Form'
import TextField from './fields/TextField.vue'
import { RouteName } from '@/router/routes'
import { ref } from 'vue'
import { getErrorMessage } from '@/firebase/getErrorMessage'
import type { ErrCode } from '@/types'

const router = useRouter()
const $q = useQuasar()

const isLoading = ref(false)
const { handleSubmit } = useForm<RegisterFormValues>({
  validationSchema: registerValidationScheme,
})

const onSubmit = handleSubmit(async (values) => {
  try {
    isLoading.value = true
    const { email, password, firstName, lastName, userName } = values
    const auth = getAuth()
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    const user = userCredentials.user
    await setDoc(doc(db.users, user.uid), {
      email,
      firstName,
      lastName,
      userName,
    })
    $q.notify({
      message: `User ${email} successfully created`,
      position: 'top-left',
      color: 'positive',
    })
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

const formInputs: FormInput<RegisterFormValues, 'icon'> = {
  firstName: {
    icon: 'person',
    label: 'First Name',
    type: 'text',
    value: useField('firstName'),
  },
  lastName: {
    icon: 'person',
    label: 'Last Name',
    type: 'text',
    value: useField('lastName'),
  },
  userName: {
    icon: 'person',
    label: 'Username',
    type: 'text',
    value: useField('userName'),
  },
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
      v-model.trim="input.value.value.value"
      :label="input.label"
      :type="input.type"
      :icon="input.icon"
      :name="name"
      :error="input.value.errorMessage.value"
      autocomplete="new-password"
      class="input-field"
    />
    <q-btn color="black" rounded label="Sign Up" type="submit" />
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
