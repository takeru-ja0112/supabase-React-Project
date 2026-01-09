import { useState } from "react";

export function usePasswordToggle() {
    const [showPassword , setShowPassword ] = useState<Boolean>(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

    const inputType = showPassword ? "text" : "password";

    return {
        showPassword,
        togglePassword,
        inputType,
    }

}