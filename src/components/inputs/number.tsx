import Base from "./base";

export default function Number({
  onChange,
  value,
  disabled,
  label,
}: {
  onChange: (newVal: number) => void;
  value: number;
  disabled?: boolean;
  label: string;
}) {
  return (
    <Base label={label}>
      <input
        className="w-[79px] h-[34px] px-[9px] py-[3px] bg-stone-500 shadow border-b border-white justify-center items-center gap-2.5 inline-flex text-white text-2xl font-normal"
        type="number"
        onChange={(e) => { onChange(parseInt(e.target.value)); }}
        disabled={disabled}
        value={value}
      />
    </Base>
  );
}
