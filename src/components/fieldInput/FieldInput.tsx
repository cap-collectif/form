// @ts-nocheck

/**
 *  /!\ Need to improve type here, it's supposed to be a discriminated union base on the prop "type" with the switch.
 *  But TS seems to not understand.
 */

import type { FC } from 'react'
import type { BaseField, AllFieldTypes } from './FieldInput.type'
import { useController } from 'react-hook-form'
import {
  Input,
  TextArea,
  Switch,
  Checkbox,
  Radio,
  InputNumber,
  CodeInput,
} from '@cap-collectif/ui'
import MultipleCheckbox from '../MultipleCheckbox'
import MultipleRadio from '../MultipleRadio'
import Select from '../Select'
import { Uploader } from '../uploader'
import { useIntl } from 'react-intl'
import { getEmailRule, getMinLengthRule, getMaxLengthRule } from './FieldInput.utils'
import { FlagSelect } from '../flagSelect'

export type FieldInputProps = BaseField & AllFieldTypes

export const FieldInput: FC<FieldInputProps> = ({
  name,
  type = 'text',
  control,
  rules,
  defaultValue,
  onChange,
  ...props
}) => {
  const intl = useIntl()
  const minLengthRule = props.minLength
    ? getMinLengthRule(props.minLength, intl)
    : undefined
  const maxLengthRule = props.maxLength
    ? getMaxLengthRule(props.maxLength, intl)
    : undefined
  const emailRule = type === 'email' ? getEmailRule(intl) : undefined

  const { field } = useController({
    name,
    control,
    rules: {
      minLength: minLengthRule,
      maxLength: maxLengthRule,
      pattern: emailRule,
      ...rules,
    },
    defaultValue,
  })

  const handleOnChange = (e): void => {
    if (onChange) onChange(e)
    field.onChange(e)
  }

  switch (type) {
    default:
    case 'text':
    case 'email':
    case 'password':
    case 'tel':
      return (
        <Input type={type} {...props} {...field} onChange={handleOnChange} />
      )
    case 'number':
      return <InputNumber {...props} {...field} onChange={handleOnChange} />
    case 'textarea':
      return <TextArea {...props} {...field} onChange={handleOnChange} />
    case 'select':
      return <Select {...props} {...field} onChange={handleOnChange} />
    case 'switch':
      return (
        <Switch
          {...props}
          {...field}
          onChange={handleOnChange}
          checked={field.value}
        />
      )
    case 'checkbox':
      return props?.choices ? (
        <MultipleCheckbox {...props} {...field} onChange={handleOnChange} />
      ) : (
        <Checkbox
          {...props}
          {...field}
          onChange={handleOnChange}
          checked={field.value}
        />
      )
    case 'radio':
      return props?.choices ? (
          <MultipleRadio {...props} {...field} onChange={handleOnChange} />
      ) : (
          <Radio {...props} {...field} onChange={handleOnChange} checked={field.value} />
      )
    case 'uploader':
      return <Uploader {...props} {...field} />
    case 'codeInput':
      return <CodeInput {...props} {...field} />
    case 'flagSelect':
      return <FlagSelect {...props} {...field} onChange={handleOnChange} />
  }
}

export default FieldInput
