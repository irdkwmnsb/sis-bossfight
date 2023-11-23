'use client';
import BigGauge from "@/components/big-gauge/big-gauge";
import { useSocket } from "@/components/socket-context";
import { useEffect, useMemo, useState } from "react";

const randInt = (min: number, max : number) => {
    return Math.floor(Math.random() * (max - min) + min);
}

const getRandomName = () => {
    return `R${randInt(0, 9)}N${randInt(1000, 9999)}`;
}

function AutoGauge({
    baseValue
}: {
    baseValue: number
}) {
    const [val, setVal] = useState(baseValue);
    const name = useMemo(getRandomName, []);
    useEffect(() => {
        const int = setInterval(() => {
            setVal(baseValue + (Math.random() - 0.5) * 100);
        }, 100);
        return () => clearInterval(int);
    })
    return <BigGauge label={name} value={val / 800}/>
}

export default function PanelLayout({ children }: {
    children: React.ReactNode
}) {
    const { baseHealth } = useSocket();
    return (
        <div className="flex flex-row gap-20">
            <div className="flex-1">
                {children}
            </div>
            <div className="w-[378px] flex-col justify-start items-center gap-[23px] inline-flex">
                <h2 className="text-white text-4xl font-normal">Общие показатели</h2>
                <AutoGauge baseValue={baseHealth}/>
                <AutoGauge baseValue={baseHealth}/>
                <AutoGauge baseValue={baseHealth}/>
                <AutoGauge baseValue={baseHealth}/>
                <AutoGauge baseValue={baseHealth}/>
            </div>
        </div>
    )
}