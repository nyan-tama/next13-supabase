import React from "react";

export default function SecondLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="mt-6 text-center bg-opacity-50 bg-green-400">
            <p>Layout 2</p>
            {children}
        </div>
    )
}