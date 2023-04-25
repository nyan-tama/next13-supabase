import { headers, cookies } from 'next/headers'
import SupabaseListener from '../components/supabase-listener'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '../../database.types'

export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    //ブラウザで持っているcookieをサーバーに送る
    const supabase = createServerComponentSupabaseClient<Database>({
        headers,
        cookies,
    })
    //サーバーのセッションを取得
    const {data:{session},} = await supabase.auth.getSession()

    return (
        <>
            {/* SupabaseListener コンポーネントを使って、
            アクセストークンが変更されたときにリアルタイムでリスニングしますぽん。 */}
            <SupabaseListener accessToken={session?.access_token}/>
            {children}
        </>
    )
}
