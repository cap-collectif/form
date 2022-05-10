// @ts-nocheck
import { Dropdown, Input, InputProps } from '@cap-collectif/ui'
import cn from 'classnames'
import * as React from 'react'
import PlacesAutocomplete, {
  getLatLng,
  geocodeByAddress,
} from 'react-places-autocomplete'

import type { AddressComplete, AddressWithoutPosition } from './Address.type'

const Address: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  className,
  width,
}) => {
  const handleSelect = async (address: string) => {
    const addressWithoutPosition: AddressWithoutPosition = await geocodeByAddress(
      address,
    )
      .then((results: AddressWithoutPosition[]) => {
        // There is no lat & lng here
        return results[0]
      })
      .catch(error => console.error('Error', error))

    await getLatLng(addressWithoutPosition)
      .then(latLng => {
        const addressComplete: AddressComplete = {
          ...addressWithoutPosition,
          geometry: {
            ...addressWithoutPosition.geometry,
            location: {
              lat: latLng.lat,
              lng: latLng.lng,
            },
          },
        }
        onChange(addressComplete.formatted_address)
      })
      .catch(error => console.error('Error', error))
  }

  return (
    <PlacesAutocomplete
      value={value}
      onChange={onChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps }) => (
        <>
          <Input
            width={width}
            {...getInputProps({
              placeholder: placeholder,
              className: cn('cap-address__input', className),
            })}
          />
          {suggestions.length > 0 && (
            <Dropdown
              width={width}
              className={cn('cap-address__dropdown', className)}
            >
              {suggestions.map(suggestion => (
                <Dropdown.Item {...getSuggestionItemProps(suggestion)}>
                  {suggestion.description}
                </Dropdown.Item>
              ))}
            </Dropdown>
          )}
        </>
      )}
    </PlacesAutocomplete>
  )
}

export default Address
