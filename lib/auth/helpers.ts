import { supabase } from "@/lib/supabase/supabase";
import type { AuthResult, LoginCredentials , SignupData } from "@/lib/auth/types";

/**
 * ログイン処理を行う
 * 
 * @param credentials 
 * @returns 
 */
export async function logIn(
    credentials: LoginCredentials
): Promise<AuthResult>{
    try{
        const { data , error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
        })

        if(error){
            console.error('ログインエラー詳細:', {
                message: error.message,
                status: error.status,
                code: error.code,
                name: error.name
            });
            return { user : null , session : null , error };
        }

        return { user : data.user , session : data.session , error : null };
    }catch (error){
        console.error("ログイン中に予期しないエラーが発生しました:", error);
        return { user : null , session : null , error : error as any};
    }
}


/**
 * サインアップ処理を行う
 * 
 * @param data 
 * @returns 
 */
export async function signUp(
    data: SignupData
){
    try{
        const { data: signUpData , error } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
            options: {
                data: {
                    username: data.username,
                }
            }
        })

        if(error){
            console.error('サインアップエラー詳細:', {
                message: error.message,
                status: error.status,
                code: error.code,
                name: error.name
            });
            return { user : null , session : null , error };
        }

        return { user : signUpData.user , session : signUpData.session , error : null };

    }catch (error){
        console.error("サインアップ中に予期しないエラーが発生しました:", error);
        return { user : null , session : null , error : error as any};
    }       
}

/**
 * ログアウト処理を行う
 */
export async function logOut(){
    try{
        const { error } = await supabase.auth.signOut();

        if(error){
            console.error('ログアウトエラー詳細:', {
                message: error.message,
                status: error.status,
                code: error.code,
                name: error.name
            });
            return { error };
        }

        return { error : null };
    }catch (error){
        console.error("ログアウト中に予期しないエラーが発生しました:", error);
        return { error : error as any};
    }
}

/**
 * 現在の認証ユーザーを取得する
 * @return 現在のユーザー情報またはnull
 */
export function getCurrentUser(){
    const user = supabase.auth.getUser();
    return user;
}

/**
 * ログイン済みかどうか確認する（クライアント側用）
 * @returns boolean
 */
export async function isLoggedIn(): Promise<boolean> {
    const { data } = await supabase.auth.getSession();
    return data.session !== null;
}



