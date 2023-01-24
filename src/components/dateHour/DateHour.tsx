import {
  InputGroup,
  DateInput,
  HourInput,
  BoxPropsOf,
  CapInputSize,
  DateInputValueType,
  Box,
  useTheme,
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
  value,
  variantSize = CapInputSize.Sm,
  isDisabled,
  isInvalid,
}) => {
  const { colors } = useTheme()
  const initialDate = value ? moment(value, DATE_FORMAT) : null

  const [hourValue, setHourValue] = useState(
    initialDate ? initialDate.format('hh:mm') : null,
  )
  const [dateValue, setDateValue] = useState<DateInputValueType>(initialDate)

  useEffect(() => {
    const formattedHour = moment(hourValue, 'hh:mm')
    const dateHour = moment(dateValue ?? moment.now())
      .set({
        hour: formattedHour.get('hour'),
        minute: formattedHour.get('minute'),
      })
      .format(DATE_FORMAT)
    onChange(dateHour)
  }, [hourValue, dateValue])

  return (
    <Box
      sx={{
        '& .SingleDatePickerInput': {
          borderRight: '0px !important',
        },
        '& .cap-hour-input > div': { borderLeft: '0px !important' },
        '&:focus-within *':
          !isDisabled && !isInvalid
            ? { borderColor: `${colors.blue[500]} !important` }
            : {},
      }}
    >
      <InputGroup>
        <DateInput
          onChange={newDateValue => {
            setDateValue(newDateValue)
            if (!hourValue) {
              setHourValue('00:00')
            }
          }}
          value={dateValue}
          variantSize={variantSize}
          isDisabled={isDisabled}
          isInvalid={isInvalid}
        />
        <HourInput
          onChange={(newHourValue: string) => {
            setHourValue(newHourValue)
            if (!dateValue) {
              setDateValue(moment())
            }
          }}
          value={hourValue}
          variantSize={variantSize}
          isDisabled={isDisabled}
          isInvalid={isInvalid}
        />
      </InputGroup>
    </Box>
  )
}

export default DateHour
