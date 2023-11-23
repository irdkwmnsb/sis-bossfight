import Base from "./base";

export default function Button({
  onClick,
  children,
  disabled,
  label,
}: {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  label: string;
}) {
  return (
    <Base label={label}>
      <button
        className="px-5 py-2 bg-green-700 rounded-2xl justify-center items-center gap-2.5 flex text-white text-2xl font-normal disabled:bg-zinc-500"
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </Base>
  );
}
