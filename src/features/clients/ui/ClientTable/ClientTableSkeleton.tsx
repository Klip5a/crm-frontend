const ClientTableSkeleton = () => {
  return (
    <div
      className="
        grid-table-row 
        border-b 
        border-gray-200 
        py-2 
        h-[60px]
        bg-white
        text-sm
        animate-pulse
      "
    >
      <div className="grid-table-cell-id pl-5 pr-2">
        <div className="bg-gray-300 h-4 rounded"></div>
      </div>
      <div className="grid-table-cell-name flex gap-2">
        <div className="bg-gray-300 h-4 w-3/4 rounded"></div>
      </div>
      <div className="grid-table-cell-created flex gap-2 pr-2">
        <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
        <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
      </div>
      <div className="grid-table-cell-updated flex gap-2 pr-2">
        <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
        <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
      </div>
      <div className="grid-table-cell-contacts flex gap-2 pr-2">
        <div className="bg-gray-300 h-4 w-1/5 rounded"></div>
        <div className="bg-gray-300 h-4 w-1/5 rounded"></div>
        <div className="bg-gray-300 h-4 w-1/5 rounded"></div>
        <div className="bg-gray-300 h-4 w-1/5 rounded"></div>
        <div className="bg-gray-300 h-4 w-1/5 rounded"></div>
      </div>
      <div className="grid-table-cell-actions flex gap-4 justify-start">
        <div className="bg-gray-300 h-4 w-1/4 rounded"></div>
        <div className="bg-gray-300 h-4 w-1/4 rounded"></div>
      </div>
    </div>
  );
};

export default ClientTableSkeleton;
