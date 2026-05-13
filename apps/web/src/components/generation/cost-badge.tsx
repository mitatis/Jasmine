export function CostBadge({ value }: { value?: number | null }) {
  return <span className="rounded-md border bg-white px-2 py-1 text-xs">成本估算 ${Number(value ?? 0).toFixed(2)}</span>;
}
