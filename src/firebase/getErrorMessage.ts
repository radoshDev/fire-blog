import type { ErrCode } from '@/types'

export const getErrorMessage = (errorCode: ErrCode): string => {
  switch (errorCode) {
    case 'auth/user-not-found':
      return 'This email does not exist'
    case 'auth/wrong-password':
      return 'Incorrect password'
    default:
      console.log(errorCode)
      return 'Something went wrong. Try again'
  }
}
