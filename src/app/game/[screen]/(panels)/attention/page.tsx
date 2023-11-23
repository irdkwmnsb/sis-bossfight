'use client';

import Button from "@/components/inputs/button";
import Gauge from "@/components/inputs/gauge";
import { useCallback, useMemo, useState } from "react";

const N_BUTTONS = 36;

function InteractiveButton ({
  label,
}: {
  label: string
  globalDisabled?: boolean,
  onClick?: () => void
}){
  const startValue = useMemo(() => Math.random() * 180, []);
  const [value, setValue] = useState(startValue);
  return (
    <Gauge label={label} value={value} onMinus={() => {
      setValue(Math.min(180, value + 10));
    }} onPlus={() => {
      setValue(Math.max(value - 10, 0));
    }}/>
  );
}

function getButtonNames() {
  const buttonNames = [];
  for (let i = 0; i < N_BUTTONS; i++) {
    buttonNames.push(`Параметр #${(i + 8125344) * 690127 % 1000000}`);
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
