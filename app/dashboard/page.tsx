import DashbordPage from "@/component/pages/dashbord/DashbordPage";
import { isLoggedIn } from "@/lib/auth/server-helpers";
import { redirect } from "next/navigation";

export default async function Page() {
    const loggedIn = await isLoggedIn();
    if (!loggedIn) {
        redirect('/login');
    }
    
    return <DashbordPage />;

}