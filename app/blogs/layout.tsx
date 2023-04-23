import React from "react";
import BlogListStatic from "../components/blog-list-static";
import RefreshBtn from "../components/refresh-button";

export default function BlogLayout({
    children,
}:{
    children: React.ReactNode
}) {
    return (
        <section className="flex">
            {/* 画面構成を２画面にする */}
            <aside className={`h-[calc(100vh-56px)] w-1/4 bg-gray-200 p-2 text-black`}>
                {/* @ts-ignore */}
                <BlogListStatic />
                <div className="flex justify-center">
                    <RefreshBtn />
                </div>
            </aside>
            <main className="flex flex-1 justify-center">{children}</main>
        </section>
    )
}