<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { ref as fRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { doc, setDoc, Timestamp } from 'firebase/firestore'
import db, { storage } from '@/firebase/firebaseInit'
import { usePostsStore } from '@/stores/postStore'
import ImageBlock from '@/components/pages/create-post/ImageBlock.vue'
import PostEditor from '@/components/pages/create-post/PostEditor.vue'
import { RouteName } from '@/router/routes'
import { FireStoragePath } from '@/utils/constants'
import { useUserStore } from '@/stores/userStore'
import { getSanitizedHtml } from '@/utils/getSanitizedHtml'

const $q = useQuasar()
const postStore = usePostsStore()
const userStore = useUserStore()
const router = useRouter()

async function uploadPost() {
  const coverPhotoFile = postStore.blog.photo
  if (!userStore.profile) return
  if (!postStore.blog.title) {
    $q.notify({
      color: 'negative',
      message: 'Please make sure Blog Title has been filled!',
      position: 'top',
    })
    return
  }
  if (!coverPhotoFile) {
    $q.notify({
      color: 'negative',
      message: 'Please make sure you uploaded Blog Image',
      position: 'top',
    })
    return
  }
  if (!postStore.blog.htmlDescription) {
    $q.notify({
      color: 'negative',
      message: 'Please make sure Blog Body has been filled!',
      position: 'top',
    })
    return
  }
  try {
    $q.loading.show()
    const storageRef = fRef(
      storage,
      `${FireStoragePath.BLOG_COVER_IMAGES}/${coverPhotoFile.name}`
    )
    const response = await uploadBytes(storageRef, coverPhotoFile)
    const imageUrl = await getDownloadURL(response.ref)
    const blogDoc = doc(db.blogPosts)
    const descriptionHtml = getSanitizedHtml(postStore.blog.htmlDescription)
    await setDoc(blogDoc, {
      coverPhoto: imageUrl,
      date: Timestamp.now(),
      descriptionHtml,
      title: postStore.blog.title,
      profileId: userStore.profile.id,
    })
    $q.notify({
      color: 'positive',
      message: 'Post successfully created!',
      position: 'top',
    })
    router.push({ name: RouteName.VIEW_POST, params: { id: blogDoc.id } })
  } catch (_error) {
    const error = _error as Error
    $q.notify({
      color: 'negative',
      message: error.message,
      position: 'top',
    })
  } finally {
    $q.loading.hide()
  }
}
</script>

<template>
  <q-form class="q-my-lg" @submit.prevent="uploadPost">
    <q-input
      v-model="postStore.blog.title"
      dense
      placeholder="Enter Blog Title"
      outlined
      class="q-mb-lg"
    />
    <ImageBlock />
    <PostEditor />
    <div class="actions">
      <q-btn label="Publish Blog" color="primary" rounded type="submit" />
      <q-btn
        label="Post Preview"
        rounded
        :to="{ name: RouteName.PREVIEW_POST }"
      />
    </div>
  </q-form>
</template>

<style scoped lang="scss">
.actions {
  display: flex;
  gap: 2rem;
}
</style>
