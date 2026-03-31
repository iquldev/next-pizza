export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex animate-in items-center justify-center bg-black/70 fade-in-0">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  )
}
