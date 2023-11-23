"use client";
import PanelButton from "@/components/panel-button/panel-button";
import { usePathname } from "next/navigation";
import { NAMES } from "../layout";

export default function Game({
  params,
}: {
  params: {
    screen: string;
  };
}) {
  const pathname = usePathname();
  return (
    <div className="w-[1587px] h-[659px] self-center justify-between items-start place-content-between inline-flex flex-wrap">
      {Object.entries(NAMES).map(([href, name], index) => {
        return (
          <PanelButton key={index} href={`${pathname}/${href}`}>
            {name}
          </PanelButton>
        );
      })}
    </div>
  );
}
