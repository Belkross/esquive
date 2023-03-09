import { useState } from "react";
export function useValidNumberInput(initialValue, validityChecker) {
    const [input, setInput] = useState({ value: initialValue.toString(), validity: validityChecker(initialValue) });
    const onInputChange = (event) => {
        const value = event.target.value;
        setInput({
            value,
            validity: validityChecker(Number.parseInt(value, 10)),
        });
    };
    return [input, onInputChange];
}
