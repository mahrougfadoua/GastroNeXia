// components/ui/Ico.tsx

interface IcoProps {
  d: string;
  s?: number;
  c?: string;
  sw?: number;
  fill?: string;
}

export default function Ico({ d, s = 18, c = "currentColor", sw = 1.8, fill = "none" }: IcoProps) {
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={c}
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 }}
    >
      <path d={d} />
    </svg>
  );
}