import NotesList from "./components/notes-list"

// appディレクトリの中はすべてサーバーコンポーネントとなる
export default function Page() {
    return (
        <main>
            <div className="m-10 text-center">Hello World😺</div>
            {/* @ts-ignore */}
            <NotesList />
        </main>
    )
}