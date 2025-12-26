function SkeletonRow() {
  return (
    <div className="border-b border-gray-800 p-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-gray-700 animate-pulse" />
        <div className="flex-1">
          <div className="h-4 w-24 bg-gray-700 rounded mb-1 animate-pulse" />
          <div className="h-3 w-16 bg-gray-700 rounded animate-pulse" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
        <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
        <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
        <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
      </div>
    </div>
  );
}

export { SkeletonRow };
