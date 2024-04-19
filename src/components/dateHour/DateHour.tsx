import {
  InputGroup,
  DateInput,
  HourInput,
  BoxPropsOf,
  CapInputSize,
  Box,
  useTheme,
  DateInputProps,
} from '@cap-collectif/ui'
import moment from 'moment'
import { FC, useEffect, useState } from 'react'

export interface DateHourProps extends Omit<BoxPropsOf<'input'>, 'onChange'> {
  readonly isDisabled?: boolean
  readonly isInvalid?: boolean
  readonly variantSize?: CapInputSize
  readonly dateInputProps?: Partial<DateInputProps>
}

const DATE_FORMAT = 'YYYY-MM-DD H:mm:ss'

export const DateHour: FC<DateHourProps> = ({
  onChange,
  value,
  variantSize = CapInputSize.Sm,
  isDisabled,
  isInvalid,
  dateInputProps = {},
}) => {
  const { colors } = useTheme()
  const initialDate = value ? moment(value, DATE_FORMAT) : null

  const [hourValue, setHourValue] = useState(
    initialDate ? initialDate.format('hh:mm') : null,
  )
  const [dateValue, setDateValue] = useState<moment.Moment | null>(initialDate)

  useEffect(() => {
    if (!dateValue) {
      return
    }

    const formattedHour = moment(hourValue ?? '00:00', 'hh:mm')
    const dateHour = moment(dateValue ?? moment.now())
      .set({
        hour: formattedHour.get('hour'),
        minute: formattedHour.get('minute'),
      })
      .format(DATE_FORMAT)
    onChange(dateHour)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hourValue, dateValue])

  return (
    <Box
      sx={{
        '& .cap-date-input': {
          borderRight: '0px !important',
          borderTopRightRadius: '0px !important',
          borderBottomRightRadius: '0px !important',
        },
        '& .cap-date-input + div': { flex: 'none' },
        '& .cap-hour-input > div': { borderLeft: '0px !important' },
        '&:focus-within *':
          !isDisabled && !isInvalid
            ? { borderColor: `${colors.blue[500]} !important` }
            : {},
      }}
    >
      <InputGroup sx={{ flexWrap: 'nowrap !important' }}>
        <DateInput
          onChange={(newDateValue: React.ChangeEvent<HTMLInputElement>) => {
            setDateValue(moment(newDateValue.target.value, DATE_FORMAT))
          }}
          value={dateValue?.format('YYYY-MM-DD')}
          variantSize={variantSize}
          isDisabled={isDisabled}
          isInvalid={isInvalid}
          {...dateInputProps}
        />
        <HourInput
          onChange={(newHourValue: string) => {
            setHourValue(newHourValue)
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
