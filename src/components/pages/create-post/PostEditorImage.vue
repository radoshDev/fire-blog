<script setup lang="ts">
import { ref, computed } from 'vue'
import type { QEditor } from 'quasar'
import { ref as fRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '@/firebase/firebaseInit'
import { imageUrlValidationField } from '@/schemas/validationSchemas'
import { handlerRejectFile } from '@/utils/handlerRejectFile'
import { useField } from 'vee-validate'
import { FireStoragePath } from '@/utils/constants'

const props = defineProps<{ editor: QEditor | undefined }>()
const emit = defineEmits(['closeModal'])

const imageFile = ref<File | null>(null)
const imageUrl = ref('')
const imageFileError = ref<string>('')
const isImageError = computed(() => imageFileError.value.length > 0)
const isImageUploading = ref(false)

const imageSrc = useField<string>('image-url', imageUrlValidationField)

const showPreviewImage = computed(
  () =>
    (!!imageUrl.value || !!imageSrc.value.value) && !imageSrc.errorMessage.value
)

const onUploadReject = handlerRejectFile(imageFileError)
function onImagePreviewError() {
  imageSrc.setErrors('The image with this URL does not load. Change, please')
}

function handleUpdateImage(file: File | undefined) {
  if (file) {
    imageUrl.value = URL.createObjectURL(file)
  } else {
    imageUrl.value = ''
  }
  imageFileError.value = ''
}

async function handleInsertImage() {
  try {
    if (!props.editor) return
    if (imageFile.value) {
      isImageUploading.value = true

      const storageRef = fRef(
        storage,
        `${FireStoragePath.BLOG_BODY_IMAGES}/${imageFile.value.name}`
      )
      const response = await uploadBytes(storageRef, imageFile.value)
      const imageUrl = await getDownloadURL(response.ref)
      props.editor.runCmd('insertHTML', `<img src="${imageUrl}"/>`)

      isImageUploading.value = false
      emit('closeModal')
    }
    if (imageSrc.value.value) {
      props.editor.runCmd('insertHTML', `<img src="${imageSrc.value.value}"/>`)
      emit('closeModal')
    }
  } catch (_error) {
    const error = _error as Error
    console.error(error.message)

    isImageUploading.value = false
  }
}
</script>

<template>
  <div class="post-editor-image">
    <q-file
      class="input-field"
      :class="{ 'q-mb-sm': isImageError }"
      v-model="imageFile"
      :label="imageFile ? undefined : 'Select Image'"
      clearable
      dense
      outlined
      dark
      rounded
      bg-color="dark"
      label-color="white"
      accept=".png, .jpg, .jpeg"
      :error="isImageError"
      :error-message="imageFileError"
      @rejected="onUploadReject"
      @update:model-value="handleUpdateImage"
    />
    <div class="divider">
      <q-separator />
      <div>or</div>
      <q-separator />
    </div>
    <q-input
      v-model="imageSrc.value.value"
      :error="!!imageSrc.errorMessage.value"
      :error-message="imageSrc.errorMessage.value"
      :debounce="500"
      outlined
      label="Link to image"
      dense
      rounded
      class="q-my-lg"
    />
    <q-img
      v-if="showPreviewImage"
      :src="imageUrl || imageSrc.value.value"
      @error="onImagePreviewError"
      class="q-mb-md"
      height="250px"
      fit="contain"
    />
    <q-btn
      label="Insert image"
      rounded
      color="dark"
      :loading="isImageUploading"
      :disable="!imageFile && !imageSrc.value.value"
      @click="handleInsertImage"
    />
  </div>
</template>

<style lang="scss">
.post-editor-image {
  min-width: 400px;
  .input-field {
    .q-field__native {
      & > div {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
  .divider {
    align-items: center;
    display: flex;
    gap: 1rem;
    .q-separator {
      flex: 1;
    }
  }
}
</style>
