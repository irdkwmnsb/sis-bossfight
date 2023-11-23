'use client';

import Number from "@/components/inputs/number";
import { useCallback, useState } from "react";

const N_BUTTONS = 36;

function InteractiveButton ({
  label,
  globalDisabled,
  onChange
}: {
  label: string
  globalDisabled?: boolean,
  onChange?: () => void
}){
  const [value, setValue] = useState<number>(Math.floor(Math.random() * 100));
  const handleChange = useCallback((value: number) => {
    setValue(value);
    onChange?.()
  }, [onChange]);
  return (
    <Number label={label} onChange={handleChange} disabled={globalDisabled} value={value}/>
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
    <>
    <button className="w-40 h-11 px-5 py-2 bg-green-700 disabled:bg-zinc-400 rounded-2xl justify-center items-center gap-2.5 inline-flex text-white text-2xl font-normal mb-5"
    onClick={handleClick} disabled={globalDisabled}>
      Сохранить
    </button>
    <div className="flex flex-wrap justify-between gap-2">
      {buttonNames.map((name, index) => {
        return (
          <InteractiveButton key={index} label={name} globalDisabled={globalDisabled}/>
        );
      })}
    </div>
    </>
  );
}
