"use client";

import TitleArea from "@/component/organisms/TitleArea";
import BackScreen from "@/component/templates/BackScreen";
import Header from "@/component/organisms/Header";

export default function DashbordPage() {

    return (
        <>
            <Header />
            <BackScreen>
                <TitleArea title="ダッシュボード" />
                <h1>Dashbord Page</h1>
            </BackScreen>
        </>
    );
}