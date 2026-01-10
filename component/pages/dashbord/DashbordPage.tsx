"use client";

import TitleArea from "@/component/organisms/TitleArea";
import BackScreen from "@/component/templates/BackScreen";
import Header from "@/component/organisms/Header";
import { createContext, useContext , useState } from "react";
import { getCurrentUserId } from "@/lib/supabase/helper";
import { insertTodo , getTodosByUserId} from "@/lib/supabase/helper";


const todoContext = createContext<{ title: string; description: string } | null>(null);

export default function DashbordPage() {
    const [ state , setState ] = useState("white");
    const [ todoForm , setTodoForm ] = useState<{ title: string; description: string }>({
        title: "TEST TODO",
        description: "",
    });

    // async function fetchTodos() {
    //     const { data , error } = await getTodosByUserId();
    //     if(error){
    //         console.error("TODO取得エラー:", error);
    //         return;
    //     }

    //     console.log("TODO取得成功:", data);
    // }

   

    return (
        <>
            <Header />
            <BackScreen>
                <TitleArea title="ダッシュボード" />
                <todoContext.Provider value={todoForm}>
                    <Form />
                </todoContext.Provider>
            </BackScreen>
        </>
    );
}

function Form() {
    const todoForm = useContext(todoContext);
    if(!todoForm){
        return null;
    }

     const handleSubmit = async () => {
        const { data , error } = await insertTodo({
            title: todoForm.title,
            description: todoForm.description,
        });

        if(error){
            console.error("TODO挿入エラー:", error);
            return;
        }

        console.log("TODO挿入成功:", data);
    }

    return (
        <Panel>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">ようこそ、ダッシュボードへ！</h2>
            <p className="text-gray-600 dark:text-gray-400">ここでは、あなたのアカウント情報や設定を管理できます。</p>
            <button
                onClick={handleSubmit}
                className="border border-white rounded-full px-4 py-2 hover:bg-gray-900 transition "
            >
                sampleButton
            </button>
        </Panel>
    );
}

function Panel({ children }: { children: React.ReactNode }) {

    return (
        <div className={`p-4 rounded-lg shadow-md bg-white dark:bg-gray-800`}>
            {children}
        </div>
    )
}