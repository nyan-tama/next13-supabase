// 以下のセグメント全体にssr適用
export const revalidate = 0

import {Suspense} from "react"
import BlogList from "../components/blog-list"
import NewsList from "../components/news-list"
import Spinner from "../components/spinner"

export default function StreamingServerRenderingPage(){
    return(
        <section className="flex">
            <aside className="text-black w-1/4">
                <section className="fixed m-1 h-full w-1/4 border-blue-500 bg-gray-200 p-1">
                    <Suspense fallback={<Spinner color="border-green-500"/>}>
                        {/* ブログタイトル一覧 */}
                        {/* @ts-ignore */}
                        <BlogList />       
                    </Suspense>
                </section>
            </aside>
            <main>
                <section className="fixed w-3/4">
                    <Suspense fallback={<Spinner/>}>
                        {/* ニュースのタイトル一覧 */}
                        {/* @ts-ignore */}
                        <NewsList />  
                    </Suspense>
                </section>
            </main>
        </section>

    )
}