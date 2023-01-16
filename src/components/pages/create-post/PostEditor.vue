<script setup lang="ts">
import { ref } from 'vue'
import type { QEditor } from 'quasar'
import ModalBasic from '@/components/ui/ModalBasic.vue'
import { usePostsStore } from '@/stores/postStore'
import PostEditorImage from './PostEditorImage.vue'

const postStore = usePostsStore()
const editor = ref<QEditor>()

const isImage = ref(false)

function showImageGallery() {
  isImage.value = true
}
</script>

<template>
  <q-editor
    v-model="postStore.blog.htmlDescription"
    ref="editor"
    placeholder="Write you blog body here..."
    class="post-editor"
    min-height="20rem"
    max-height="50vh"
    :toolbar="[
      [
        'bold',
        {
          label: $q.lang.editor.formatting,
          icon: $q.iconSet.editor.formatting,
          list: 'no-icons',
          options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code'],
        },
        {
          label: $q.lang.editor.fontSize,
          icon: $q.iconSet.editor.fontSize,
          fixedLabel: true,
          fixedIcon: true,
          list: 'no-icons',
          options: [
            'size-1',
            'size-2',
            'size-3',
            'size-4',
            'size-5',
            'size-6',
            'size-7',
          ],
        },
      ],
      ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
      ['link', 'image'],
      ['removeFormat', 'viewsource'],
    ]"
    :definitions="{
      image: {
        icon: 'image',
        tip: 'Insert image',
        handler: showImageGallery,
      },
    }"
  />
  <ModalBasic v-model="isImage" hide-actions>
    <PostEditorImage :editor="editor" @close-modal="isImage = false" />
  </ModalBasic>
</template>

<style lang="scss">
.post-editor {
  margin-bottom: 2rem;
  img {
    width: initial;
  }
  ul,
  li {
    list-style: initial;
    margin-left: 2rem;
  }
}
</style>
