export type User = {
  email: string
  firstName: string
  lastName: string
  userName: string
}

export type Profile = User & {
  id: string
  initials: string
  isAdmin: boolean
}
