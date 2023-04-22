// hooksをつかう
'use client'

import { useState, useEffect } from "react"

export default function TimerCounter() {
    const [count, setCount] = useState(0)

    //構文：useEffect(無名関数, [])
    //第一引数に渡されているコールバック関数が、コンポーネントがマウントされた後に実行されます。
    useEffect(
        () => {
            const timer = setInterval(
                //500ミリ秒ごとにカウントが更新される
                () => setCount((prevCount) => prevCount + 1), 500)
            // コンポーネントがアンマウントされるとき（つまり、DOMから削除されるとき）に実行されます。
            return () => clearInterval(timer)
        }, [])
        //[]はマウント時とアンマウント時にのみ実行されることを意味しています。

    // useEffect は以下のように動作します。
    // コンポーネントがマウントされた時に、useEffect の第一引数であるコールバック関数が実行されます。この例では、タイマーが設定されます。
    // useEffect のコールバック関数内で、クリーンアップ関数が返されますが、この時点では実行されません。
    // コンポーネントがアンマウントされる（DOMから削除される）時に、クリーンアップ関数が実行されます。この例では、clearInterval が実行され、タイマーがクリアされます。
    // このように、useEffect はコンポーネントのライフサイクルに応じて、副作用とクリーンアップを適切に管理します。クリーンアップ関数がマウント時に実行されない理由は、その目的がコンポーネントのアンマウント時にリソースを解放し、不要な副作用を防ぐことにあるからです。

    return (
        <div className="text-center">
            <p>{count}</p>
            <button
                className="font-sm my-3 rounded bg-indigo-600 py-1 px-3 text-white hover:bg-indigo-700"
                onClick={() => setCount(0)}
            >
                reset
            </button>
        </div>
    )
}