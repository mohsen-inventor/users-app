export interface InputProps {
    type?: InputType;
    label?: string;
    placeholder?: string;
    id?: string;
    value?: any;
    validationRules?: any;
    isValid?: boolean;
    eChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export enum InputType {
    Text = 'text',
    Email = 'email',
    Date = 'date',
    File = 'file',
    Hidden = 'hidden',
    Number = 'number',
    Radio = 'radio',
    Range = 'range',
    Tel = 'tel',
    Time = 'time',
    Url = 'url',
}