export default function Gauge({
  label,
  value,
  onPlus,
  onMinus,
}: {
  label: string;
  value: number;
  onPlus: () => void;
  onMinus: () => void;
}) {
  return (
    <div className="w-[300px] h-[211px] flex-col justify-start items-center gap-[13px]">
      <div className="w-[300px] h-[150px] relative rounded-tr-[5000px] rounded-tl-[5000px] overflow-hidden">
        <div className="pt-[150px] absolute origin-center flex-col justify-start items-start inline-flex" style={{transform: `rotate(${value}deg)`}}>
          <div className="w-[300px] h-[150px] bg-zinc-300" />
        </div>
        <div className="w-[300px] h-[150px] left-[-0.10px] top-[-0.10px] absolut rounded-tl-[5000px] rounded-tr-[5000px]" />
        <div className="w-[200px] h-[100px] left-[50px] top-[50px] absolute bg-neutral-900 rounded-tl-[5000px] rounded-tr-[5000px]" />
      </div>
      <div className="justify-start items-center gap-[17px] inline-flex">
        <div className="text-white text-xl font-normal">{label}</div>
        <div className="justify-start items-center flex">
          <button className="w-12 h-12 relative rounded-tl-2xl rounded-bl-2xl border border-zinc-300" onClick={onPlus}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="49"
              height="48"
              viewBox="0 0 49 48"
              fill="none"
            >
              <path d="M10.5 25.5V22.5H38.5V25.5H10.5Z" fill="#D9D9D9" />
              <path
                d="M2 16C2 7.99187 8.49187 1.5 16.5 1.5H47V46.5H16.5C8.49187 46.5 2 40.0081 2 32V16Z"
                stroke="#D9D9D9"
                stroke-width="3"
              />
            </svg>
          </button>
          <button className="w-12 h-12 relative rounded-tr-2xl rounded-br-2xl border border-zinc-300" onClick={onMinus}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="49"
              height="48"
              viewBox="0 0 49 48"
              fill="none"
            >
              <path
                d="M23 25.5H10.5V22.5H23V10H26V22.5H38.5V25.5H26V38H23V25.5Z"
                fill="#D9D9D9"
              />
              <path
                d="M2 1.5H32.5C40.5081 1.5 47 7.99187 47 16V32C47 40.0081 40.5081 46.5 32.5 46.5H2V1.5Z"
                stroke="#D9D9D9"
                stroke-width="3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
