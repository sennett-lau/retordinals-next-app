'use client'

import { useState } from 'react'
import CanvasContainer from '../components/canvas/CanvasControl'
import XBannerCustomizer from '../components/customizer/XBannerCustomizer'

export default function Home() {
  const [background, setBackground] = useState<string>('retordinals_001')

  const [retIds, setRetIds] = useState<string[]>(['1'])

  return (
    <div className='w-full flex-1 flex justify-center items-center py-10 lg:py-0'>
      <div className='w-full flex flex-col lg:flex-row flex-1 max-w-[1440px] mx-auto px-2 lg:px-6 py-8'>
        <div className='flex w-full lg:w-2/3 items-center flex-col mb-4 lg:mb-0 pt-6'>
          <CanvasContainer retIds={retIds} background={background} />
        </div>
        <div className='w-fit max-w-full lg:w-1/3 lg:px-2 xl:px-8 mx-auto'>
          <XBannerCustomizer
            retIds={retIds}
            setRetIds={setRetIds}
            bannerBackground={background}
            setBannerBackground={setBackground}
          />
        </div>
      </div>
    </div>
  )
}
