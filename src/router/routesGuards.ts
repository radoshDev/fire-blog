import { auth } from '@/firebase/firebaseInit'
import { RouteName } from '@/utils/constants'
import type { NavigationGuard } from 'vue-router'

export const requiredAuthGuard: NavigationGuard = (to, from, next) => {
  const user = auth.currentUser
  if (!user) {
    next({ name: RouteName.LOGIN })
    return
  }
  next()
}

export const requiredNotAuthGuard: NavigationGuard = (to, from, next) => {
  const user = auth.currentUser

  if (user) {
    next({ name: RouteName.HOME })
    return
  }
  next()
}

export const adminGuard: NavigationGuard = async (to, from, next) => {
  const user = auth.currentUser

  if (!user) {
    next({ name: RouteName.LOGIN })
    return
  }
  const tokenResult = await user?.getIdTokenResult()
  const isAdmin = tokenResult?.claims.admin

  if (isAdmin !== true) {
    next({ name: RouteName.HOME })
    return
  }
  next()
}
