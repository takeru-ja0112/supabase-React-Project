"use client";

import { motion } from "motion/react"
import { useState } from "react"
import { logIn } from "@/lib/auth/helpers";
import { useRouter } from "next/navigation";
import BackScreen from "@/component/templates/BackScreen";
import Header from "@/component/organisms/Header";

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!formData.email || !formData.password) {
            setError('メールアドレスとパスワードを入力してください');
            return;
        }

        const { user, error: authError } = await logIn({
            email: formData.email,
            password: formData.password,
        });

        if (authError) {
            setError(authError.message);
            return;
        }

        console.log("✅ ログインユーザー:", user);
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
                <Header title="ログインページ" />

                <motion.div
                    className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <motion.div
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div>
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
                                />
                            </div>
                        </motion.div >
                        <motion.div
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    パスワード
                                </label>
                                <input
                                    type="password"
                                    value={formData.password}
                                    id="password"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="パスワードを入力"
                                    onChange={changeFormData}
                                />
                            </div>
                        </motion.div >
                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg" role="alert">
                                {error}
                            </div>
                        )}
                        <motion.div
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition"
                            >
                                ログイン
                            </button>
                        </motion.div>
                    </form>
                </motion.div>
            </BackScreen>
        </>
    )
}