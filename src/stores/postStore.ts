import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { getDocs, query, orderBy } from 'firebase/firestore'
import type { Post, PostFields } from '@/types/Post'
import db from '@/firebase/firebaseInit'
import type { QueryData } from '@/types'

export const usePostsStore = defineStore('posts', () => {
  const posts = reactive<QueryData<Post[]>>({
    data: [],
    isLoading: false,
    error: '',
  })
  const isEditPost = ref(false)
  const blog = ref<PostFields>({
    htmlDescription: '',
    title: '',
    photo: null,
    photoPreviewUrl: '',
  })

  async function getPosts() {
    try {
      posts.isLoading = true
      posts.error = ''
      const q = query(db.blogPosts, orderBy('date', 'desc'))
      const queryResult = await getDocs(q)

      const newPosts: Post[] = []

      queryResult.forEach((item) => {
        if (item.exists()) {
          newPosts.push({ ...item.data(), id: item.id })
        }
      })
      posts.data = newPosts
    } catch (_error) {
      const error = _error as Error
      console.log(error)

      posts.error = error.message
    } finally {
      posts.isLoading = false
    }
  }

  function resetBlog() {
    blog.value = {
      htmlDescription: '',
      title: '',
      photo: null,
      photoPreviewUrl: '',
    }
  }
  return { posts, isEditPost, blog, getPosts, resetBlog }
})
