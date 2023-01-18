import type { Profile } from './User'

export type Post = {
  title: string
  descriptionHtml: string
  coverPhoto: string
  date: string
  profileId: Profile['id']
  id: string
}

export type PostFields = {
  htmlDescription: string
  title: string
  photo: File | null
  photoPreviewUrl: string
}
