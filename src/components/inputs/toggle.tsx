import Base from "./base";

export default function Toggle({
  onClick,
  value,
  disabled,
  label,
}: {
  onClick: () => void;
  value: boolean;
  disabled?: boolean;
  label: string;
}) {
  const color = disabled ? "bg-zinc-400" : value ? "bg-green-700" : "bg-red-600";
  return (
    <Base label={label}>
      <button
        className="w-20 h-10 relative"
        onClick={onClick}
      > 
        {value ? (
          <>
            <div className="w-20 h-4 left-0 top-[12px] absolute bg-zinc-300 rounded-[360px]" />
            <div className={`w-10 h-10 left-[40px] top-0 absolute ${color} rounded-full`} />
          </>
        ): <>
          <div className="w-20 h-4 left-0 top-[12px] absolute bg-zinc-300 rounded-[360px]" />
          <div className={`w-10 h-10 left-0 top-0 absolute ${color} rounded-full`} />
        </>}
      </button>
    </Base>
  );
}
