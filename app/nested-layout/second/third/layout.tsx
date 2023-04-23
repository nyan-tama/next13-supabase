import React from "react";

export default function ThirdLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="mt-6 text-center bg-opacity-50 bg-gray-400">
            <p>Layout 3</p>
            {children}
        </div>
    )
}