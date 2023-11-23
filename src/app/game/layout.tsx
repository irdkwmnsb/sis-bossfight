"use client";
import { useSocket } from "@/components/socket-context";
import { ServerInsertedHTMLContext, useSelectedLayoutSegments } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export const NAMES = {
  intelligence: "Управление интеллектом",
  hallucinations: "Управление галлюцинациями",
  attention: "Управление вниманием",
  hyperparameters: "Управление гиперпараметрами",
};

const Warning = () => {
    const [millisecondsRem, setMillisecondsRem] = useState<number>(10);
    useEffect(() => {
        const startTime = Date.now();
        const endTime = startTime + 10000;
        const int = setInterval(() => {
            const now = Date.now()
            setMillisecondsRem(endTime - now);
        }, 36);
        return () => clearInterval(int);
    }, []);
    return <div className="w-[663px] h-20 px-[45px] py-4 bg-red-600 rounded-2xl justify-start items-start gap-2.5 inline-flex flex-row absolute bottom-8 right-8">
        <div className="left-0 top-[3px] text-white text-4xl font-normal flex-1">Конец сессии через {Math.floor(millisecondsRem / 1000)}.{Math.floor(millisecondsRem/10) % 100} с.</div>
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path d="M2 42L24 4L46 42H2ZM7.2 39H40.8L24 10L7.2 39ZM24.2087 36.15C24.6362 36.15 24.9917 36.0054 25.275 35.7163C25.5583 35.4271 25.7 35.0687 25.7 34.6413C25.7 34.2138 25.5554 33.8583 25.2663 33.575C24.9771 33.2917 24.6187 33.15 24.1913 33.15C23.7638 33.15 23.4083 33.2946 23.125 33.5837C22.8417 33.8729 22.7 34.2313 22.7 34.6588C22.7 35.0863 22.8446 35.4417 23.1337 35.725C23.4229 36.0083 23.7813 36.15 24.2087 36.15ZM22.7 30.6H25.7V19.4H22.7V30.6Z" fill="white"/>
        </svg>
    </div>
}

export default function GameLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const segments = useSelectedLayoutSegments();
  const socket = useSocket();
  const screen = parseInt(segments[0]);
  const last = segments[segments.length - 1] as never;
  const isLocked = socket.locks.indexOf(screen) !== -1;
  const isNextLocked = socket.nextLocks.indexOf(screen) !== -1;
  const name = NAMES[last];
  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col gap-20 bg-neutral-900 text-neutral-200 p-20">
      <div className="text-4xl flex flex-row gap-5 justify-center text-white">
        {name && (
            <a href={`/game/${screen}`}>
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="m274-450 248 248-42 42-320-320 320-320 42 42-248 248h526v60H274Z" fill="white"/></svg>
            </a>
        )}
        Панель управления SISGPT - {isLocked && "Заблокировано"}
        {name && (
          <>
            <div className="h-full w-1 bg-neutral-200" />
            {name}
          </>
        )}
      </div>
      {!isLocked && children}
      {isNextLocked && (!isLocked) && <Warning />}
    </div>
  );
}
