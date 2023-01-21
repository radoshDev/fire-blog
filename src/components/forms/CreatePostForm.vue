<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { ref as fRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { doc, setDoc, Timestamp, updateDoc } from 'firebase/firestore'
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
const { query } = useRoute()
const postId = query['edit']

async function uploadPost() {
  const { photo, photoPreviewUrl } = postStore.blog
  if (!userStore.profile) return
  if (postId && typeof postId !== 'string') return
  if (!postStore.blog.title) {
    $q.notify({
      color: 'negative',
      message: 'Please make sure Blog Title has been filled!',
      position: 'top',
    })
    return
  }
  if (!photo && !photoPreviewUrl) {
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
    let imageUrl = photoPreviewUrl
    if (photo) {
      const storageRef = fRef(
        storage,
        `${FireStoragePath.BLOG_COVER_IMAGES}/${photo.name}`
      )
      const response = await uploadBytes(storageRef, photo)
      imageUrl = await getDownloadURL(response.ref)
    }
    const newDoc = doc(db.blogPosts)
    const descriptionHtml = getSanitizedHtml(postStore.blog.htmlDescription)
    if (postId) {
      const blogDoc = doc(db.blogPosts, postId)
      await updateDoc(blogDoc, {
        coverPhoto: imageUrl,
        descriptionHtml,
        title: postStore.blog.title,
      })
      const blogToUpdate = postStore.posts.data.find(
        (item) => item.id === postId
      )
      if (blogToUpdate) {
        blogToUpdate.coverPhoto = imageUrl
        blogToUpdate.descriptionHtml = descriptionHtml
        blogToUpdate.title = postStore.blog.title
      }
    } else {
      const newPost = {
        coverPhoto: imageUrl,
        date: Timestamp.now(),
        descriptionHtml,
        title: postStore.blog.title,
        profileId: userStore.profile.id,
      }
      await setDoc(newDoc, newPost)
      postStore.posts.data.unshift({ ...newPost, id: newDoc.id })
    }
    $q.notify({
      color: 'positive',
      message: `Post successfully ${postId ? 'updated' : 'created'}!`,
      position: 'top',
    })

    postStore.resetBlog()
    router.push({
      name: RouteName.VIEW_POST,
      params: { id: postId || newDoc.id },
    })
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
      <q-btn
        :label="postId ? 'Update Blog' : 'Publish Blog'"
        color="primary"
        rounded
        type="submit"
      />
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
