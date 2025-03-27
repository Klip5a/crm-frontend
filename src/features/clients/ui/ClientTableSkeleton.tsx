const ClientTableSkeleton = () => {
  return (
    <div
      className="
        flex
        items-center 
        border-b 
        border-gray-200 
        py-2 
        h-[60px]
        bg-white
        text-sm
        animate-pulse
      "
    >
      <div className="w-[100px] min-w-[80px] pl-5 pr-2">
        <div className="bg-gray-300 h-4 rounded"></div>
      </div>
      <div className="w-[370px] min-w-[220px] flex gap-2 ">
        <div className="bg-gray-300 h-4 w-3/4 rounded"></div>
      </div>
      <div className="w-[175px] min-w-[100px] flex gap-2 pr-2">
        <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
        <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
      </div>
      <div className="w-[175px] min-w-[100px] flex gap-2 pr-2">
        <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
        <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
      </div>
      <div className="w-[160px] min-w-[130px] flex gap-2 pr-2">
        <div className="bg-gray-300 h-4 w-1/5 rounded"></div>
        <div className="bg-gray-300 h-4 w-1/5 rounded"></div>
        <div className="bg-gray-300 h-4 w-1/5 rounded"></div>
        <div className="bg-gray-300 h-4 w-1/5 rounded"></div>
        <div className="bg-gray-300 h-4 w-1/5 rounded"></div>
      </div>
      <div className="w-[210px] min-w-[110px] flex gap-4 justify-start">
        <div className="bg-gray-300 h-4 w-1/4 rounded"></div>
        <div className="bg-gray-300 h-4 w-1/4 rounded"></div>
      </div>
    </div>
  );
};

export default ClientTableSkeleton;
