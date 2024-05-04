import Image from 'next/image'
import { useState } from 'react'

type Props = {
  retIds: string[]
  setRetIds: (retId: string[]) => void
}

const MAX_RET_IDS = 5

const RetIdMultiInput = (props: Props) => {
  const { retIds, setRetIds } = props

  const [retId, setRetId] = useState<string>('')

  const onAddRetId = () => {
    if (!retId || retIds.includes(retId) || retIds.length >= MAX_RET_IDS) return

    setRetIds([...retIds, retId])
    setRetId('')
  }

  const onRemoveRetId = (index: number) => {
    const newRetIds = retIds.filter((_, i) => i !== index)
    setRetIds(newRetIds)
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between'>
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
        <button className='bg-black text-primary-500 font-sm px-4 rounded-md' onClick={onAddRetId}>
          +
        </button>
      </div>
      <div className='flex gap-2'>
        {retIds.map((id, index) => (
          <button
            key={index}
            className='bg-white text-white font-sm w-18 h-8 px-2 rounded-md shadow-md flex items-center justify-center hover:bg-gray-200 transition-all duration-300'
            onClick={() => onRemoveRetId(index)}
          >
            <span className='flex-1 text-black'>
              {id}
            </span>
            <Image
              src='/icons/cancel.svg'
              alt='cancel'
              width={16}
              height={16}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default RetIdMultiInput
