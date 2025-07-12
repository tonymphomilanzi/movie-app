const MovieCardSkeleton = () => {
  return (
    <div className="bg-netflix-black rounded-lg shadow-lg animate-pulse flex flex-col cursor-pointer">
      <div className="w-full h-72 bg-gray-800 rounded-t-lg" />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="h-6 bg-gray-700 rounded mb-3 w-3/4" />
          <div className="h-4 bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-700 rounded w-5/6 mt-1" />
        </div>
        <div className="flex justify-between items-center text-xs mt-3 mb-2 text-netflix-grayLight">
          <div className="h-4 bg-gray-700 rounded w-10" />
          <div className="h-4 bg-gray-700 rounded w-6" />
        </div>
        <div className="h-8 bg-netflix-red rounded-full mt-2" />
      </div>
    </div>
  );
};

export default MovieCardSkeleton;
