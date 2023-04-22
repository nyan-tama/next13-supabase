import { collectGenerateParams } from "next/dist/build/utils";
import type { Database } from "../../database.types";
import { format } from "date-fns"

type Note = Database["public"]["Tables"]["notes"]["Row"]

// supabaseからデータを取得
async function fetchNotes() {
    // 人工的に遅延を発生させる
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // fetch の Promise が解決されるまで、関数の実行が一時停止されます。
    const res = await fetch(`${process.env.url}/rest/v1/notes?select=*`, {
        headers: new Headers({
            apikey: process.env.apikey as string,
        }),
    })
    if (!res.ok) {
        throw new Error("Failed to fetch data in server")
    }
    const notes: Note[] = await res.json()
    // notesの中身
    // [
    //     {
    //       id: '254b30e3-3e61-45ee-a12a-bdcc35540f89',
    //       created_at: '2023-04-20T07:48:44.246168+00:00',
    //       title: 'Note1'
    //     },
    //     {
    //       id: 'b1316d35-7a92-4ac1-8c80-6991512c8e69',
    //       created_at: '2023-04-20T07:48:57.405476+00:00',
    //       title: 'Note2'
    //     }
    //   ]
    return notes
}


export default async function NotesList() {
    const notes = await fetchNotes()
    return(
        <div className="text-center">
            <p className="my-4 pb-3 text-xl font-mesium underline underline-offset-4">
                Notes
            </p>
            <ul className="m-3">
                {notes.map((note) => (
                    <li key={note.id}>
                        <p>{note.title}</p>
                        <p>
                            <strong className="mr-3">Created at:</strong>
                            {/* noteがあれば formatを実行 */}
                            {note && format(new Date(note.created_at), "yyyy-MM-dd HH:mm:ss")}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}