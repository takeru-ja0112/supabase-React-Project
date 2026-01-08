"use client";

import { supabase } from "@/lib/supabase/supabase";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface User {
    id: number;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    created_at: string;
    updated_at: string;
}

export default function UserPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const { data, error } = await supabase
            .from('users')
            .select('*');
        console.log('Data:', data);
        console.log('Error:', error);
        if (error) {
            console.error('Error fetching users:', error);
            setError(error.message);
        } else if (data) {
            setUsers(data as User[]);
        }
        setLoading(false);
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
                <motion.div
                    className="flex flex-col items-center gap-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        className="rounded-full h-16 w-16 border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-purple-400"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.p
                        className="text-lg text-gray-600 dark:text-gray-300"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        読み込み中...
                    </motion.p>
                </motion.div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
                <motion.div
                    className="max-w-md bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-8 text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <svg className="w-16 h-16 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-xl font-bold text-red-800 dark:text-red-200 mb-2">
                        エラーが発生しました
                    </h3>
                    <p className="text-red-600 dark:text-red-300 mb-4">
                        {error}
                    </p>
                    <button
                        onClick={() => {
                            setError(null);
                            setLoading(true);
                            fetchUsers();
                        }}
                        className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                    >
                        再試行
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 font-sans">
            <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className="inline-flex items-center justify-center mb-4"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                    >
                        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full p-4">
                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                    </motion.div>
                    <motion.h1
                        className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        ユーザー一覧
                    </motion.h1>
                    <motion.p
                        className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Supabase から取得したユーザー情報
                    </motion.p>
                    <motion.div
                        className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-900 rounded-full shadow-md"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <motion.div
                            className="w-2 h-2 bg-green-500 rounded-full"
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                            {users.length} 人のユーザー
                        </span>
                    </motion.div>
                </motion.div>

                {/* User Cards */}
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {users.map((user, index) => (
                        <motion.div
                            key={user.id}
                            className="bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-xl p-6 border border-purple-100 dark:border-purple-900"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.1,
                                type: "spring",
                                stiffness: 100
                            }}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                                transition: { duration: 0.2 }
                            }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {/* Avatar */}
                            <div className="flex items-center gap-4 mb-4">
                                <motion.div
                                    className="w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {user.firstname[0]}{user.lastname[0]}
                                </motion.div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                                        {user.firstname} {user.lastname}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        @{user.username}
                                    </p>
                                </div>
                            </div>

                            {/* User Info */}
                            <div className="space-y-3">
                                <motion.div
                                    className="flex items-center gap-2 text-sm"
                                    whileHover={{ x: 5 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                    <span className="text-gray-600 dark:text-gray-300">
                                        ID: {user.id}
                                    </span>
                                </motion.div>

                                <motion.div
                                    className="flex items-center gap-2 text-sm"
                                    whileHover={{ x: 5 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-gray-600 dark:text-gray-300">
                                        {new Date(user.created_at).toLocaleDateString('ja-JP')}
                                    </span>
                                </motion.div>
                            </div>

                            {/* Badge */}
                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                <motion.span
                                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900 dark:to-indigo-900 text-purple-700 dark:text-purple-300"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    アクティブ
                                </motion.span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Empty State */}
                {users.length === 0 && (
                    <motion.div
                        className="max-w-md mx-auto text-center py-12"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
                            <motion.svg
                                className="w-16 h-16 mx-auto text-gray-400 mb-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </motion.svg>
                            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                ユーザーが見つかりません
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                Supabase でユーザーを追加してください
                            </p>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}