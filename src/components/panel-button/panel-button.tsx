import Link from "next/link"

export default function PanelButton({ children, href }: {
    children: React.ReactNode,
    href: string
}) {
    return <Link 
        href={href}
    className="w-[761px] px-[98px] py-[104px] bg-neutral-700 rounded-[42px] justify-start items-center gap-[142px] inline-flex">
        <div className="grow shrink basis-0 text-white text-4xl font-normal">{children}</div>
        <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none">
            <path d="M51.45 38.25H12V33.75H51.45L32.85 15.15L36 12L60 36L36 60L32.85 56.85L51.45 38.25Z" fill="white"/>
        </svg>
    </Link>
}