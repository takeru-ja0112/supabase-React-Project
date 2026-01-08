import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/auth/server-helpers";

export default async function Home() {
  const loggedIn = await isLoggedIn();
  
  // 認証済み → ダッシュボードへ
  if (loggedIn) {
    redirect('/dashboard');
  }
  
  // 未認証 → ログインページへ
  redirect('/login');
}
