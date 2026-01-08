
import { isLoggedIn } from "@/lib/auth/server-helpers";
import  LoginPage  from "@/component/pages/login/LoginPage";
import { redirect } from "next/navigation";

export default async function Page() {
    const isLoggedInStatus = await isLoggedIn();
    
    // すでにログイン済みの場合はダッシュボードへリダイレクト
    if(isLoggedInStatus){
        redirect('/dashboard');
    }

    return <LoginPage />;
}