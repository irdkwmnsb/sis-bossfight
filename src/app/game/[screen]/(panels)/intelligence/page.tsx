'use client';

import Button from "@/components/inputs/button";
import { useCallback, useState } from "react";

const N_BUTTONS = 36;

function InteractiveButton ({
  label,
  globalDisabled,
  onClick
}: {
  label: string
  globalDisabled?: boolean,
  onClick?: () => void
}){
  const [state, setState] = useState<"off" | "running" | "on">("off");
  const handleClick = useCallback(() => {
    if (state !== "off") {
      return;
    }
    onClick?.();
    setState("running");
    setTimeout(() => {
      setState("on");
    }, 1500);
  }, [state]);
  return (
    <Button label={label} onClick={handleClick} disabled={state !== "off" || globalDisabled}>
      {state === "off" && "Старт"}
      {state === "running" && "Запускается"}
      {state === "on" && "Запущено"}
    </Button>
  );
}

function getButtonNames() {
  const buttonNames = [];
  for (let i = 0; i < N_BUTTONS; i++) {
    buttonNames.push(`Миграция #${(i + 8125344) * 690127 % 1000000}`);
  }
  return buttonNames;
}


export default function Intelligence({
  params,
}: {
  params: {
    screen: string;
  };
}) {
  const buttonNames = getButtonNames();
  const [globalDisabled, setGlobalDisabled] = useState(false);
  const handleClick = useCallback(() => {
    setGlobalDisabled(true);
    setTimeout(() => {
      setGlobalDisabled(false);
    }, 2000)
  }, []);
  return (
    <div className="flex flex-wrap justify-between gap-2">
      {buttonNames.map((name, index) => {
        return (
          <InteractiveButton key={index} label={name} globalDisabled={globalDisabled} onClick={handleClick}/>
        );
      })}
    </div>
  );
}
