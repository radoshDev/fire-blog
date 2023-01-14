import type { ValueOf } from '@/types'
import type { RouteRecordRaw } from 'vue-router'
const HomeView = () => import('@/views/HomeView.vue')
const BlogsView = () => import('@/views/BlogsView.vue')
const CreatePostView = () => import('@/views/CreatePost.vue')
const ProfileView = () => import('@/views/ProfileView.vue')
const AdminView = () => import('@/views/AdminView.vue')
const LoginView = () => import('@/views/auth/LoginView.vue')
const RegisterView = () => import('@/views/auth/RegisterView.vue')
const ForgotPasswordView = () => import('@/views/auth/ForgotPasswordView.vue')

export const RouteName = {
  HOME: 'home',
  ABOUT: 'about',
  BLOGS: 'blogs',
  CREATE_POST: 'create-post',
  LOGIN: 'login',
  REGISTER: 'register',
  FORGOT_PASSWORD: 'forgot-password',
  PROFILE: 'profile',
  ADMIN: 'admin',
} as const

export type RouteRecord = Omit<RouteRecordRaw, 'name'> & {
  name: ValueOf<typeof RouteName>
}

const routes: RouteRecord[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Home',
      requiresAuth: false,
    },
  },
  {
    path: '/blogs',
    name: 'blogs',
    component: BlogsView,
    meta: {
      title: 'Blogs',
      requiresAuth: false,
    },
  },
  {
    path: '/create-post',
    name: 'create-post',
    component: CreatePostView,
    meta: {
      title: 'Create Post',
      requiresAuth: true,
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    meta: { title: 'Profile', requiresAuth: true },
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    meta: { title: 'Admin', requiresAuth: true },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      requiresAuth: false,
      title: 'Login',
    },
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: {
      requiresAuth: false,
      title: 'Registration',
    },
  },
  {
    path: '/password-recovery',
    name: 'forgot-password',
    component: ForgotPasswordView,
    meta: {
      requiresAuth: false,
      title: 'Password Recovery',
    },
  },
]

export default routes
