export default function Base({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-[427px] pl-[22px] pr-[5px] py-[5px] bg-neutral-600 rounded-2xl justify-between items-center inline-flex">
      <div className="text-white text-2xl font-normal">{label}</div>
      {children}
    </div>
  );
}
