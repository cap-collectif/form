import {
  InputGroup,
  DateInput,
  HourInput,
  BoxPropsOf,
  CapInputSize,
  DateInputValueType,
} from '@cap-collectif/ui'
import moment from 'moment'
import { FC, useEffect, useState } from 'react'

export interface DateHourProps extends Omit<BoxPropsOf<'input'>, 'onChange'> {
  readonly isDisabled?: boolean
  readonly isInvalid?: boolean
  readonly variantSize?: CapInputSize
}

const DATE_FORMAT = 'YYYY-MM-DD H:mm:ss'

export const DateHour: FC<DateHourProps> = ({
  onChange,

  ...props
}) => {
  const [hourValue, setHourValue] = useState('')
  const [dateValue, setDateValue] = useState<DateInputValueType>(null)

  const handleChange = () => {
    onChange()
  }

  useEffect(() => {
    const formattedHour = moment(hourValue, 'hh:mm')
    const dateHour = moment(dateValue)
      .set({
        hour: formattedHour.get('hour'),
        minute: formattedHour.get('minute'),
      })
      .format(DATE_FORMAT)
    console.log('dateHour: ', dateHour)
    onChange(dateHour)
  }, [hourValue, dateValue])

  return (
    <InputGroup>
      <DateInput
        onChange={newDateValue => {
          setDateValue(newDateValue)
        }}
        value={dateValue}
      />
      <HourInput
        onChange={(newHourValue: string) => {
          setHourValue(newHourValue)
        }}
        value={hourValue}
      />
    </InputGroup>
  )
}

export default DateHour
