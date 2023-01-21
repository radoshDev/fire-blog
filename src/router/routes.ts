import type { ValueOf } from '@/types'
import type { RouteName } from '@/utils/constants'
import type { RouteRecordRaw } from 'vue-router'
import {
  requiredAuthGuard,
  adminGuard,
  requiredNotAuthGuard,
} from './routesGuards'
const HomeView = () => import('@/views/HomeView.vue')
const BlogsView = () => import('@/views/BlogsView.vue')
const CreatePostView = () => import('@/views/CreatePostView.vue')
const PreviewPostView = () => import('@/views/PreviewPostView.vue')
const BlogPostView = () => import('@/views/BlogPostView.vue')
const ProfileView = () => import('@/views/ProfileView.vue')
const AdminView = () => import('@/views/AdminView.vue')
const LoginView = () => import('@/views/auth/LoginView.vue')
const RegisterView = () => import('@/views/auth/RegisterView.vue')
const ForgotPasswordView = () => import('@/views/auth/ForgotPasswordView.vue')

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
    },
  },
  {
    path: '/blogs',
    name: 'blogs',
    component: BlogsView,
    meta: {
      title: 'Blogs',
    },
  },
  {
    path: '/create-post',
    name: 'create-post',
    component: CreatePostView,
    beforeEnter: adminGuard,
    meta: {
      title: 'Create Post',
    },
  },
  {
    path: '/preview-post',
    name: 'preview-post',
    component: PreviewPostView,
    beforeEnter: adminGuard,
    meta: {
      title: 'Preview Post',
    },
  },
  {
    path: '/post/:id',
    name: 'view-post',
    component: BlogPostView,
    beforeEnter: requiredAuthGuard,
    meta: {
      title: 'Preview Post',
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    beforeEnter: requiredAuthGuard,
    meta: { title: 'Profile', requiresAuth: true },
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    beforeEnter: adminGuard,
    meta: { title: 'Admin' },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    beforeEnter: requiredNotAuthGuard,
    meta: {
      title: 'Login',
    },
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    beforeEnter: requiredNotAuthGuard,
    meta: {
      title: 'Registration',
    },
  },
  {
    path: '/password-recovery',
    name: 'forgot-password',
    component: ForgotPasswordView,
    beforeEnter: requiredNotAuthGuard,
    meta: {
      title: 'Password Recovery',
    },
  },
]

export default routes
