<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { doc, deleteDoc } from 'firebase/firestore'
import { useQuasar } from 'quasar'
import { usePostsStore } from '@/stores/postStore'
import type { Post } from '@/types/Post'
import { RouteName } from '@/utils/constants'
import { getFormattedDate } from '@/utils/getFormattedDate'
import db, { auth } from '@/firebase/firebaseInit'

const props = defineProps<{ post: Post }>()

const $q = useQuasar()
const router = useRouter()
const postStore = usePostsStore()
const postedAt = computed(() => getFormattedDate(props.post.date.toDate()))

async function handleDeletePost() {
  try {
    $q.loading.show()
    const tokenResult = await auth.currentUser?.getIdTokenResult()
    const isAdmin = tokenResult?.claims.admin
    if (!isAdmin) {
      $q.notify({
        message: 'Forbidden! Only administrators can delete posts',
        color: 'negative',
        position: 'top',
      })
      return
    }
    await deleteDoc(doc(db.blogPosts, props.post.id))
    $q.notify({
      message: 'Post successfully deleted!',
      color: 'positive',
      position: 'top',
    })
    postStore.posts.data = postStore.posts.data.filter(
      (item) => item.id !== props.post.id
    )
  } catch (error) {
    $q.notify({
      message: 'Something went wrong. Try again later',
      color: 'negative',
      position: 'top',
    })
  } finally {
    $q.loading.hide()
  }
}

function handleEditPost() {
  const { coverPhoto, descriptionHtml, title, id } = props.post
  postStore.blog = {
    htmlDescription: descriptionHtml,
    photo: null,
    photoPreviewUrl: coverPhoto,
    title,
  }
  router.push({ name: RouteName.CREATE_POST, query: { edit: id } })
}
</script>

<template>
  <q-card class="blog-card">
    <q-img :src="post.coverPhoto" :alt="post.title" height="200px" />
    <q-card-actions class="card-actions" v-if="postStore.isEditPost">
      <q-btn
        icon="edit"
        size="sm"
        round
        title="Edit Post"
        style="background: #fff"
        @click="handleEditPost"
      />
      <q-btn
        @click="handleDeletePost"
        icon="delete_forever"
        size="sm"
        round
        style="background: #fff"
        title="Delete Post"
      />
    </q-card-actions>
    <q-card-section>
      <div class="text-h4 q-mb-sm">{{ post.title }}</div>
      <div class="text-body1 text-weight-bold">Posted on: {{ postedAt }}</div>
    </q-card-section>
    <q-card-actions class="q-px-md">
      <q-btn
        flat
        :to="{ name: RouteName.VIEW_POST, params: { id: post.id } }"
        label="View The Post"
        size="sm"
        padding="xs"
        dense
        icon-right="arrow_forward"
      />
    </q-card-actions>
  </q-card>
</template>

<style scoped lang="scss">
.blog-card {
  position: relative;
  max-width: 330px;
  width: 100%;
  &:hover {
    .card-actions {
      opacity: 1;
    }
  }
  .card-actions {
    opacity: 0;
    position: absolute;
    top: 0;
    right: 0;
    transition: opacity 0.3s ease;
  }
}
</style>
