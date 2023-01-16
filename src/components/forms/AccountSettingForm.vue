<script setup lang="ts">
import { doc, updateDoc } from 'firebase/firestore'
import type { FormInput } from '@/types/Form'
import { useForm, useField } from 'vee-validate'
import { useUserStore } from '@/stores/userStore'
import { useQuasar } from 'quasar'
import db from '@/firebase/firebaseInit'
import { ref } from 'vue'
import {
  accountChangesValidationSchema,
  type AccountChangesValues,
} from '@/schemas/validationSchemas'

const $q = useQuasar()

const { handleSubmit, setFieldValue } = useForm<AccountChangesValues>({
  validationSchema: accountChangesValidationSchema,
})
const userStore = useUserStore()
const isLoading = ref(false)

const onSubmit = handleSubmit(async (values) => {
  try {
    isLoading.value = true
    const storeProfile = userStore.profile
    const { firstName, lastName, userName } = values
    if (
      firstName === storeProfile?.firstName &&
      lastName === storeProfile.lastName &&
      userName === storeProfile.userName
    )
      return

    const docRef = doc(db.users, userStore.profile?.id)
    await updateDoc(docRef, { firstName, lastName, userName })

    userStore.updateProfile(values)

    $q.notify({
      message: 'Changes were saved!',
      position: 'top',
      color: 'positive',
    })
  } catch (error) {
    $q.notify({
      message: 'Something went wrong. Try again later...',
      color: 'negative',
      position: 'top-left',
    })
  } finally {
    isLoading.value = false
  }
})

const formInputs: FormInput<AccountChangesValues> = {
  firstName: {
    label: 'First Name:',
    type: 'text',
    value: useField(
      'firstName',
      {},
      { initialValue: userStore.profile?.firstName }
    ),
  },
  lastName: {
    label: 'Last Name:',
    type: 'text',
    value: useField(
      'lastName',
      {},
      { initialValue: userStore.profile?.lastName }
    ),
  },
  userName: {
    label: 'Username:',
    type: 'text',
    value: useField(
      'userName',
      {},
      { initialValue: userStore.profile?.userName }
    ),
  },
  email: {
    label: 'Email:',
    type: 'email',
    value: useField('email', {}, { initialValue: userStore.profile?.email }),
  },
}

userStore.$subscribe((mut, state) => {
  if (!state.profile) return
  ;(Object.keys(formInputs) as (keyof typeof formInputs)[]).forEach((key) => {
    setFieldValue(key, state.profile?.[key] || '')
  })
})
</script>

<template>
  <q-form @submit="onSubmit" class="account-setting-form">
    <q-input
      v-for="(input, name) in formInputs"
      :key="name"
      :type="input.type"
      :readonly="name === 'email'"
      v-model="input.value.value.value"
      :label="input.label"
      :error="!!input.value.errorMessage.value"
      :error-message="input.value.errorMessage.value"
      stack-label
      dense
    />
    <q-btn
      color="black"
      rounded
      label="Save Changes"
      type="submit"
      :loading="isLoading"
    />
  </q-form>
</template>

<style lang="scss">
.account-setting-form {
  width: 100%;
  text-align: center;
  .q-field {
    margin-bottom: 1rem;
    .q-field__native {
      padding-top: 20px;
      padding-left: 5px;
    }
    .q-field__label {
      color: #000;
      font-weight: 500;
    }
  }
}
</style>
