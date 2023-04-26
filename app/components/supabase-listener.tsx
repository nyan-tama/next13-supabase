'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import supabase from '../../utils/supabase'
import useStore from '@/store'

// プロップスからscのアクセストークンを取得できるようにしておく
export default function SupabaseListener({accessToken,}: {accessToken?: string}){
    const router = useRouter()
    const { updateLoginUser } = useStore()
    useEffect(() => {
        const getUserInfo = async () => {
            // ログインしているユーザーの情報をブラウザ側から取得
            const {data} = await supabase.auth.getSession()
            if(data.session){
                // ザスタンドで定義したメソッド
                // updateLoginUser: (payload) => set({ loginUser: payload, }),
                updateLoginUser({
                    id: data.session?.user.id,
                    // ?はオプショナルチェイニング演算子で、
                    // オブジェクトまたはプロパティが存在しない場合にundefinedを返す
                    // !は、プロパティが存在することを保証していることを示す
                    email: data.session?.user.email!,
                })
            }
        }
        getUserInfo()
        // useEffectフック内でイベントリスナーを使用する
        // ログイン、ログアウトするたびに呼び出される
        supabase.auth.onAuthStateChange((_, session) => {
            updateLoginUser({
                id: session?.user.id,
                email: session?.user.email!
            })
            // cc側トークンとsc側トークンが一致しない場合はscをリフレッシュ
            // accessTokenはプロップスとss側からわたってくる
            if (session?.access_token !== accessToken) {
                // 一致しない場合、ssを再実行させる
                // これによりheadersで再度読み込む処理につなげられる
                router.refresh()
            }
        })
    },[accessToken])
    return null
}
