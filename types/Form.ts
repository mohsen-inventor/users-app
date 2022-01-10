export interface InputProps {
    config?: {
        label?: string;
        placeholder?: string;
    };
    validation?: {
        messages?: {};
        rules?: {};
    };
    value?: {};
    isValid?: boolean;
    eChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
