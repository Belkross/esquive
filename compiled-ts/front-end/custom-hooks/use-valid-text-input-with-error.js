import { useCallback, useState } from "react";
export function useValidTextInputWithError(initialValue, validityChecker) {
    const [input, setInput] = useState({
        value: initialValue,
        validity: validityChecker(initialValue),
        error: deduceIfError(initialValue, validityChecker),
    });
    const onInputChange = useCallback((event) => {
        const value = event.target.value;
        setInput({
            value,
            validity: validityChecker(value),
            error: deduceIfError(value, validityChecker),
        });
    }, [validityChecker]);
    const clearInput = useCallback(() => setInput({ value: "", validity: false, error: false }), []);
    return { input, onInputChange, clearInput };
}
function deduceIfError(inputValue, validityChecker) {
    const inputIsNotValid = !validityChecker(inputValue);
    const somethingIsWritten = inputValue.length > 0;
    return inputIsNotValid && somethingIsWritten;
}
