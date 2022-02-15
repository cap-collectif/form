// @ts-nocheck

/**
 *  /!\ Need to improve type here, it's supposed to be a discriminated union base on the prop "type" with the switch.
 *  But TS seems to not understand.
 */

import type { FC } from 'react';
import type { BaseField, AllFieldTypes } from './FieldInput.type';
import { useController } from 'react-hook-form';
import { Input, TextArea, Switch, Checkbox, InputNumber,CodeInput } from '@cap-collectif/ui';
import MultipleCheckbox from '../MultipleCheckbox';
import Select from '../Select';
import Uploader from '../uploader/Uploader';
import { useIntl } from 'react-intl';
import { getEmailRule, getMinLengthRule } from './FieldInput.utils';

export type FieldInputProps = BaseField & AllFieldTypes;

export const FieldInput: FC<FieldInputProps> = ({
    name,
    type = 'text',
    control,
    rules,
    defaultValue,
    onChange,
    ...props
}) => {
    const intl = useIntl();
    const minLengthRule = props.minLength ? getMinLengthRule(props.minLength, intl) : undefined;
    const emailRule = props.type === 'email' ? getEmailRule(intl) : undefined;

    const { field } = useController({
        name,
        control,
        rules: {
            minLength: minLengthRule,
            pattern: emailRule,
            ...rules,
        },
        defaultValue,
    });

    const handleOnChange = (e): void => {
        if(onChange) onChange(e);
        field.onChange(e);
    }
    

    switch (type) {
        default:
        case 'text':
        case 'email':
        case 'password':
            return <Input type={type} {...props} {...field} onChange={handleOnChange} />;
        case 'number':
            return <InputNumber {...props} {...field} onChange={handleOnChange} />;
        case 'textarea':
            return <TextArea {...props} {...field} onChange={handleOnChange} />;
        case 'select':
            return <Select {...props} {...field} onChange={handleOnChange} />;
        case 'switch':
            return <Switch {...props} {...field} onChange={handleOnChange} />;
        case 'checkbox':
            return props?.choices ? (
                <MultipleCheckbox {...props} {...field} onChange={handleOnChange} />
            ) : (
                <Checkbox {...props} {...field} onChange={handleOnChange} />
            );
        case 'uploader':
            return <Uploader {...props} {...field} />;
        case 'codeInput':
            return <CodeInput {...props} {...field} />;
    }
};

export default FieldInput;
