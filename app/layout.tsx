import React from "react"
import "../styles/globals.css"
import Navbar from "./components/nav-bar"

export default function RootLayout ({
    children,
}: {
    children: React.ReactNode // 型注釈 TSのオブジェクト型リテラル　これには、コンポーネント、DOM 要素、文字列、数値、null、undefined、真偽値、配列、およびその他のオブジェクトが含まれます。
}) {
    return (
        <html>
            <body>
                <Navbar/>
                {children}
            </body>
        </html>
    )
}