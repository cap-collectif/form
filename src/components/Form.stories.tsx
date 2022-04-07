import { Meta } from '@storybook/react'
import {
  Box,
  Flex,
  FormLabel,
  FormGuideline,
  InputGroup,
} from '@cap-collectif/ui'
import FormControl from './FormControl'
import { FieldInput } from './fieldInput'
import { useForm } from 'react-hook-form'
import * as React from 'react'

const meta: Meta = {
  title: 'Example',
  parameters: {
    controls: { expanded: true },
  },
}

export default meta

export const Default = () => {
  const { control } = useForm({
    mode: 'onChange',
  })
  const [value, setValue] = React.useState<string>('')

  return (
    <Box as="form" maxWidth="40%" margin="auto">
      <FormControl name="firstName" control={control} isRequired>
        <FormLabel label="Firstname" />
        <FieldInput
          type="text"
          minLength={4}
          name="firstName"
          control={control}
          defaultValue="Patrick"
          placeholder="Jean"
          rules={{
            pattern: {
              value: /^[a-zA-Z]+$/,
              message: 'Uniquement des lettres',
            },
          }}
        />
      </FormControl>

      <FormControl name="fingers" control={control} isRequired>
        <FormLabel label="Number of finger" />
        <FieldInput type="number" name="fingers" control={control} />
      </FormControl>

      <FormControl name="description" control={control} isRequired>
        <FormLabel label="Description" />
        <FormGuideline>Tell us about you</FormGuideline>
        <FieldInput
          type="textarea"
          name="description"
          control={control}
          placeholder="Je suis heureux"
          rules={{
            pattern: {
              value: /^[a-zA-Z]+$/,
              message: 'Uniquement des lettres',
            },
          }}
        />
      </FormControl>

      <FormControl name="drink" control={control} isRequired>
        <FormLabel label="Drink" />
        <FormGuideline>Choose your drink(s)</FormGuideline>
        <FieldInput
          type="checkbox"
          name="drink"
          id="drink"
          control={control}
          choices={[
            {
              id: 'coca',
              useIdAsValue: false,
              label: 'Coca cola',
            },
            {
              id: 'pepsi',
              useIdAsValue: false,
              label: 'Pepsi',
            },
          ]}
        />
      </FormControl>

      <FormControl name="country" control={control} isRequired>
        <FormLabel label="Country" />
        <FormGuideline>Choose your country</FormGuideline>
        <FieldInput
          type="radio"
          name="country"
          id="country"
          control={control}
          choices={[
            {
              id: 'france',
              useIdAsValue: false,
              label: 'France',
            },
            {
              id: 'australia',
              useIdAsValue: false,
              label: 'Australia',
            },
          ]}
        />
      </FormControl>

      <FormControl name="logo" control={control} isRequired>
        <FormLabel label="Logo" />
        <FormGuideline>Accepted type: jpg, png, svg.</FormGuideline>
        <FieldInput
          type="uploader"
          name="logo"
          control={control}
          showThumbnail
          format="image/*"
        />
      </FormControl>

      <FormControl name="holiday-pictures" control={control} isRequired>
        <FormLabel label="Holiday Pictures" />
        <FieldInput
          type="uploader"
          name="holiday-pictures"
          control={control}
          multiple
        />
      </FormControl>

      <FormControl name="sober" control={control} isRequired>
        <FieldInput
          type="checkbox"
          name="sober"
          control={control}
          id="sober-checkbox"
        >
          Are you sober ?
        </FieldInput>
      </FormControl>

      <FormControl name="happy" control={control} isRequired>
        <Flex direction="row" align="center">
          <FieldInput
            type="switch"
            name="happy"
            control={control}
            id="happy-switch"
          >
            Are you happy ?
          </FieldInput>
        </Flex>
      </FormControl>

      <FormControl name="fastFood" control={control} isRequired>
        <FormLabel label="Fast food" />
        <FieldInput
          type="select"
          name="fastFood"
          control={control}
          placeholder="Choisir une option"
          options={[
            {
              value: 'mcdo',
              label: 'Mcdonald',
            },
            {
              value: 'bk',
              label: 'Burger king',
            },
          ]}
          clearable
        />
      </FormControl>
      <FormControl name="codeInput" control={control} isRequired>
        <FormLabel label="Code Input" />
        <FieldInput
          type="codeInput"
          name="codeInput"
          control={control}
          length={6}
          isVerified={value !== ''}
          onComplete={(code: string) => {
            setValue(code)
          }}
        />
      </FormControl>
      <InputGroup>
        <FormLabel label="Choisissez une couleur :" />
        <FormGuideline>Tell us about you</FormGuideline>
        <FormControl name="CountryCode" control={control} isRequired>
          <FieldInput
            type="flagSelect"
            name="CountryCode"
            control={control}
            placeholder="Choisir un pays"
          />
        </FormControl>
        <FormControl name="phoneNumber" control={control} isRequired>
          <FieldInput
            type="tel"
            name="phoneNumber"
            maxLength={10}
            control={control}
          />
        </FormControl>
      </InputGroup>
    </Box>
  )
}
