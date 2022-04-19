import type { SyntheticEvent } from 'react'
import type {
  CheckboxProps,
  RadioProps,
  TextAreaProps,
  InputProps,
  SwitchProps,
  InputNumberProps,
  CodeInputProps,
} from '@cap-collectif/ui'
import type { MultipleCheckboxProps } from '../MultipleCheckbox'
import type { MultipleRadioProps } from '../MultipleRadio'
import type { UploaderProps } from '../uploader'
import type { SelectProps } from '../Select'
import type {
  Control,
  RegisterOptions,
  UseControllerProps,
} from 'react-hook-form'
import type { FlagSelectProps } from '../flagSelect'

type Rules = {
  validate?: RegisterOptions['validate']
  pattern?: RegisterOptions['pattern']
  setValueAs?: RegisterOptions['setValueAs']
  required?: RegisterOptions['required']
  min?: RegisterOptions['min']
  max?: RegisterOptions['max']
  minLength?: RegisterOptions['minLength']
  maxLength?: RegisterOptions['maxLength']
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
  | FieldRadio
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

export type FieldRadio = (RadioProps | MultipleRadioProps) & {
  type: 'radio'
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
} & Omit<CodeInputProps, 'onComplete'>

export type FieldFlagSelect = {
  type: 'flagSelect'
} & FlagSelectProps
