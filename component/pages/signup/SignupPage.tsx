"use client";

import TitleArea from "@/component/organisms/TitleArea";
import BackScreen from "@/component/templates/BackScreen";
import { motion } from "motion/react"
import { signUp } from "@/lib/auth/helpers";
import { useState } from "react";
import type { SignupData } from "@/lib/auth/types";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const [ formData , setFormData ] = useState<{ email: string; username: string; password: string }>({
        email: "",
        username: "",
        password: "",
    });
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // サインアップ処理をここに実装

        const { user , session , error } = await signUp({
            email: formData.email,
            password: formData.password,
            username: formData.email.split('@')[0],
        });

        if(error){
            console.error("サインアップエラー:", error);
            return;
        }

        console.log("サインアップ成功:", user, session);
        router.push('/dashboard');
    }

    const changeFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id , value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    }

    return (
        <BackScreen>
            <TitleArea title="サインアップ" />
            
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
                                    required
                                    aria-required="true"
                                    autoComplete="email"
                                />
                            </div>
                        </motion.div >
                        <motion.div
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    ユーザーネーム
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    value={formData.username}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="ユーザーネームを入力"
                                    onChange={changeFormData}
                                    required
                                    aria-required="true"
                                    autoComplete="username"
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
                                    required
                                    aria-required="true"
                                    autoComplete="current-password"
                                />
                            </div>
                        </motion.div >
                        <motion.div
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition"
                                aria-label="サインアップフォームを送信"
                            >
                                サインアップ
                            </button>
                        </motion.div>
                    </form>
                </motion.div>
        </BackScreen>
    );
}