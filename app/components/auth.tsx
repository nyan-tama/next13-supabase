"use client"

// 「FormEvent」は、Reactでフォームを操作する場合に使用される型です。
// この型は、フォームの送信時にイベントオブジェクトを表します。
import {useState, FormEvent}from "react"
import {useRouter} from "next/navigation"

import {ArrowRightOnRectangleIcon} from "@heroicons/react/24/solid"

import supabase from "../../utils/supabase"
import useStore from "@/store"

export default function Auth(){
    const {loginUser} = useStore()
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()
    // loginとsignupの処理をまとめる
    async function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault()
        if(isLogin){
            // エラーがあるときは分割代入でerrorを取得できる
            const {error} = await supabase.auth.signInWithPassword({
                email,
                password
            })
            //serEmail("")とsetPassword("")は、ログイン後にフォームの値を空にするために使用しています。
            setEmail("")
            setPassword("")
            if (error){
                alert(error.message)
            }else{
                router.push("/")
            }
        }else{
            const {error} = await supabase.auth.signUp({
                email,
                password
            })
            setEmail("")
            setPassword("")
            if (error){
                alert(error.message)
            }
        }
    }
    function signOut(){
        supabase.auth.signOut()
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <p>{loginUser.email}</p>
            <ArrowRightOnRectangleIcon 
                className="my-6 h-6 w-6 cursor-pointer text-blue-500"
                onClick={signOut}
            />
            {/* フォームの送信が行われるタイミングで実行 */}
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        required
                        className="text-gray-800 my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholeder-gray-500 focus:outline-none"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        required
                        className="text-gray-800 my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholeder-gray-500 focus:outline-none"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="my-6 flex justify-center text-sm">
                    <button
                        type="submit"
                        className="rounded-md bg-blue-600 hover:bg-indigo-700 text-white px-4 py-2 font-medium"
                    >
                        {isLogin ? "Login" : "Register"}
                    </button>
                </div>
            </form>
            <p
                onClick={() => setIsLogin(!isLogin)}
                className="cursor-pointer font-medium hover:text-indigo-500"
            >
                change mode ?
            </p>
        </div>
    )
}