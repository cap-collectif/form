// @ts-nocheck

/**
 *  /!\ Need to improve type here, it's supposed to be a discriminated union base on the prop "type" with the switch.
 *  But TS seems to not understand.
 */
import {
  Input,
  TextArea,
  Switch,
  Checkbox,
  Radio,
  InputNumber,
  CodeInput,
  DateInput,
  HourInput,
  ColorPicker,
} from '@cap-collectif/ui'
import type { FC } from 'react'
import { useController } from 'react-hook-form'
import { useIntl } from 'react-intl'

import MultipleCheckbox from '../MultipleCheckbox'
import MultipleRadio from '../MultipleRadio'
import Select from '../Select'
import { Address } from '../address'
import { FlagSelect } from '../flagSelect'
import { Uploader } from '../uploader'
import type { BaseField, AllFieldTypes } from './FieldInput.type'
import {
  getEmailRule,
  getMinLengthRule,
  getMaxLengthRule,
} from './FieldInput.utils'
import { DateHour } from '../dateHour'
import {forwardRef} from "react";

export type FieldInputProps = BaseField & AllFieldTypes

export const FieldInput: FC<FieldInputProps> = forwardRef(({
  name,
  type = 'text',
  control,
  rules,
  defaultValue,
  onChange,
  onBlur,
  ...props
}, ref) => {
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

  const handleOnBlur = (e): void => {
    if (onBlur) onBlur(e)
    field.onBlur(e)
  }

  switch (type) {
    default:
    case 'hidden':
    case 'text':
    case 'email':
    case 'password':
    case 'tel':
      return (
        <Input
          type={type}
          {...props}
          {...field}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          ref={ref}
        />
      )
    case 'number':
      return (
        <InputNumber
          {...props}
          {...field}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          ref={ref}
        />
      )
    case 'textarea':
      return (
        <TextArea
          {...props}
          {...field}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          ref={ref}
        />
      )
    case 'select':
      return (
        <Select
          {...props}
          {...field}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          ref={ref}
        />
      )
    case 'switch':
      return (
        <Switch
          {...props}
          {...field}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          checked={field.value}
          ref={ref}
        />
      )
    case 'checkbox':
      return props?.choices ? (
        <MultipleCheckbox
          {...props}
          {...field}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          ref={ref}
        />
      ) : (
        <Checkbox
          {...props}
          {...field}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          checked={field.value}
          ref={ref}
        />
      )
    case 'radio':
      return props?.choices ? (
        <MultipleRadio
          {...props}
          {...field}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          ref={ref}
        />
      ) : (
        <Radio
          {...props}
          {...field}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          checked={field.value}
          ref={ref}
        />
      )
    case 'uploader':
      return <Uploader {...props} {...field} ref={ref} />
    case 'codeInput':
      return (
        <CodeInput
          {...props}
          {...field}
          ref={ref}
          onComplete={value => handleOnChange({ target: { value } })}
        />
      )
    case 'flagSelect':
      return (
        <FlagSelect
          {...props}
          {...field}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          ref={ref}
        />
      )
    case 'date':
      return (
        <DateInput
          {...props}
          {...field}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          ref={ref}
        />
      )
    case 'hour':
      return (
        <HourInput
          {...props}
          {...field}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          ref={ref}
        />
      )
    case 'dateHour':
      return (
        <DateHour
          {...props}
          {...field}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          ref={ref}
        />
      )
    case 'address':
      return (
        <Address
          {...props}
          {...field}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          ref={ref}
        />
      )
    case 'colorPicker':
      return (
        <ColorPicker
          {...props}
          {...field}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          ref={ref}
        />
      )
  }
})

FieldInput.displayName = 'FieldInput'

export default FieldInput
