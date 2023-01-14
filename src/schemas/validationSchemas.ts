import zod from 'zod'
import { toFormValidator, toFieldValidator } from '@vee-validate/zod'

const email = zod
  .string({ required_error: 'Email is required' })
  .email('Must be a valid email')

const password = zod
  .string({ required_error: 'Password is required' })
  .min(8, 'Too short')

const userName = zod
  .string({ required_error: 'Username is required' })
  .regex(/^[a-z0-9_-]+$/gi, 'allow only letters, numbers and symbol _ and -')
  .min(1, 'Username is required')
  .max(50, 'Max length 50 characters')

const name = zod
  .string({ required_error: 'This field is required' })
  .trim()
  .min(1, 'This field is required')
  .max(50, 'Max length 50 characters')

const imageUrl = zod.string().url('Invalid URL').optional().or(zod.literal(''))

/* Login */
const loginSchema = zod.object({
  email,
  password,
})
export type LoginFormValues = zod.infer<typeof loginSchema>
export const loginValidationScheme = toFormValidator(loginSchema)

/* Registration */
const registerSchema = zod.object({
  firstName: name,
  lastName: name,
  userName: userName,
  email,
  password,
})
export type RegisterFormValues = zod.infer<typeof registerSchema>
export const registerValidationScheme = toFormValidator(registerSchema)

/* Reset Password */
const resetPwdSchema = zod.object({
  email,
})
export type ResetPwdFormValues = zod.infer<typeof resetPwdSchema>
export const resetPwdValidationScheme = toFormValidator(resetPwdSchema)

/* Account Setting */
const accountChangesSchema = zod.object({
  firstName: name,
  lastName: name,
  userName: userName,
  email,
})
export type AccountChangesValues = zod.infer<typeof accountChangesSchema>
export const accountChangesValidationSchema =
  toFormValidator(accountChangesSchema)

/* Administration */
const adminSchema = zod.object({
  email,
})
export type AdminFormValues = zod.infer<typeof adminSchema>
export const adminValidationScheme = toFormValidator(adminSchema)

/* Image Url Field */

export const imageUrlValidationField = toFieldValidator(imageUrl)
