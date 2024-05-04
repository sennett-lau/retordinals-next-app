type Props = {
  label: string
  max: number
  value: number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  toggleLabel?: string
  toggleTextPair?: [string, string]
  toggleValue?: boolean
  onToggle?: (isFacingRight: boolean) => void
}

const SliderControl = (props: Props) => {
  const { label, max, value, onChange, toggleLabel, toggleTextPair, toggleValue, onToggle } = props

  return (
    <div className='flex flex-col gap-1 w-full'>
      <div className='flex justify-between items-center'>
        <p className='text-white italic font-bold'>{label}</p>
        {toggleLabel && (
          <div className='flex items-center gap-3'>
            <p className='text-white italic font-bold'>{toggleLabel}</p>
            <div
              className='flex items-center rounded-md overflow-hidden cursor-pointer'
              onClick={() => onToggle(!toggleValue)}
            >
              <p className={`px-4 ${!toggleValue ? 'text-primary-500 bg-black' : 'text-black bg-white'}`}>
                {toggleTextPair[0]}
              </p>
              <p className={`px-4 ${toggleValue ? 'text-primary-500 bg-black' : 'text-black bg-white'}`}>
                {toggleTextPair[1]}
              </p>
            </div>
          </div>
        )}
      </div>
      <input
        type='range'
        min='0'
        max={max}
        value={value}
        onChange={onChange}
        className='w-full accent-primary-500 outline-none'
      />
    </div>
  )
}

export default SliderControl
