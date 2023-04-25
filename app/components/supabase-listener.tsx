'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import supabase from '../../utils/supabase'
import useStore from '@/store'

// プロップスからscのアクセストークンを取得できるようにしておく
export default function SupabaseListener({accessToken,}: {accessToken: string | undefined}){
    const router = useRouter()
    const { updateLoginUser } = useStore()
    useEffect(() => {
        const getUserInfo = async () => {
            // ログインしているユーザーの情報をブラウザ側から取得
            const {data} = await supabase.auth.getSession()
            if(data.session){
                updateLoginUser({
                    id: data.session?.user.id,
                    email: data.session?.user.email!,
                })
            }
        }
        getUserInfo()
        // useEffectフック内でイベントリスナーを使用する
        // ログイン、ログアウトするたびに呼び出される
        supabase.auth.onAuthStateChange((_, session) => {
            updateLoginUser({id: session?.user.id, email: session?.user.email!})
            // cc側トークンとsc側トークンが一致しない場合はscをリフレッシュ
            if (session?.access_token !== accessToken) {
                router.refresh()
            }
        })
    },[accessToken])
    return null
}
