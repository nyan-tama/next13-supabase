// ccで利用するsupabaseクライアントを作成する
// ccはccで別途用意する必要がある

// Next.jsアプリケーションでSupabaseクライアントを作成し、型付けするためのものです。
// scで利用する場合はcreateServerComponentSupabaseClient
import {createBrowserSupabaseClient} from "@supabase/auth-helpers-nextjs"
import { Database } from "@/database.types"

export default createBrowserSupabaseClient<Database>()
