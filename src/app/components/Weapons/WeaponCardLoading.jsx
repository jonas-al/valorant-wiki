import React from "react";

const WeaponCardLoading = () => {
  return (
    <div className="flex gap-y-16 gap-x-4 flex-wrap items-center justify-center animate-pulse pt-5 my-16 mx-4">
      <div>
        <div className="w-[500px] h-[124px] rounded-t bg-slate-800 p-4">
          <div className=" w-full h-full bg-slate-700 rounded"></div>
        </div>
        <div className="flex w-[500px] justify-between items-center bg-slate-700 uppercase text-lg font-bold px-6 py-5 rounded-b" />
      </div>
    </div>
  );
};

export default WeaponCardLoading;
