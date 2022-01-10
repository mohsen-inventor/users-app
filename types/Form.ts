export interface InputProps {
    config?: {
        label?: string;
        placeholder?: string;
        validation?: {
            rules: {};
            messages: {};
        };
    };
    value?: {};
    isValid?: boolean;
    eChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
