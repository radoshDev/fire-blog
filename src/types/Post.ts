import type { Profile } from './User'
import type { Timestamp } from 'firebase/firestore'

export type Post = {
  title: string
  descriptionHtml: string
  coverPhoto: string
  date: Timestamp
  profileId: Profile['id']
  id: string
}

export type PostFields = {
  htmlDescription: string
  title: string
  photo: File | null
  photoPreviewUrl: string
}
