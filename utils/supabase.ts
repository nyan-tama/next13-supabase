// ccで利用するsupabaseクライアントを作成する
// ccはccで別途用意する必要がある
import {createBrowserSupabaseClient} from "@supabase/auth-helpers-nextjs"
import { Database } from "@/database.types"

export default createBrowserSupabaseClient<Database>()
