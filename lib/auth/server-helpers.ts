import { createClient } from "@/lib/supabase/server/supabaseServer";

/**
 * ログイン済みかどうか確認する（サーバー側専用）
 * @returns boolean
 */
export async function isLoggedIn(): Promise<boolean> {
    const supabase = await createClient();
    console.log("現在のセッション情報:", supabase);
    const { data } = await supabase.auth.getSession();
    return data.session !== null;
}

/**
 * 現在の認証ユーザーを取得する（サーバー側専用）
 * @returns 現在のユーザー情報またはnull
 */
export async function getCurrentUser() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}
