import type { FC } from 'react';
import type { BaseField, AllFieldTypes } from './FieldInput.type';
import { useController } from 'react-hook-form';
import { Input, TextArea, Switch, Checkbox, InputNumber } from '@cap-collectif/ui';
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

    switch (type) {
        default:
        case 'text':
        case 'email':
        case 'password':
            return <Input type={type} {...props} {...field} />;
        case 'number':
            return <InputNumber {...props} {...field} />;
        case 'textarea':
            return <TextArea {...props} {...field} />;
        case 'select':
            return <Select {...props} {...field} />;
        case 'switch':
            return <Switch {...props} {...field} />;
        case 'checkbox':
            return props?.choices ? (
                <MultipleCheckbox {...props} {...field} />
            ) : (
                <Checkbox {...props} {...field} />
            );
        case 'uploader':
            return <Uploader {...props} {...field} />;
    }
};

export default FieldInput;
