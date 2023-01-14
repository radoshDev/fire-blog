import type { FieldContext } from 'vee-validate'

export type InputType =
  | 'email'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'url'

export type FormInput<T extends object, Icon extends string = ''> = {
  [K in keyof T]: {
    label: string
    value: FieldContext<T[K]>
    type: InputType
  } & (Icon extends 'icon' ? { icon: string } : {})
}
