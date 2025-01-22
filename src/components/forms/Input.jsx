import { useId } from "react";

/**
 * 
 * @param {string} placeholder
 * @param {string} value 
 * @param {(s : string) => void } onChange 
 * @returns 
 */
export function Input({placeholder,value,onChange,label,inputRef,type}){

    const id = useId();
    return <div>
        <label  htmlFor={id}>{label}</label>
        <input 
        ref={inputRef}
        type={type}
        id={id}
        className="form-control"
        value={value}
        placeholder={placeholder}
        onChange={(e)=> onChange?.(e.target.value)}
        />
    </div>
}

export default Input;