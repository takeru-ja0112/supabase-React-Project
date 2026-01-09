import { EyeIcon } from "@heroicons/react/16/solid"
import { motion } from "motion/react"


export default function LoadingIcon() {
    return (
        <div className="flex justify-center items-center">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: [0.39, 0.24, 0.3, 1] }}
            >
                <EyeIcon className=" rounded-full h-8 w-8"></EyeIcon>
            </motion.div>
        </div>
    )
}