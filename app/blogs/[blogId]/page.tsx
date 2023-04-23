import Link from "next/link"
import { notFound } from "next/navigation"
import { format } from "date-fns"
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid'
import type { Database } from "../../../database.types"

type Blog = Database["public"]["Tables"]["blogs"]["Row"]

//urlから受け取るparamsと思われ
type PageProps = {
    params: {
        blogId: string
    }
}

//個別ページの取得
async function fetchBlog(blogId: string) {
    const res = await fetch(
        `${process.env.url}/rest/v1/blogs?id=eq.${blogId}&select=*`,
        {
            headers: new Headers({
                apikey: process.env.apikey as string,
            }),
            // キャッシュオプションを指定していないのでssgと思いきや、
            //階層下の個別ページのほうでno-storeとしているのでssrとなる
        }
    )
    if (!res.ok) {
        throw new Error("Failed to fetch data in server")
    }
    const blogs: Blog[] = await res.json()
    return blogs[0]
}

export default async function BlogDetailPage({ params }: PageProps) {
    const blog = await fetchBlog(params.blogId)
    if (!blog) return notFound()
    return (
        <div className="mt-16 border-2 p-8">
            <p>
                <strong className="mr-3">Task ID:</strong> {blog.id}
            </p>
            <p>
                <strong className="mr-3">Title:</strong> {blog.title}
            </p>
            <p>
                <strong className="mr-3">Content:</strong> {blog.content}
            </p>
            <p>
                <strong className="mr-3">Created at:</strong>
                {blog && format(new Date(blog.created_at), 'yyyy-MM-dd HH:mm:ss')}
            </p>
            <Link href={`/blogs`}>
                <ArrowUturnLeftIcon className="mt-3 h-6 w-6 cursor-pointer text-blue-500" />
            </Link>
        </div>
    )
}

// generateStaticParamsは固定ファンクション　ssg化する
export async function generateStaticParams() {
    const res = await fetch(`${process.env.url}/rest/v1/blogs?select=*`, {
        headers: new Headers({
            apikey: process.env.apikey as string,
        }),
    })
    const blogs: Blog[] = await res.json()
    return blogs.map((blog) => ({
        blogId: blog.id.toString(),
    }))
}