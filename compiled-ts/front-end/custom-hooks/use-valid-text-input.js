import { useState } from "react";
export function useValidTextInput(initialValue, validityChecker) {
    const [input, setInput] = useState({ value: initialValue, validity: validityChecker(initialValue) });
    const onInputChange = (event) => {
        const value = event.target.value;
        setInput({
            value,
            validity: validityChecker(value),
        });
    };
    return [input, onInputChange];
}
