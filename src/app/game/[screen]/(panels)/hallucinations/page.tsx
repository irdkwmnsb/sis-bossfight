'use client';

import Button from "@/components/inputs/button";
import Toggle from "@/components/inputs/toggle";
import { useCallback, useState } from "react";

const N_BUTTONS = 36;

function InteractiveButton ({
  label,
  globalDisabled,
  onClick
}: {
  label: string
  globalDisabled?: boolean,
  onClick?: () => void,
}){
  const [state, setState] = useState<boolean>(Math.random() > 0.5);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const handleClick = useCallback(() => {
    setIsRunning(true);
    onClick?.();
    setTimeout(() => {
      setIsRunning(false);
      setState((state) => !state);
    }, 1500);
  }, [onClick]);
  return (
    <Toggle label={label} onClick={handleClick} value={state} disabled={isRunning || globalDisabled}></Toggle>
  );
}

function getButtonNames() {
  const buttonNames = [];
  for (let i = 0; i < N_BUTTONS; i++) {
    buttonNames.push(`Фильтр #${(i + 8125344) * 690127 % 1000000}`);
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
