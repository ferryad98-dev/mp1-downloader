export const SkeletonCard = () => (
  <div className="w-full max-w-3xl mx-auto mt-10 p-6 rounded-3xl bg-card/60 backdrop-blur-xl border border-border">
    <div className="grid md:grid-cols-[260px_1fr] gap-6">
      <div className="aspect-video md:aspect-[3/4] rounded-2xl shimmer" />
      <div className="flex flex-col gap-3">
        <div className="h-6 w-3/4 rounded-lg shimmer" />
        <div className="h-4 w-1/2 rounded-lg shimmer" />
        <div className="mt-auto flex flex-col gap-2">
          <div className="h-12 rounded-2xl shimmer" />
          <div className="h-12 rounded-2xl shimmer" />
          <div className="h-12 rounded-2xl shimmer" />
        </div>
      </div>
    </div>
  </div>
);
