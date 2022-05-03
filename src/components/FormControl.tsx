// @ts-nocheck

import type { FC } from 'react';
import { useIntl } from 'react-intl';
import { Control, useController, FormState } from 'react-hook-form';
import {
    CapInputSize,
    FormControl as CapFormControl,
    FormControlProps as CapFormControlProps,
    FormErrorMessage,
} from '@cap-collectif/ui';

export interface FormControlProps extends CapFormControlProps {
    name: string;
    control: Control<any>;
}

const getTouchedState = (touchedFields: FormState['touchedFields'], name: string): boolean => {
    const isNestedField = name.includes('.');
    if(!isNestedField) return touchedFields[name]

    const [firstPart, secondPart] = name.split('.');
    if(touchedFields[firstPart]) return touchedFields[firstPart][secondPart]

    return false;
}

export const FormControl: FC<FormControlProps> = ({
    name,
    control,
    children,
    variantSize = CapInputSize.Sm,
    sx,
    isRequired,
    ...props
}) => {
    const intl = useIntl();
    const {
        fieldState: { invalid, error },
        formState: { touchedFields },
    } = useController({
        name,
        control,
        rules: {
            required: isRequired ? intl.formatMessage({ id: 'fill-field' }) : undefined,
        },
    });
    const isInvalid = invalid && getTouchedState(touchedFields, name);

    return (
        <CapFormControl
            variantSize={variantSize}
            mb={4}
            isInvalid={isInvalid}
            isRequired={isRequired}
            sx={{
                '&:last-child': {
                    mb: 0,
                },
                ...sx,
            }}
            {...props}>
            {children}

            {isInvalid && error?.message && <FormErrorMessage>{error.message}</FormErrorMessage>}
        </CapFormControl>
    );
};

export default FormControl;
