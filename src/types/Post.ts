export type Post = {
  title: string
  textContent: string
  coverPhoto: string
  date: string
  id: number
}

export type BlogPost = {
  htmlDescription: string
  title: string
  photo: File | null
  photoPreviewUrl: string
}
