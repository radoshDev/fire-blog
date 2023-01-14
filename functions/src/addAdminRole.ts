import { https } from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()

export const addAdminRole = https.onCall(
  async (data: { email: string }, context) => {
    try {
      console.log('uid', context.auth?.uid)

      if (!context.auth) {
        throw new https.HttpsError(
          'unauthenticated',
          'Only authenticated users can add admin role'
        )
      }

      if (!context.auth.token?.['admin']) {
        throw new https.HttpsError(
          'unavailable',
          'Only administrators can add admin role'
        )
      }

      const user = await admin.auth().getUserByEmail(data.email)

      if (user.customClaims?.['admin']) {
        throw new https.HttpsError(
          'already-exists',
          `User with email: ${data.email} already admin!`
        )
      }
      await admin.auth().setCustomUserClaims(user.uid, { admin: true })

      return {
        message: `Success! ${data.email} has been made an admin`,
      }
    } catch (_error) {
      const error = _error as any
      if (error.code === 'auth/user-not-found') {
        throw new https.HttpsError(
          'not-found',
          `User with email:${data.email} does not exist!`
        )
      }
      throw new https.HttpsError('unknown', error.message)
    }
  }
)
