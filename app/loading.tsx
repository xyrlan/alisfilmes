import Image from "next/image";

export default function Loading() {
    return (
        <div className="flex items-center justify-center h-screen bg-background">
            <Image src="/estrela-branca.png" alt="Logo" width={200} height={200} className="animate-pulse" />
        </div>
    )
}