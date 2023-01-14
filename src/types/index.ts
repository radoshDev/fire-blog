import type { AuthErrorCodes } from 'firebase/auth'

export type ValueOf<T extends Object> = T[keyof T]

export type ErrCode = ValueOf<typeof AuthErrorCodes>

type CustomOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type WithOptional<T, K extends keyof T> = CustomOmit<T, K> &
  Partial<Pick<T, K>>

export type MessageResponse = { message: string }
