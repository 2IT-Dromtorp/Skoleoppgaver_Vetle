import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

function Input({ label, ...props }: InputProps): JSX.Element {
    return (
        <label>
            <p className="text-left">{label}:</p>
            <input className="p-2 w-full bg-white border-secondary border rounded-lg focus:outline-none" {...props} />
        </label>
    );
}

export default Input;
