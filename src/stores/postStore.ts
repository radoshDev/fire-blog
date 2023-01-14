import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Post } from '@/types/Post'

export const usePostsStore = defineStore('posts', () => {
  const postsCard = ref<Post[]>([
    {
      title: 'Blog Card #1',
      coverPhoto: 'stock-1',
      date: 'May 1, 2022',
      id: 1,
      textContent: 'text content',
    },
    {
      title: 'Blog Card #2',
      coverPhoto: 'stock-2',
      date: 'May 1, 2022',
      textContent: 'text content',
      id: 2,
    },
    {
      title: 'Blog Card #3',
      coverPhoto: 'stock-3',
      date: 'May 1, 2022',
      textContent: 'text content',
      id: 3,
    },
    {
      title: 'Blog Card #4',
      coverPhoto: 'stock-4',
      date: 'May 1, 2022',
      textContent: 'text content',
      id: 3,
    },
  ])

  const blogPosts = ref<Post[]>([
    {
      title: 'This is Filler Title 1',
      textContent: 'This is a filler blog post content',
      coverPhoto: 'beautiful-stories',
      date: '',
      id: 1,
    },
    {
      title: 'This is Filler Title 2',
      textContent: 'This is a filler blog post content',
      coverPhoto: 'designed-for-everyone',
      date: '',
      id: 2,
    },
  ])
  const isEditPost = ref(false)
  const blog = ref({
    html: '',
    title: '',
    photo: null as File | null,
    photoPreviewUrl: '',
  })
  return { postsCard, blogPosts, isEditPost, blog }
})
