import { ref } from 'vue'
import { defineStore } from 'pinia'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/firebase/firebaseInit'
import getEntries from '@/utils/getEntries'
import type { Profile, User } from '@/types/User'
import type { WithOptional } from '@/types'
import { getInitials } from '@/utils/getInitials'

export const useUserStore = defineStore('user', () => {
  const profile = ref<Profile | null>(null)
  const isAuth = ref(false)

  function updateProfile(newValues: WithOptional<User, 'email'>) {
    if (!profile.value) return
    for (const [key, value] of getEntries(newValues)) {
      profile.value[key] = value
    }
    profile.value.initials = getInitials(
      newValues.firstName,
      newValues.lastName
    )
  }

  async function getCurrentUser() {
    const userId = auth.currentUser?.uid
    const tokenResult = await auth.currentUser?.getIdTokenResult()
    const isAdmin = tokenResult?.claims.admin

    if (!userId) return

    const docRef = doc(db.users, userId)
    const userDoc = await getDoc(docRef)

    const userDBData = userDoc.data()
    if (!userDBData) return

    profile.value = {
      ...userDBData,
      id: userDoc.id,
      isAdmin: !!isAdmin,
      initials: getInitials(userDBData.firstName, userDBData.lastName),
    }
  }
  return { profile, isAuth, getCurrentUser, updateProfile }
})
