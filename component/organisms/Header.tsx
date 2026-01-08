"use client";

import { motion } from "motion/react";
import { logOut } from "@/lib/auth/helpers";

export default function Header() {
    return (
        <header className="w-full text-white p-4 flex space-x-4 items-center justify-between">
            <h1 className="text-2xl font-bold">My Application</h1>
            <motion.button
                className="mt-2 px-4 py-2  text-white border border-white rounded hover:brightness-90 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={async () => {
                    await logOut();
                    window.location.href = '/login';
                }}
            >
                ログアウト
            </motion.button>
        </header>
    );
}