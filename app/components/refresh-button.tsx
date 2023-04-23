// リダイレクトせずに再レンダリングを実装する
// この時更新されるのはsc側であって、cc側は更新されない
'use client'

import { useRouter } from 'next/navigation'

export default function RefreshBtn() {
    //Next.js の useRouter フックを使用して、ルーターオブジェクトを取得します。
    //これにより、ルーティング関連の操作を行うことができます。
    const router = useRouter()
    return (
        <div className='text-center'>
            <button
                className='rounded bg-indigo-600 px-3 py-1 font-medium text-white hover:bg-indigo-700'
                onClick={() => {
                    router.refresh()
                }}
            >
                Refresh current route
            </button>
        </div>
    )
}