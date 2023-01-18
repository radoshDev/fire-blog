import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Post, PostFields } from '@/types/Post'

export const usePostsStore = defineStore('posts', () => {
  const posts = reactive<Post[]>([
    {
      title: 'Blog Card #1',
      coverPhoto: 'stock-1',
      date: 'May 1, 2022',
      id: '1',
      descriptionHtml: 'text content',
      profileId: '1',
    },
    {
      title: 'Blog Card #2',
      coverPhoto: 'stock-2',
      date: 'May 1, 2022',
      id: '2',
      descriptionHtml: 'text content',
      profileId: '1',
    },
    {
      title: 'Blog Card #3',
      coverPhoto: 'stock-3',
      date: 'May 1, 2022',
      id: '3',
      descriptionHtml: 'text content',
      profileId: '1',
    },
    {
      title: 'Blog Card #4',
      coverPhoto: 'stock-4',
      date: 'May 1, 2022',
      id: '4',
      descriptionHtml: 'text content',
      profileId: '1',
    },
  ])
  const recentPosts = reactive<Post[]>([
    {
      title: 'Blog Card #1',
      coverPhoto: 'stock-1',
      date: 'May 1, 2022',
      id: '1',
      descriptionHtml: 'text content',
      profileId: '1',
    },
    {
      title: 'Blog Card #2',
      coverPhoto: 'stock-2',
      date: 'May 1, 2022',
      id: '2',
      descriptionHtml: 'text content',
      profileId: '1',
    },
    {
      title: 'Blog Card #3',
      coverPhoto: 'stock-3',
      date: 'May 1, 2022',
      id: '3',
      descriptionHtml: 'text content',
      profileId: '1',
    },
  ])
  const isEditPost = ref(false)
  const blog = ref<PostFields>({
    htmlDescription: '',
    title: '',
    photo: null,
    photoPreviewUrl: '',
  })
  return { posts, recentPosts, isEditPost, blog }
})
