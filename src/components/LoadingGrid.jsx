export default function LoadingGrid() {
  return <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{Array.from({ length: 8 }).map((_, i) => <div key={i} className="h-80 animate-pulse rounded-3xl bg-stone-200" />)}</div>;
}
