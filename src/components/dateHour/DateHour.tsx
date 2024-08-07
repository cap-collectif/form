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
import { forwardRef, Ref, useEffect, useState } from 'react'

export interface DateHourProps extends Omit<BoxPropsOf<'input'>, 'onChange'> {
  readonly isDisabled?: boolean
  readonly isInvalid?: boolean
  readonly variantSize?: CapInputSize
  readonly dateInputProps?: Partial<DateInputProps>
  readonly id?: string
  readonly placeholder?: string
  readonly ref?: Ref<HTMLInputElement | null>
}

const DATE_FORMAT = 'YYYY-MM-DD H:mm:ss'

export const DateHour = forwardRef<HTMLInputElement, DateHourProps>(
  (
    {
      onChange,
      value,
      id,
      placeholder,
      variantSize = CapInputSize.Sm,
      isDisabled,
      isInvalid,
      dateInputProps = {},
    },
    ref,
  ) => {
    const { colors } = useTheme()
    const initialDate = value ? moment(value, DATE_FORMAT) : null

    const [hourValue, setHourValue] = useState(
      initialDate ? initialDate.format('HH:mm') : null,
    )
    const [dateValue, setDateValue] =
      useState<moment.Moment | null>(initialDate)

    useEffect(() => {
      if (!dateValue && !hourValue) {
        onChange(null)
        return
      }
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
              const value = newDateValue.target.value
                ? moment(newDateValue.target.value, DATE_FORMAT)
                : null
              setDateValue(value)
            }}
            value={dateValue?.format('YYYY-MM-DD')}
            variantSize={variantSize}
            isDisabled={isDisabled}
            isInvalid={isInvalid}
            placeholder={placeholder}
            {...dateInputProps}
            ref={ref}
          />
          <HourInput
            value={dateValue?.format('HH:mm')}
            defaultValue={hourValue}
            onChange={(newHourValue: string) => {
              setHourValue(newHourValue)
            }}
            variantSize={variantSize}
            isDisabled={isDisabled}
            isInvalid={isInvalid}
            id={id}
          />
        </InputGroup>
      </Box>
    )
  },
)

export default DateHour
