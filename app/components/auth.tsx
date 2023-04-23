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
    async function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault()
        if(isLogin){
            const {error} = await supabase.auth.signInWithPassword({
                email,
                password
            })
            setEmail("")
            setPassword("")
            if (error){
                alert(error.message)
            }else{
                router.push("/")
            }
        // }else{

        }
    }
}