import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { collection, getFirestore } from 'firebase/firestore'
import { getFunctions } from 'firebase/functions'
import { getStorage } from 'firebase/storage'
import type { DocumentData, CollectionReference } from 'firebase/firestore'
import type { User } from '@/types/User'
import type { Post } from '@/types/Post'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const firebaseApp = initializeApp(firebaseConfig)

export const auth = getAuth(firebaseApp)

const fireStore = getFirestore(firebaseApp)

const getCollection = <T = DocumentData>(collectionName: string) => {
  return collection(fireStore, collectionName) as CollectionReference<T>
}

export const db = {
  users: getCollection<User>('users'),
  blogPosts: getCollection<Omit<Post, 'id'>>('blogPosts'),
}

export const functions = getFunctions(firebaseApp)
export const storage = getStorage(firebaseApp)

export default db
