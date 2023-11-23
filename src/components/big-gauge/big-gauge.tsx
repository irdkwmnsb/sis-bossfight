export default function BigGauge({
    value,
    label
}: {
    value: number
    label: string
}) {
    return <div className="w-[378px] h-[101px] flex-col justify-start items-center gap-[7px] inline-flex">
    <div className="h-[66px] w-full rounded-2xl border-2 border-green-700 flex-col justify-start items-start gap-2.5 flex overflow-hidden">
      <div className="h-[66px] bg-green-700 transition-all" style={{
            width: value * 378
        }}/>
    </div>
    <div className="text-white text-2xl font-normal">{label}</div>
  </div>
}