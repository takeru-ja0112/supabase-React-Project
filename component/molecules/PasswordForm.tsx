"use client";

import { useState } from "react";
import { usePasswordToggle } from "@/hooks/usePasswordToggle";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";

export default function PasswordForm(
    { formData, changeFormData, error , isConfirm } : {
        formData: { password: string },
        changeFormData: (e: React.ChangeEvent<HTMLInputElement>) => void,
        error: string | null,
        isConfirm? : boolean
    }
) {
    const { showPassword, togglePassword, inputType } = usePasswordToggle();

    return (
        <>
            <label htmlFor={isConfirm ? "confirmPassword" : "password"} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {isConfirm ? "パスワード（確認）" : "パスワード"}
            </label>
            <div className="relative">
                <input
                    type={inputType}
                    value={formData.password}
                    id={isConfirm ? "confirmPassword" : "password"}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="パスワードを入力"
                    onChange={changeFormData}
                    required
                    aria-required="true"
                    aria-invalid={error ? "true" : "false"}
                    aria-describedby={error ? "login-error" : undefined}
                    autoComplete="current-password"
                />
                <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute right-2 top-2 text-sm text-indigo-600 hover:text-indigo-800 focus:outline-none"
                >
                    {showPassword ? <EyeIcon className="inline h-4 w-4 mr-1 text-white" /> : <EyeSlashIcon className="inline h-4 w-4 mr-1 text-white" />}
                </button>
            </div>
        </>
    )
}