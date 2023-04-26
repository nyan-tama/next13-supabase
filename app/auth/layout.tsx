import { headers, cookies } from 'next/headers'
import SupabaseListener from '../components/supabase-listener'// cc
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '../../database.types'

export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    //ブラウザで持っているアクセストークンヘッダー情報を含める
    const supabase = createServerComponentSupabaseClient<Database>({
        headers,
        cookies,
    })

    //sc側のセッションを取得
    // const response = {
    //     data: {
    //       session: {
    //         user: { ... },
    //         access_token: "xyz",
    //         // その他のプロパティ
    //       }
    //     }
    //   }
    const {data:{session}} = await supabase.auth.getSession()

    return (
        <>
            {/* SupabaseListener コンポーネントを使って、
            アクセストークンが変更されたときにリアルタイムでリスニングしますぽん。 */}
            <SupabaseListener accessToken={session?.access_token}/>
            {children}
        </>
    )
}
