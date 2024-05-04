type Props = {
  retId: string
  setRetId: (retId: string) => void
}

const RetIdInput = (props: Props) => {
  const { retId, setRetId } = props

  return (
    <div className='flex gap-2'>
      <label className='text-black italic font-bold pointer' htmlFor='ret-id'>
        RET #:
      </label>
      <input
        className='bg-transparent border-b-2 border-black text-white font-bold italic pl-2 focus:outline-none'
        type='text'
        id='ret-id'
        value={retId}
        onChange={(e) => setRetId(e.target.value)}
      />
    </div>
  )
}

export default RetIdInput
