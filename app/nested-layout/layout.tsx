import React from "react";

export default function FirstLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="mt-6 text-center bg-opacity-50 bg-blue-400">
            <p>Layout 1</p>
            {children}
        </main>
    )
}