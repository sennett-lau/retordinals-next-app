import { useRef } from 'react'
import XBannerCanvas from './XBannerCanvas'

type Props = {
  retIds: string[]
  background: string
}

const CanvasControl = (props: Props) => {
  const { retIds, background } = props

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const downloadImage = () => {
    const canvas = canvasRef.current
    if (canvas) {
      console.log('Downloading image')
      const image = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = image
      link.download = `RETkhronizer_banner.png`
      link.click()
    }
  }

  return (
    <>
      <XBannerCanvas banner={background} rets={retIds} canvasRef={canvasRef} />
      <div className='flex justify-center items-center mt-8 text-white font-extrabold'>
        <button
          className='italic py-2 px-4 rounded-lg bg-white shadow-2xl bg-opacity-75 hover:bg-primary-500 text-black'
          onClick={downloadImage}
        >
          Download
        </button>
      </div>
    </>
  )
}

export default CanvasControl
