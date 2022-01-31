import type { ChangeEvent } from 'react';
import type {
    CheckboxProps,
    TextAreaProps,
    InputProps,
    SwitchProps,
    InputNumberProps,
} from '@cap-collectif/ui';
import type { MultipleCheckboxProps } from '../MultipleCheckbox';
import type { UploaderProps } from '../uploader';
import type { SelectProps } from '../Select';
import type {
    Control,
    RegisterOptions,
    UseControllerProps
} from 'react-hook-form';

type Rules = {
    validate?: RegisterOptions['validate'];
    pattern?: RegisterOptions['pattern'];
    setValueAs?: RegisterOptions['setValueAs'];
}

export type BaseField = {
    name: UseControllerProps['name']
    control: Control<any>
    onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    defaultValue?: any
    rules?: Rules
};

export type AllFieldTypes = FieldSelect | FieldCheckbox | FieldTextArea | FieldText | FieldSwitch | FieldUploader | FieldNumber

export type FieldSelect = SelectProps & {
    type: 'select',
};

export type FieldCheckbox = (CheckboxProps | MultipleCheckboxProps) & {
    type: 'checkbox',
};

export type FieldTextArea = {
    type: 'textarea',
} & TextAreaProps;

export type FieldText = {
    type: 'text' | 'email' | 'password',
} & InputProps;

export type FieldSwitch = {
    type: 'switch'
} & SwitchProps;

export type FieldUploader = {
    type: 'uploader'
} & UploaderProps;

export type FieldNumber = {
    type: 'number'
} & InputNumberProps;
