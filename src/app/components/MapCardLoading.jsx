const MapCardLoading = () => {
  return (
    <div className='flex gap-y-16 gap-x-4 flex-wrap items-center justify-center animate-pulse mx-4'>
      <div>
        <div className='flex w-[700px] justify-between items-center bg-slate-700 uppercase text-lg font-bold px-6 py-5 rounded-t' />
        <div className='h-[432px] rounded-b bg-slate-800 p-4'>
          <div className='w-full h-full bg-slate-700 rounded' />
        </div>
      </div>
    </div>
  )
}

export default MapCardLoading