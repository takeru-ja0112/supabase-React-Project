/**
 * dbに対するCRUD処理をまとめたヘルパー関数
 */
import { supabase } from "@/lib/supabase/supabase";

/**
 * TODOを挿入する
 */
export async function insertTodo(
    { title,
        description
    }: {
        title: string,
        description?: string
    }) {
        const userId = await getCurrentUserId();
        if(!userId){
            console.error('TODO挿入エラー詳細:', '認証ユーザーが存在しません');
            return { data : null , error : new Error('認証ユーザーが存在しません') };
        }

        const { data , error } = await supabase
            .from('todos')
            .insert([
                {
                    user_id: userId,
                    title: title,
                    description: description || '',
                }
            ])
            .select();
        if(error){
            console.error('TODO挿入エラー詳細:', {
                message: error.message,
                code: error.code,
                name: error.name
            });
            return { data : null , error };
        }

        return { data , error : null };
}

/**
 * 現在のユーザーIDを取得する
 */
export async function getCurrentUserId(): Promise<string | null>{
    const { data: { user} } = await supabase.auth.getUser();
    return user ? user.id : null;
}

/**
 * Todoを取得する
 */
export async function getTodosByUserId(){
    const userId = await getCurrentUserId();
    if(!userId){
        console.error('TODO取得エラー詳細:', '認証ユーザーが存在しません');
        return { data : null , error : new Error('認証ユーザーが存在しません') };
    }

    const { data , error } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', userId);

    if(error){
        console.error('TODO取得エラー詳細:', {
            message: error.message,
            code: error.code,
            name: error.name
        });
        return { data : null , error };
    }

    return { data , error : null };
}