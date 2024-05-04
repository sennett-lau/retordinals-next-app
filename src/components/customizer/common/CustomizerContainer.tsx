type Props = {
  children: React.ReactNode
  pageIndex: number
  setPageIndex: (pageIndex: number | ((prev: number) => number)) => void
  totalPages: number
}

const CustomizerContainer = (props: Props) => {
  const { children, pageIndex, setPageIndex, totalPages } = props

  return (
    <div className='flex flex-col w-full rounded-2xl bg-white bg-opacity-50 px-4 py-4 shadow-xl min-h-[400px]'>
      {children}

      <div className='flex'>
        <p className='text-black italic font-bold w-full text-left'>
          Page {pageIndex} of {totalPages}
        </p>
        <button
          onClick={() => setPageIndex((prev: number) => (prev === 1 ? prev : prev - 1))}
          className='mr-2 text-black font-bold'
        >
          {'<'}
        </button>
        <input
          className='bg-transparent border-b-2 border-black text-black font-bold pl-2 focus:outline-none w-[24px]'
          type='text'
          value={pageIndex}
          onChange={(e) => setPageIndex(parseInt(e.target.value))}
          disabled
        />
        <button
          onClick={() => setPageIndex((prev) => (prev === totalPages ? prev : prev + 1))}
          className='ml-2 text-black font-bold'
        >
          {'>'}
        </button>
      </div>
    </div>
  )
}

export default CustomizerContainer
