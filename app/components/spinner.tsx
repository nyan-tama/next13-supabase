export default function Spinner({
    // プロパティが指定されていない場合、
    // デフォルト値"border-blue-500"が使用されます。
    color = "border-blue-500",
}: {
    // TypeScriptの型注釈で、オブジェクトのcolorプロパティが
    // オプションであり、string型であることを示しています。
    color?: string
}) {
    return(
        <div className="my-16 flex justify-center">
            <div className={`h-10 w-10 animate-spin rounded-full border-4 ${color} border-t-transparent`}></div>
        </div>
    )
}