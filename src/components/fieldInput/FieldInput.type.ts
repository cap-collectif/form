import type { SyntheticEvent } from 'react'
import type {
  CheckboxProps,
  TextAreaProps,
  InputProps,
  SwitchProps,
  InputNumberProps,
  CodeInputProps,
} from '@cap-collectif/ui'
import type { MultipleCheckboxProps } from '../MultipleCheckbox'
import type { UploaderProps } from '../uploader'
import type { SelectProps } from '../Select'
import type {
  Control,
  RegisterOptions,
  UseControllerProps,
} from 'react-hook-form'
import { FlagSelectProps } from '../FlagSelect'

type Rules = {
  validate?: RegisterOptions['validate']
  pattern?: RegisterOptions['pattern']
  setValueAs?: RegisterOptions['setValueAs']
}

export type BaseField = {
  name: UseControllerProps['name']
  control: Control<any>
  onChange?: (event: SyntheticEvent) => void
  defaultValue?: any
  rules?: Rules
}

export type AllFieldTypes =
  | FieldSelect
  | FieldCheckbox
  | FieldTextArea
  | FieldText
  | FieldSwitch
  | FieldUploader
  | FieldNumber
  | FieldCodeInput
  | FieldFlagSelect

export type FieldSelect = SelectProps & {
  type: 'select'
}

export type FieldCheckbox = (CheckboxProps | MultipleCheckboxProps) & {
  type: 'checkbox'
}

export type FieldTextArea = {
  type: 'textarea'
} & TextAreaProps

export type FieldText = {
  type: 'text' | 'email' | 'password' | 'tel'
} & InputProps

export type FieldSwitch = {
  type: 'switch'
} & SwitchProps

export type FieldUploader = {
  type: 'uploader'
} & UploaderProps

export type FieldNumber = {
  type: 'number'
} & InputNumberProps

export type FieldCodeInput = {
  type: 'codeInput'
} & CodeInputProps

export type FieldFlagSelect = {
  type: 'flagSelect'
} & FlagSelectProps
