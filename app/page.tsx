import NotesList from "./components/notes-list"
// cc -> sc はok
import TimerCounter from "./components/timer-counter"
// ストリーミングHtmlのために準備
import { Suspense } from "react"
import Spinner from "./components/spinner" //loadingのとはまた別
import RefreshBtn from "./components/refresh-button"

// appディレクトリの中はすべてサーバーコンポーネントとなる
export default function Page() {
    return (
        <main>
            <div className="m-10 text-center">Hello World😺</div>
            {/* ストリーミングHtml 個別にローディングも入れられる */}
            <Suspense fallback={<Spinner color="border-green-500"/>}>
                {/* @ts-ignore */}
                <NotesList />
            </Suspense>
            <TimerCounter />
            <RefreshBtn />
        </main>
    )
}