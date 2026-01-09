"use client";

import { motion } from "motion/react"
import { useState } from "react"
import { logIn } from "@/lib/auth/helpers";
import { useRouter } from "next/navigation";
import BackScreen from "@/component/templates/BackScreen";
import TitleArea from "@/component/organisms/TitleArea";
import { usePasswordToggle } from "@/hooks/usePasswordToggle";
import PasswordForm from "@/component/molecules/PasswordForm";
import LoadingIcon from "@/component/atoms/LoadingIcon";

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null);
    const [ loading , setLoading ] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const router = useRouter();
    const { showPassword, togglePassword, inputType } = usePasswordToggle();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (!formData.email || !formData.password) {
            setError('メールアドレスとパスワードを入力してください');
            setLoading(false);
            return;
        }

        const { user, error: authError } = await logIn({
            email: formData.email,
            password: formData.password,
        });

        if (authError) {
            setError("メールアドレスまたはパスワードが正しくありません");
            return;
        }

        router.push('/dashboard');
    }

    const changeFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    }

    return (
        <>
            <BackScreen>
                <TitleArea title="ログインページ" />

                <motion.div
                    className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <form onSubmit={handleSubmit} className="space-y-6" aria-label="ログインフォーム">
                        <motion.div
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                メールアドレス
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="メールアドレスを入力"
                                onChange={changeFormData}
                                required
                                aria-required="true"
                                aria-invalid={error ? "true" : "false"}
                                aria-describedby={error ? "login-error" : undefined}
                                autoComplete="email"
                            />
                        </motion.div >
                        <motion.div
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <PasswordForm
                                formData={{ password: formData.password }}
                                changeFormData={changeFormData}
                                error={error}
                            />
                        </motion.div >
                        {error && (
                            <div
                                id="login-error"
                                className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg"
                                role="alert"
                                aria-live="polite"
                            >
                                {error}
                            </div>
                        )}
                        <motion.div
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition"
                                aria-label="ログインフォームを送信"
                            >
                                {loading ? <LoadingIcon /> : 'ログイン'}
                            </button>
                        </motion.div>
                    </form>
                    {/* サインアップページ */}
                    <motion.div
                        className="mt-6 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            アカウントをお持ちでないですか？{' '}
                            <a
                                href="/signup"
                                className="text-indigo-600 hover:text-indigo-800 font-medium"
                            >
                                サインアップ
                            </a>
                        </p>
                    </motion.div>
                </motion.div>
            </BackScreen>
        </>
    )
}